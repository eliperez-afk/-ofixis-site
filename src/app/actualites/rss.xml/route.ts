import { articlesPublies } from "@/lib/actualites";
import { CABINET, URL_SITE } from "@/config/cabinet";

/** Flux RSS des actualités publiées. */
export async function GET(): Promise<Response> {
  const articles = articlesPublies();

  const echapper = (valeur: string): string =>
    valeur
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const elements = articles
    .map((article) => {
      const lien = `${URL_SITE}/actualites/${article.slug}`;
      return `    <item>
      <title>${echapper(article.titre)}</title>
      <link>${lien}</link>
      <guid isPermaLink="true">${lien}</guid>
      <description>${echapper(article.chapo)}</description>
      <category>${echapper(article.categorie)}</category>
      <pubDate>${new Date(`${article.publieLe}T09:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const flux = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${CABINET.nom} — Actualités</title>
    <link>${URL_SITE}/actualites</link>
    <description>Actualités comptables, fiscales, sociales et juridiques du cabinet ${CABINET.nom}.</description>
    <language>fr-FR</language>
    <atom:link href="${URL_SITE}/actualites/rss.xml" rel="self" type="application/rss+xml" />
${elements}
  </channel>
</rss>`;

  return new Response(flux, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
