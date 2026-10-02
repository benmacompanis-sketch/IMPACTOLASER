import { chromium } from "playwright";
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--enable-gpu-rasterization", "--ignore-gpu-blocklist"],
});

async function medir(label, cpu, prep) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  if (cpu > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
  await page.goto("http://localhost:3000/", { waitUntil: "load" });
  if (prep) await prep(page);
  await page.waitForTimeout(6500);           // pasar la intro

  const r = await page.evaluate(async () => {
    // registrar tareas largas del hilo principal
    const largas = [];
    try {
      new PerformanceObserver(l => l.getEntries().forEach(e => largas.push(Math.round(e.duration))))
        .observe({ entryTypes: ["longtask"] });
    } catch {}

    const frames = [];
    let prev = performance.now();
    let scrollY = 0;
    const t0 = performance.now();
    await new Promise(res => {
      const paso = () => {
        const now = performance.now();
        frames.push(now - prev); prev = now;
        scrollY += 28; window.scrollTo(0, scrollY);     // scroll continuo
        if (now - t0 < 5000) requestAnimationFrame(paso); else res();
      };
      requestAnimationFrame(paso);
    });

    frames.sort((a, b) => a - b);
    const med = frames[Math.floor(frames.length / 2)];
    const p95 = frames[Math.floor(frames.length * 0.95)];
    const malos = frames.filter(f => f > 1000 / 50).length;   // frames bajo 50fps
    return {
      fps: Math.round(1000 / med),
      peorFps: Math.round(1000 / p95),
      frames: frames.length,
      tirones: Math.round((malos / frames.length) * 100),
      largas: largas.length,
      msLargas: largas.reduce((a, b) => a + b, 0),
    };
  });
  console.log(`  ${label.padEnd(34)} ${String(r.fps).padStart(3)} fps medios · ${String(r.peorFps).padStart(3)} fps en lo peor · ${String(r.tirones).padStart(2)}% de frames con tirón · ${r.largas} tareas largas (${r.msLargas}ms)`);
  await ctx.close();
  return r;
}

console.log("\n═══ COMPUTADORA — scrolleando 5 segundos ═══");
await medir("tal como está hoy", 1);
await medir("con CPU 4x más lenta (gama media)", 4);

// aislar el costo del fondo 3D
const sinWebgl = async (page) => page.addStyleTag({ content: "canvas{display:none!important}" });
console.log("\n═══ AISLANDO EL FONDO 3D ═══");
await medir("sin el fondo 3D (CPU normal)", 1, sinWebgl);
await medir("sin el fondo 3D (CPU 4x lenta)", 4, sinWebgl);

await browser.close();
