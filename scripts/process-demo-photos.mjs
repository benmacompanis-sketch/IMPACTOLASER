/**
 * Procesa las fotos del antes/después de la demo láser:
 *  - recorta el margen derecho (donde está la marca de agua de Gemini)
 *  - reescala a tamaño web y exporta JPEG optimizado (de ~10MB a pocos KB)
 *
 * Uso:  npm i sharp --no-save && node scripts/process-demo-photos.mjs
 */
import sharp from "sharp";
import { existsSync } from "node:fs";

const RIGHT_CROP = 0.15; // recorta el 15% derecho (marca de agua)
const TARGET_W = 1600; // ancho final (suficiente para el panel, con margen retina)

const jobs = [
  { in: "public/demo-sucio.jpg.png", out: "public/demo-sucio.jpg" },
  { in: "public/demo-limpio.jpg.png", out: "public/demo-limpio.jpg" },
];

for (const job of jobs) {
  if (!existsSync(job.in)) {
    console.log("· no existe, salteo:", job.in);
    continue;
  }
  const m = await sharp(job.in).metadata();
  const width = Math.round(m.width * (1 - RIGHT_CROP));
  await sharp(job.in)
    .extract({ left: 0, top: 0, width, height: m.height })
    .resize({ width: TARGET_W })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(job.out);
  const om = await sharp(job.out).metadata();
  console.log(`✓ ${job.out} → ${om.width}x${om.height}`);
}
