/**
 * Genera public/logo-transparent.png a partir del logo oficial (con fondo negro).
 * Mapea el negro a transparencia (alpha = canal máximo), de modo que el logo
 * se integra sobre cualquier fondo sin recuadro negro y sin depender de blend.
 *
 * Uso (requiere sharp):  npm i sharp --no-save && node scripts/make-logo-transparent.mjs
 */
import sharp from "sharp";
import { existsSync } from "node:fs";

const INPUT = ["public/logo.jpg", "public/logo.png.jpeg"].find((p) => existsSync(p));
const OUTPUT = "public/logo-transparent.png";
const NEAR_BLACK = 16; // por debajo de esto → totalmente transparente (mata ruido JPEG)

if (!INPUT) {
  console.error("No se encontró el logo de origen en public/.");
  process.exit(1);
}

const { data, info } = await sharp(INPUT)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const a = Math.max(data[i], data[i + 1], data[i + 2]);
  data[i + 3] = a < NEAR_BLACK ? 0 : a;
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  // recorta el borde transparente sobrante → el logo aprovecha todo el alto
  .trim({ threshold: 12 })
  .png()
  .toFile(OUTPUT);

const meta = await sharp(OUTPUT).metadata();
console.log(
  `✓ Generado ${OUTPUT} (${meta.width}x${meta.height}, recortado) desde ${INPUT}`
);
