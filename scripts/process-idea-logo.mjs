/**
 * Convierte el logo de I.D.E.A Code (sobre fondo crema) en una versión
 * "dark mode" con fondo transparente para el footer oscuro:
 *  - quita el fondo crema (keying por distancia de color)
 *  - pasa las partes oscuras (lamparita, "I.D.E.A", texto) a claro
 *  - conserva y aviva el verde (globo, "Code")
 *
 * Uso: npm i sharp --no-save && node scripts/process-idea-logo.mjs
 */
import sharp from "sharp";

const INPUT = "public/idea-code-logo.svg.png";
const OUTPUT = "public/idea-code-logo-dark.png";
const LIGHT = [232, 238, 247]; // tono claro destino para lo oscuro

const { data, info } = await sharp(INPUT).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

// color de fondo de referencia (esquina superior izquierda)
const cr = data[0], cg = data[1], cb = data[2];

for (let i = 0; i < data.length; i += 4) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const dist = Math.sqrt((r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2);
  let a = Math.min(1, dist / 200);
  if (a < 0.15) a = 0;

  const isGreen = g > r + 10 && g > b + 10;
  if (a > 0) {
    if (isGreen) {
      data[i] = Math.min(255, Math.round(r * 1.5));
      data[i + 1] = Math.min(255, Math.round(g * 1.5));
      data[i + 2] = Math.min(255, Math.round(b * 1.5));
    } else {
      data[i] = LIGHT[0];
      data[i + 1] = LIGHT[1];
      data[i + 2] = LIGHT[2];
    }
  }
  data[i + 3] = Math.round(a * 255);
}

await sharp(Buffer.from(data), { raw: { width: info.width, height: info.height, channels: 4 } })
  .trim()
  .resize({ width: 760 })
  .png()
  .toFile(OUTPUT);

const m = await sharp(OUTPUT).metadata();
console.log(`✓ ${OUTPUT} → ${m.width}x${m.height}`);
