import { chromium } from "playwright";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
async function medir(label, cpu) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  if (cpu > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
  await page.goto("http://localhost:3000/", { waitUntil: "load" });
  await page.waitForTimeout(6500);
  const r = await page.evaluate(async () => {
    const frames = []; let prev = performance.now(); let y = 0; const t0 = performance.now();
    await new Promise(res => { const p = () => { const n = performance.now(); frames.push(n - prev); prev = n;
      y += 28; window.scrollTo(0, y); if (n - t0 < 4500) requestAnimationFrame(p); else res(); }; requestAnimationFrame(p); });
    frames.sort((a,b)=>a-b);
    return { fps: Math.round(1000/frames[Math.floor(frames.length/2)]), peor: Math.round(1000/frames[Math.floor(frames.length*0.95)]) };
  });
  console.log(`  ${label.padEnd(28)} ${String(r.fps).padStart(3)} fps medios · ${String(r.peor).padStart(3)} en lo peor`);
  await ctx.close();
}
console.log("\n═══ DESPUÉS de las optimizaciones invisibles ═══");
await medir("CPU normal", 1);
await medir("CPU 4x lenta (gama media)", 4);
await browser.close();
