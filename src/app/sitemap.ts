import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    // Páginas legales: existen y están enlazadas en el footer, pero antes no
    // figuraban acá, así que Google no tenía cómo conocerlas. Prioridad baja
    // porque no son lo que queremos posicionar, pero conviene que estén
    // indexadas: dan señal de sitio serio y son las que un cliente busca
    // cuando quiere saber quién está detrás.
    {
      url: `${site.url}/aviso-legal`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${site.url}/privacidad`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
