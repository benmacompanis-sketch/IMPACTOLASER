/**
 * Global site configuration — brand identity, navigation and contact.
 * Editing copy here propagates across the whole experience.
 */

export const site = {
  name: "IMPACTO LASER",
  brand: {
    impacto: "IMPACTO",
    laser: "LASER",
  },
  slogan: "Limpieza y restauración sin dañar superficies",
  description:
    "Limpieza laser de alta precisión: removemos pintura, óxido, grasa y contaminantes sin agua, sin químicos y sin abrasivos. Tecnología industrial que respeta la superficie original.",
  url: "https://impactolaser.com",
  // WhatsApp / teléfono: +54 9 11 5876-1471 (formato internacional para wa.me)
  whatsapp: "5491158761471",
  whatsappDisplay: "+54 11 5876-1471",
  phone: "+5491158761471",
  phoneDisplay: "11 5876-1471",
  email: "impactolaser.arg@gmail.com",
  location: "Buenos Aires · Argentina",
} as const;

export type SocialKey = "instagram" | "tiktok" | "youtube" | "facebook";

export type Social = {
  key: SocialKey;
  label: string;
  handle: string;
  href: string;
  soon: boolean;
};

export const socials: Social[] = [
  {
    key: "instagram",
    label: "Instagram",
    handle: "Próximamente",
    href: "",
    soon: true,
  },
  {
    key: "tiktok",
    label: "TikTok",
    handle: "Próximamente",
    href: "",
    soon: true,
  },
  {
    key: "youtube",
    label: "YouTube",
    handle: "Próximamente",
    href: "",
    soon: true,
  },
  {
    key: "facebook",
    label: "Facebook",
    handle: "Próximamente",
    href: "",
    soon: true,
  },
];

export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Tecnología", href: "#tecnologia" },
  { label: "Aplicaciones", href: "#aplicaciones" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Contacto", href: "#contacto" },
] as const;

const whatsappMessage =
  "Hola IMPACTO LASER 👋 Quisiera solicitar un presupuesto de limpieza laser.";

/** Deep link to WhatsApp prefilled with a budget-request message. */
export const presupuestoHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  whatsappMessage
)}`;

/** Plain WhatsApp chat link (no prefilled message). */
export const whatsappHref = `https://wa.me/${site.whatsapp}`;
