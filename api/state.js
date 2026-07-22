const TABLE = process.env.SUPABASE_STATE_TABLE || "app_state";

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function getConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const pin = process.env.EDEN_SYNC_PIN;
  if (!url || !key || !pin) return null;
  return {url: url.replace(/\/$/, ""), key, pin};
}

function cleanFamilyId(value) {
  const id = String(value || "").trim().toLowerCase();
  if (!/^[a-z0-9_-]{3,64}$/.test(id)) return "";
  return id;
}

function sanitizeStateForStorage(state) {
  const clean = JSON.parse(JSON.stringify(state || {}));
  if (clean.cloud) clean.cloud.pin = "";
  return clean;
}

async function supabaseFetch(config, path, options = {}) {
  const authHeaders = {apikey: config.key};
  if (!config.key.startsWith("sb_secret_")) {
    authHeaders.Authorization = `Bearer ${config.key}`;
  }
  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    ...options,
    headers: {
      ...authHeaders,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const message = data?.message || data?.error || response.statusText;
    throw new Error(message);
  }
  return data;
}

async function readState(config, familyId) {
  const rows = await supabaseFetch(
    config,
    `${TABLE}?family_id=eq.${encodeURIComponent(familyId)}&select=family_id,state_json,revision,updated_at&limit=1`
  );
  return Array.isArray(rows) ? rows[0] : null;
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  const config = getConfig();
  if (!config) {
    json(res, 503, {error: "Cloud sync is not configured. Add SUPABASE_URL, SUPABASE_SECRET_KEY and EDEN_SYNC_PIN in Vercel."});
    return;
  }

  if (String(req.headers["x-eden-pin"] || "") !== config.pin) {
    json(res, 401, {error: "Invalid Cloud PIN"});
    return;
  }

  try {
    if (req.method === "GET") {
      const familyId = cleanFamilyId(req.query.familyId);
      if (!familyId) {
        json(res, 400, {error: "Invalid familyId"});
        return;
      }
      const row = await readState(config, familyId);
      if (!row) {
        json(res, 404, {error: "No state found"});
        return;
      }
      json(res, 200, {
        familyId,
        state: row.state_json,
        revision: row.revision || 0,
        updatedAt: row.updated_at || ""
      });
      return;
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const familyId = cleanFamilyId(body?.familyId);
      if (!familyId || !body?.state) {
        json(res, 400, {error: "familyId and state are required"});
        return;
      }

      const current = await readState(config, familyId);
      const clientRevision = Number(body.revision || 0);
      const currentRevision = Number(current?.revision || 0);
      if (current && currentRevision > clientRevision) {
        json(res, 409, {
          error: "Cloud has newer progress",
          state: current.state_json,
          revision: currentRevision,
          updatedAt: current.updated_at || ""
        });
        return;
      }

      const nextRevision = currentRevision + 1;
      const updatedAt = new Date().toISOString();
      const rows = await supabaseFetch(
        config,
        `${TABLE}?on_conflict=family_id`,
        {
          method: "POST",
          headers: {"Prefer": "resolution=merge-duplicates,return=representation"},
          body: JSON.stringify([{
            family_id: familyId,
            state_json: sanitizeStateForStorage(body.state),
            revision: nextRevision,
            updated_at: updatedAt
          }])
        }
      );
      const saved = Array.isArray(rows) ? rows[0] : null;
      json(res, 200, {
        familyId,
        revision: saved?.revision || nextRevision,
        updatedAt: saved?.updated_at || updatedAt
      });
      return;
    }

    json(res, 405, {error: "Method not allowed"});
  } catch (error) {
    json(res, 500, {error: error.message || "Cloud sync failed"});
  }
};
