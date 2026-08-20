import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  // Sólo se usa en etiquetas chicas ("PASO 01", numeritos), nunca en lo primero
  // que se ve. Sin preload deja de competir por el ancho de banda del arranque
  // en celulares: son ~22KB menos peleando con el CSS y el HTML.
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#04060d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Limpieza laser de alta precisión`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "limpieza laser",
    "limpieza laser",
    "restauración laser",
    "remover óxido",
    "remover pintura",
    "limpieza sin químicos",
    "limpieza de fachadas",
    "restauración de monumentos",
    "limpieza industrial",
    "ablación laser",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  applicationName: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Limpieza laser de alta precisión`,
    description: site.description,
    images: [{ url: "/logo.svg", width: 1280, height: 480, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Limpieza laser de alta precisión`,
    description: site.description,
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  image: `${site.url}/logo.svg`,
  slogan: site.slogan,
  areaServed: "AR",
  knowsAbout: [
    "Limpieza laser",
    "Restauración de patrimonio",
    "Remoción de óxido y pintura",
    "Ablación laser industrial",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Corre antes de que se pinte nada: si el visitante ya vio la intro en
            esta sesión, marca el <html> y el CSS la oculta de entrada. Así
            volver al sitio (o recargar) es instantáneo, sin parpadeo. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var k="il-intro";if(sessionStorage.getItem(k)){document.documentElement.setAttribute("data-intro","seen")}else{sessionStorage.setItem(k,"1")}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
