import type { Metadata } from "next";
import { CABINET, URL_SITE, EST_PRODUCTION } from "@/config/cabinet";

/**
 * Construit les métadonnées d'une page.
 *
 * Chaque page a un titre et une description uniques, une URL canonique unique,
 * et les métadonnées Open Graph correspondantes. L'image de partage est fournie
 * par la convention de fichier `app/opengraph-image` : elle n'a pas à être
 * déclarée ici. En préproduction, toutes les
 * pages sont marquées `noindex` : la recette ne doit jamais être indexée.
 */
export function metadonnees({
  titre,
  description,
  chemin,
  type = "website",
  publieLe,
  modifieLe,
}: {
  titre: string;
  description: string;
  chemin: string;
  type?: "website" | "article";
  publieLe?: string;
  modifieLe?: string;
}): Metadata {
  const url = `${URL_SITE}${chemin === "/" ? "" : chemin}`;
  return {
    title: titre,
    description,
    alternates: { canonical: url },
    robots: EST_PRODUCTION
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title: titre,
      description,
      url,
      siteName: CABINET.nom,
      locale: "fr_FR",
      type,
      ...(publieLe ? { publishedTime: publieLe } : {}),
      ...(modifieLe ? { modifiedTime: modifieLe } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: titre,
      description,
    },
  };
}
