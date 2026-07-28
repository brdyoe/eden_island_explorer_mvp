const fs = require('fs');
const path = require('path');

const root = __dirname;
const dist = path.join(root, 'dist');
const indexPath = path.join(root, 'index.html');
const packPath = path.join(root, 'content-update.js');

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!fs.existsSync(indexPath)) fail('index.html not found');
if (!fs.existsSync(packPath)) fail('content-update.js not found');

let html = fs.readFileSync(indexPath, 'utf8');
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

const injected = `<script id="contentPackV2">${pack}<\/script>${verification}`;
html = html.replace('</body>', `${injected}</body>`);

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.writeFileSync(path.join(dist, 'index.html'), html, 'utf8');
fs.writeFileSync(path.join(dist, 'app.html'), html, 'utf8');
fs.copyFileSync(packPath, path.join(dist, 'content-update.js'));

console.log('Built dist/index.html with Content Pack v2 embedded.');
