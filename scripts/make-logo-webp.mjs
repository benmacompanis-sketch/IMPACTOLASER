/**
 * Genera public/logo-transparent.webp a partir del PNG transparente.
 *
 * El logo se carga eager en la intro y en el navbar, así que es de lo primero
 * que descarga un celular. El WebP pesa ~80KB contra los ~278KB del PNG
 * (-71%) manteniendo la transparencia y sin diferencia visible.
 *
 * Uso:
 *   npm i sharp --no-save && node scripts/make-logo-webp.mjs
 */
import { statSync } from "node:fs";
import sharp from "sharp";

const SRC = "public/logo-transparent.png";
const OUT = "public/logo-transparent.webp";

const kb = (p) => (statSync(p).size / 1024).toFixed(0) + "KB";

await sharp(SRC).webp({ quality: 90, effort: 6 }).toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`✓ ${OUT} — ${meta.width}x${meta.height}, alpha: ${meta.hasAlpha}`);
console.log(`  ${SRC}: ${kb(SRC)}  →  ${OUT}: ${kb(OUT)}`);
