import type { NextConfig } from "next";

type Redirection = NonNullable<Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>>[number];

/**
 * Redirections depuis les URLs de l'ancien site WordPress.
 *
 * Objectif : ne perdre aucune URL qui recevait du trafic. Chaque ligne a son
 * équivalent documenté dans REDIRECT_MAP.csv.
 *
 * Toutes les redirections sont permanentes (301). Next.js normalise déjà le
 * slash final (308) et la redirection http → https est assurée par
 * l'hébergement : ces deux cas n'ont donc pas à figurer ici.
 *
 * ⚠ Cette liste est INCOMPLÈTE. Elle ne couvre que les URLs retrouvées dans
 * l'index des moteurs. La liste exhaustive des pages à trafic viendra de la
 * Google Search Console (voir REDIRECT_MAP_NOTES.md).
 */
export const redirectionsHeritees: Redirection[] = [
  // ── Articles datés de l'ancien blog ──────────────────────────────────
  // Les deux articles connus datent de mai 2020 et n'ont pas été réactualisés.
  // Ils sont dirigés vers la rubrique Actualités plutôt que vers une page
  // d'article qui n'existe pas encore.
  {
    source: "/2020/05/03/selarl-ou-centre-dentaire",
    destination: "/actualites",
    permanent: true,
  },
  {
    source:
      "/2020/05/06/quels-sont-les-professionnels-de-sante-liberaux-concernes-par-la-prise-en-charge-des-indemnites-journalieres",
    destination: "/actualites",
    permanent: true,
  },

  // ── Motifs d'URL WordPress ───────────────────────────────────────────
  // Permaliens par date : /AAAA/MM/JJ/slug
  {
    source: "/:annee(\\d{4})/:mois(\\d{2})/:jour(\\d{2})/:slug",
    destination: "/actualites",
    permanent: true,
  },
  // Archives par catégorie, étiquette et auteur
  { source: "/category/:slug*", destination: "/actualites", permanent: true },
  { source: "/tag/:slug*", destination: "/actualites", permanent: true },
  { source: "/author/:slug*", destination: "/cabinet", permanent: true },
  // Pagination des archives
  { source: "/page/:numero(\\d+)", destination: "/actualites", permanent: true },
  // Flux RSS historiques
  { source: "/feed", destination: "/actualites/rss.xml", permanent: true },
  { source: "/comments/feed", destination: "/actualites/rss.xml", permanent: true },

  // ── Pages statiques de l'ancien site ─────────────────────────────────
  { source: "/nos-services", destination: "/missions", permanent: true },
  { source: "/services", destination: "/missions", permanent: true },
  { source: "/nous-contacter", destination: "/contact", permanent: true },
  { source: "/qui-sommes-nous", destination: "/cabinet", permanent: true },
  { source: "/a-propos", destination: "/cabinet", permanent: true },
];

/**
 * Chemins de l'ancien WordPress qui ne doivent plus répondre.
 * Traités en 410 (contenu supprimé) plutôt qu'en 301 : c'est plus honnête
 * pour les moteurs qu'une redirection vers une page sans rapport.
 */
export const cheminsSupprimes = [
  "/wp-admin",
  "/wp-login.php",
  "/xmlrpc.php",
  "/wp-json",
];
