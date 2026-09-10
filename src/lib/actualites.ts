import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Chargement des actualités depuis `content/actualites/*.md`.
 *
 * Choix assumé pour la V1 : les articles sont des fichiers Markdown versionnés
 * dans Git plutôt que des enregistrements dans un CMS. Cela permet de livrer un
 * site complet et fonctionnel sans attendre l'arbitrage sur le CMS (question L1)
 * ni engager d'abonnement. La structure des champs ci-dessous correspond
 * exactement au schéma prévu pour le CMS : la bascule se fera en remplaçant ce
 * seul fichier, sans toucher aux pages.
 *
 * Les champs obligatoires reprennent les exigences du cadrage : auteur,
 * relecteur, dates, catégorie, sources primaires, statut.
 */

const DOSSIER = path.join(process.cwd(), "content", "actualites");

export type StatutArticle = "brouillon" | "relecture" | "publie";

export type Article = {
  slug: string;
  titre: string;
  chapo: string;
  categorie: string;
  auteur: string;
  /** Personne du cabinet ayant validé le contenu (exigence déontologique). */
  relecteur: string;
  publieLe: string;
  misAJourLe: string | null;
  /** Sources primaires citées : BOFiP, URSSAF, Legifrance, etc. */
  sources: { libelle: string; url: string }[];
  /** Date à laquelle le contenu doit être revérifié. */
  revoirAvantLe: string | null;
  statut: StatutArticle;
  dureeLecture: number;
  html: string;
  sommaire: { niveau: number; titre: string; ancre: string }[];
};

function ancre(texte: string): string {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function lireArticle(nomFichier: string): Article | null {
  const chemin = path.join(DOSSIER, nomFichier);
  const brut = fs.readFileSync(chemin, "utf8");
  const { data, content } = matter(brut);

  const champsRequis = [
    "titre",
    "chapo",
    "categorie",
    "auteur",
    "relecteur",
    "publieLe",
    "statut",
  ];
  const manquants = champsRequis.filter((champ) => !data[champ]);
  if (manquants.length > 0) {
    throw new Error(
      `Article ${nomFichier} : champs obligatoires manquants — ${manquants.join(", ")}`,
    );
  }

  const sommaire: Article["sommaire"] = [];
  const renderer = new marked.Renderer();
  renderer.heading = function ({ tokens, depth }) {
    const titre = this.parser.parseInline(tokens);
    const id = ancre(titre.replace(/<[^>]+>/g, ""));
    if (depth === 2 || depth === 3) {
      sommaire.push({ niveau: depth, titre: titre.replace(/<[^>]+>/g, ""), ancre: id });
    }
    return `<h${depth} id="${id}">${titre}</h${depth}>\n`;
  };

  const html = marked.parse(content, { renderer, async: false });
  const mots = content.split(/\s+/).length;

  return {
    slug: nomFichier.replace(/\.md$/, ""),
    titre: String(data.titre),
    chapo: String(data.chapo),
    categorie: String(data.categorie),
    auteur: String(data.auteur),
    relecteur: String(data.relecteur),
    publieLe: String(data.publieLe),
    misAJourLe: data.misAJourLe ? String(data.misAJourLe) : null,
    sources: Array.isArray(data.sources) ? data.sources : [],
    revoirAvantLe: data.revoirAvantLe ? String(data.revoirAvantLe) : null,
    statut: String(data.statut) as StatutArticle,
    dureeLecture: Math.max(1, Math.round(mots / 220)),
    html,
    sommaire,
  };
}

function tousLesArticles(): Article[] {
  if (!fs.existsSync(DOSSIER)) return [];

  return fs
    .readdirSync(DOSSIER)
    .filter((nom) => nom.endsWith(".md"))
    .map(lireArticle)
    .filter((article): article is Article => article !== null)
    .sort((a, b) => b.publieLe.localeCompare(a.publieLe));
}

/**
 * Articles publiés uniquement.
 *
 * Les brouillons et les articles en relecture ne sont ni listés, ni générés,
 * ni présents dans le sitemap : un contenu non validé ne doit pas être
 * accessible publiquement, même par URL directe.
 */
export function articlesPublies(): Article[] {
  return tousLesArticles().filter((article) => article.statut === "publie");
}

export function trouverArticle(slug: string): Article | undefined {
  return articlesPublies().find((article) => article.slug === slug);
}

export function categoriesUtilisees(): string[] {
  return [...new Set(articlesPublies().map((article) => article.categorie))].sort();
}

export function formaterDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  });
}
