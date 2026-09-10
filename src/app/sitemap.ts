import type { MetadataRoute } from "next";
import { URL_SITE, EQUIPE } from "@/config/cabinet";
import { MISSIONS } from "@/content/missions";
import { articlesPublies } from "@/lib/actualites";

/**
 * Sitemap dynamique.
 *
 * N'y figure que ce qui existe réellement : les pages sans contenu validé
 * (équipe sans consentement, articles en brouillon) en sont absentes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const maintenant = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${URL_SITE}/`, lastModified: maintenant, priority: 1 },
    { url: `${URL_SITE}/cabinet`, lastModified: maintenant, priority: 0.8 },
    { url: `${URL_SITE}/missions`, lastModified: maintenant, priority: 0.9 },
    { url: `${URL_SITE}/actualites`, lastModified: maintenant, priority: 0.7 },
    {
      url: `${URL_SITE}/prendre-rendez-vous`,
      lastModified: maintenant,
      priority: 0.9,
    },
    { url: `${URL_SITE}/contact`, lastModified: maintenant, priority: 0.9 },
    { url: `${URL_SITE}/mentions-legales`, lastModified: maintenant, priority: 0.2 },
    {
      url: `${URL_SITE}/politique-confidentialite`,
      lastModified: maintenant,
      priority: 0.2,
    },
    { url: `${URL_SITE}/accessibilite`, lastModified: maintenant, priority: 0.2 },
  ];

  for (const mission of MISSIONS) {
    pages.push({
      url: `${URL_SITE}/missions/${mission.slug}`,
      lastModified: maintenant,
      priority: 0.8,
    });
  }

  for (const article of articlesPublies()) {
    pages.push({
      url: `${URL_SITE}/actualites/${article.slug}`,
      lastModified: new Date(article.misAJourLe ?? article.publieLe),
      priority: 0.6,
    });
  }

  if (EQUIPE.length > 0) {
    pages.push({
      url: `${URL_SITE}/equipe`,
      lastModified: maintenant,
      priority: 0.7,
    });
  }

  return pages;
}
