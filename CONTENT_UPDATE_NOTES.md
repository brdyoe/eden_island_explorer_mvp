# Content Variety v2

This update adds a larger quest pool and reduces repetition without changing saved XP, history, Passport data or cloud state.

## Changes

- Retires repetitive one-off quests from future generation while preserving history.
- Adds map and navigation quests.
- Adds Pokémon card quests.
- Adds detective, pool, park and friend quests.
- Adds per-quest cooldowns of 5–14 days.
- Reworks Pokémon Master into Pokémon Collector: complete 5 Pokémon quests.
- Reworks Map Maker into Cartographer: complete 5 map/navigation quests.

## Deployment

`vercel.json` rewrites `/` to `app.html`. `app.html` loads the existing `index.html` in a same-origin full-screen frame and injects `content-update.js` after the base app is ready. Existing browser storage remains on the same origin.
