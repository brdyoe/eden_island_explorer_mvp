const fs = require('fs');
const path = require('path');

const root = __dirname;
const indexPath = path.join(root, 'index.html');
const appPath = path.join(root, 'app.html');
const packPath = path.join(root, 'content-update.js');

const START = '<!-- CONTENT_PACK_V2_START -->';
const END = '<!-- CONTENT_PACK_V2_END -->';

function fail(message) {
  console.error(message);
  process.exit(1);
}

function removeExistingPack(html) {
  let output = html;
  while (true) {
    const start = output.indexOf(START);
    if (start === -1) return output;
    const end = output.indexOf(END, start);
    if (end === -1) fail('Found content-pack start marker without end marker');
    output = output.slice(0, start) + output.slice(end + END.length);
  }
}

if (!fs.existsSync(indexPath)) fail('index.html not found');
if (!fs.existsSync(packPath)) fail('content-update.js not found');

let html = removeExistingPack(fs.readFileSync(indexPath, 'utf8'));
const pack = fs.readFileSync(packPath, 'utf8').replace(/<\/script/gi, '<\\/script');

if (!html.includes('</body>')) fail('index.html has no closing body tag');
if (!pack.includes('Pokémon Collector') || !pack.includes('Cartographer')) {
  fail('content-update.js does not contain expected v2 badge names');
}

const verification = `
<script id="contentPackVerification">
(() => {
  const cartographer = badges.find(b => b.id === 'navigator');
  const collector = badges.find(b => b.id === 'pokemon_master');
  const loaded = cartographer?.name === 'Cartographer' && collector?.name === 'Pokémon Collector';
  document.documentElement.dataset.contentPack = loaded ? 'v2' : 'failed';

  const oldMarker = document.getElementById('contentPackStatus');
  if (oldMarker) oldMarker.remove();

  const marker = document.createElement('p');
  marker.id = 'contentPackStatus';
  marker.style.marginTop = '6px';
  marker.style.fontSize = '12px';
  marker.style.opacity = '.88';
  marker.textContent = loaded ? 'Content Pack v2 active' : 'Content Pack v2 failed';
  document.querySelector('header')?.appendChild(marker);

  if (!loaded) {
    const note = document.createElement('div');
    note.className = 'safety danger';
    note.style.margin = '12px 14px';
    note.innerHTML = '<b>Content update did not load.</b> Cartographer or Pokémon Collector is missing.';
    document.body.prepend(note);
  }
})();
<\/script>`;

const block = `${START}\n<script id="contentPackV2">${pack}<\/script>${verification}\n${END}\n`;
html = html.replace('</body>', `${block}</body>`);

fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(appPath, html, 'utf8');

console.log('Updated root index.html and app.html with Content Pack v2 embedded.');
