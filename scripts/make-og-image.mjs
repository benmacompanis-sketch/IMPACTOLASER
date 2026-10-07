/**
 * Genera src/app/opengraph-image.jpg: la imagen que muestran WhatsApp,
 * Facebook, etc. cuando se comparte el link de la web (1200x630).
 *
 * Se arma en HTML con el logo oficial y las fuentes de la web, y se le saca
 * una captura con Chromium. Next la detecta sola por el nombre del archivo y
 * agrega las etiquetas og:image, con el texto de opengraph-image.alt.txt.
 *
 * El logo y las pastillas quedan dentro del cuadrado central de 630x630,
 * porque en algunas vistas WhatsApp recorta la imagen a un cuadrado.
 *
 * Regenerarla si cambia el logo (las fuentes salen de lo que baja next/font,
 * por eso hace falta el build antes):
 *   npm run build
 *   npm i playwright --no-save && npx playwright install chromium
 *   node scripts/make-og-image.mjs
 * Para usar otro Chromium: CHROMIUM_PATH=/ruta/a/chrome node scripts/make-og-image.mjs
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { chromium } from "playwright";

const OUT = "src/app/opengraph-image.jpg";
const W = 1200;
const H = 630;

const css = readdirSync(".next/static/css")
  .map((f) => readFileSync(`.next/static/css/${f}`, "utf8"))
  .join("\n");

/** Subset latino (u+00??, incluye tildes y ñ) de una fuente de next/font. */
function latinFont(family) {
  for (const [, face] of css.matchAll(/@font-face\{([^}]*)\}/g)) {
    if (face.includes(`font-family:${family};`) && /unicode-range:u\+00\?\?,/i.test(face)) {
      const url = face.match(/url\(([^)]+)\)/)[1].replace("/_next/", ".next/");
      return readFileSync(url).toString("base64");
    }
  }
  throw new Error(`No encontré ${family} en .next: corré npm run build primero.`);
}

const inter = latinFont("Inter");
const grotesk = latinFont("Space Grotesk");
const logo = readFileSync("public/logo-transparent.png").toString("base64");

// Constelación como la del fondo de la web, con semilla fija para que salga
// siempre igual, y sólo en los bordes para no competir con el logo.
let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const nodes = [];
for (let i = 0; i < 46; i++) {
  const x = rnd() * W;
  const y = rnd() * H;
  if (Math.abs(x - 600) / 600 < 0.62 && Math.abs(y - 290) / 315 < 0.78) continue;
  nodes.push([x, y]);
}
let svg = "";
for (let i = 0; i < 90; i++) {
  svg += `<circle cx="${rnd() * W}" cy="${rnd() * H}" r="${rnd() * 0.9 + 0.4}" fill="#cfe4ff" fill-opacity="${rnd() * 0.35 + 0.1}"/>`;
}
nodes.forEach(([x1, y1], i) => {
  for (const [x2, y2] of nodes.slice(i + 1)) {
    const d = Math.hypot(x1 - x2, y1 - y2);
    if (d < 175) {
      svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#3d8eff" stroke-opacity="${0.42 * (1 - d / 175)}"/>`;
    }
  }
});
for (const [x, y] of nodes) svg += `<circle cx="${x}" cy="${y}" r="1.8" fill="#9ec8ff" fill-opacity="0.75"/>`;

const pills = ["Sin agua", "Sin químicos", "Sin abrasivos"];

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Inter;font-weight:100 900;src:url(data:font/woff2;base64,${inter}) format("woff2")}
@font-face{font-family:Grotesk;font-weight:300 700;src:url(data:font/woff2;base64,${grotesk}) format("woff2")}
*{margin:0;padding:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;overflow:hidden;position:relative;
  background:
    radial-gradient(52% 58% at 50% 42%, rgba(47,139,255,0.24), transparent 70%),
    radial-gradient(80% 60% at 50% 0%, rgba(47,139,255,0.14), transparent 62%),
    radial-gradient(40% 40% at 88% 92%, rgba(31,111,230,0.10), transparent 70%),
    #04060d}
svg,.vignette{position:absolute;inset:0}
.vignette{background:radial-gradient(120% 95% at 50% 45%, transparent 55%, rgba(2,3,8,0.75) 100%)}
.logo{position:absolute;left:50%;top:258px;width:690px;transform:translate(-50%,-50%)}
.rule{position:absolute;left:50%;top:418px;width:520px;height:1px;transform:translateX(-50%);
  background:linear-gradient(90deg,transparent,rgba(109,171,255,0.55) 30%,rgba(207,228,255,0.9) 50%,rgba(109,171,255,0.55) 70%,transparent)}
.pills{position:absolute;left:0;right:0;top:450px;display:flex;justify-content:center;gap:12px}
.pill{font:500 25px/1 Inter,sans-serif;color:rgba(241,245,251,0.86);padding:15px 24px;border-radius:999px;
  background:rgba(11,17,32,0.72);border:1px solid rgba(255,255,255,0.10);box-shadow:0 0 30px -12px rgba(47,139,255,0.6)}
.place{position:absolute;left:0;right:0;bottom:34px;text-align:center;padding-left:0.42em;
  font:500 15px/1 Grotesk,sans-serif;letter-spacing:0.42em;color:rgba(158,200,255,0.55)}
</style></head><body>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${svg}</svg>
<div class="vignette"></div>
<img class="logo" src="data:image/png;base64,${logo}">
<div class="rule"></div>
<div class="pills">${pills.map((p) => `<span class="pill">${p}</span>`).join("")}</div>
<div class="place">BUENOS AIRES · ARGENTINA</div>
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: OUT, type: "jpeg", quality: 92 });
await browser.close();

console.log(`✓ ${OUT} — ${W}x${H}, ${(statSync(OUT).size / 1024).toFixed(0)}KB`);
