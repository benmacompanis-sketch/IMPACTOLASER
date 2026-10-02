import { chromium } from "playwright";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });

async function medir(label, css, js) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });   // gama media
  await page.goto("http://localhost:3000/", { waitUntil: "load" });
  if (css) await page.addStyleTag({ content: css });
  if (js) await page.evaluate(js);
  await page.waitForTimeout(6500);
  const r = await page.evaluate(async () => {
    const frames = []; let prev = performance.now(); let y = 0; const t0 = performance.now();
    await new Promise(res => { const p = () => { const n = performance.now(); frames.push(n - prev); prev = n;
      y += 28; window.scrollTo(0, y); if (n - t0 < 4000) requestAnimationFrame(p); else res(); }; requestAnimationFrame(p); });
    frames.sort((a,b)=>a-b);
    return Math.round(1000 / frames[Math.floor(frames.length/2)]);
  });
  console.log(`  ${String(r).padStart(3)} fps   ${label}`);
  await ctx.close();
  return r;
}

console.log("\n═══ QUÉ CUESTA CADA COSA (CPU 4x lenta = compu de gama media) ═══");
const base = await medir("TAL COMO ESTÁ HOY");
console.log("  ───");
await medir("sin fondo 3D",            "canvas{display:none!important}");
await medir("sin backdrop-filter",     "*{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}");
await medir("sin desenfoques (blur)",  ".rounded-full[class*='blur-']{filter:none!important}[class*='blur-']{--tw-blur:none!important}");
await medir("sin tarjetas 3D",         ".transform-gpu{transform:none!important;perspective:none!important;transform-style:flat!important}");
await medir("sin animaciones infinitas","*,*::before,*::after{animation:none!important}");
await medir("sin scroll suave (Lenis)", null, () => { document.documentElement.classList.remove("lenis"); });
console.log("  ───");
await medir("TODO junto (fondo 3D + filtros + animaciones)",
  "canvas{display:none!important}*{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}.rounded-full[class*='blur-']{filter:none!important}[class*='blur-']{--tw-blur:none!important}.transform-gpu{transform:none!important;perspective:none!important;transform-style:flat!important}*,*::before,*::after{animation:none!important}");
await browser.close();
