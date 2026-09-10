import type { MetadataRoute } from "next";
import { URL_SITE, EST_PRODUCTION } from "@/config/cabinet";

/**
 * En préproduction, l'exploration est interdite dans son ensemble — en
 * complément de l'en-tête `X-Robots-Tag` posé par next.config.ts.
 * Deux barrières valent mieux qu'une : une recette indexée par erreur est
 * longue à faire désindexer.
 */
export default function robots(): MetadataRoute.Robots {
  if (!EST_PRODUCTION) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${URL_SITE}/sitemap.xml`,
    host: URL_SITE,
  };
}
