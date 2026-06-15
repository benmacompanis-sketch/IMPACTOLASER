/**
 * Global site configuration — brand identity, navigation and contact.
 * Editing copy here propagates across the whole experience.
 */

export const site = {
  name: "IMPACTO LÁSER",
  brand: {
    impacto: "IMPACTO",
    laser: "LÁSER",
  },
  slogan: "Limpieza y restauración sin dañar superficies",
  description:
    "Limpieza láser de alta precisión: removemos pintura, óxido, grasa y contaminantes sin agua, sin químicos y sin abrasivos. Tecnología industrial que respeta la superficie original.",
  url: "https://impactolaser.com",
  whatsapp: "5491100000000", // ← reemplazar por el número real
  email: "contacto@impactolaser.com",
  phoneDisplay: "+54 9 11 0000-0000",
  location: "Buenos Aires · Argentina",
} as const;

export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Tecnología", href: "#tecnologia" },
  { label: "Aplicaciones", href: "#aplicaciones" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const presupuestoHref =
  `https://wa.me/${site.whatsapp}?text=` +
  encodeURIComponent(
    "Hola IMPACTO LÁSER 👋 Quisiera solicitar un presupuesto de limpieza láser."
  );
