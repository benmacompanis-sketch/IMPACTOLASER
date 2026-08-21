import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";
import { site } from "@/lib/site";
import "./globals.css";

// Ninguna fuente se precarga: durante la intro no se ve texto, así que pueden
// cargar tapadas por el overlay en vez de pelearle el ancho de banda al logo,
// que sí se ve. Con display:swap el texto aparece igual si alguna llega tarde.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: false,
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
        {/* El logo ES la intro: si llega tarde, la animación corre sin él. Sin
            esta línea el navegador lo descubría recién al parsear el componente
            y competía con todo el JavaScript, llegando último (2.7s en una
            prueba con 4G flojo). Declarado acá arriba, el preload scanner lo ve
            apenas empieza a leer el documento y lo baja con prioridad alta. */}
        {/* eslint-disable-next-line @next/next/no-head-element */}
        <link
          rel="preload"
          as="image"
          href="/logo-transparent.webp"
          type="image/webp"
          fetchPriority="high"
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
