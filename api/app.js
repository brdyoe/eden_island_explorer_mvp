const fs = require("fs");
const path = require("path");

function escapeClosingScript(source) {
  return String(source).replace(/<\/script/gi, "<\\/script");
}

module.exports = function handler(req, res) {
  try {
    const root = process.cwd();
    const basePath = path.join(root, "index.html");
    const packPath = path.join(root, "content-update.js");

    let html = fs.readFileSync(basePath, "utf8");
    const packSource = escapeClosingScript(fs.readFileSync(packPath, "utf8"));

    if (!html.includes("</body>")) {
      throw new Error("Base app HTML has no closing body tag");
    }

    const verificationSource = `
      try {
        const cartographer = badges.find(b => b.id === "navigator");
        const collector = badges.find(b => b.id === "pokemon_master");
        const loaded = cartographer?.name === "Cartographer" && collector?.name === "Pokémon Collector";
        document.documentElement.dataset.contentPack = loaded ? "v2" : "failed";

        const existing = document.getElementById("contentPackStatus");
        if (existing) existing.remove();

        const marker = document.createElement("p");
        marker.id = "contentPackStatus";
        marker.style.marginTop = "6px";
        marker.style.fontSize = "12px";
        marker.style.opacity = ".88";
        marker.textContent = loaded ? "Content Pack v2 active" : "Content Pack v2 failed";
        document.querySelector("header")?.appendChild(marker);

        if (!loaded) {
          const note = document.createElement("div");
          note.className = "safety danger";
          note.style.margin = "12px 14px";
          note.innerHTML = "<b>Content update did not load.</b> Cartographer or Pokémon Collector is missing.";
          document.body.prepend(note);
        }
      } catch (error) {
        console.error("Content pack verification failed", error);
      }
    `;

    const injected = [
      `<script id="contentPackV2">${packSource}<\/script>`,
      `<script>${escapeClosingScript(verificationSource)}<\/script>`
    ].join("");

    html = html.replace("</body>", `${injected}</body>`);

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");
    res.end(html);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(`Eden Island Explorer failed to start: ${error.message || error}`);
  }
};
