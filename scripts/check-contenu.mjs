#!/usr/bin/env node
/**
 * Barrière de mise en production.
 *
 * Refuse le déploiement tant qu'il reste, dans le site, une donnée non validée
 * par le cabinet ou un texte au statut « brouillon ». L'objectif est
 * mécanique : rendre impossible la publication accidentelle d'une mention
 * légale approximative ou d'un contenu non relu.
 *
 * Usage :
 *   npm run check:contenu           → inventaire, sortie 0 (informatif)
 *   npm run check:contenu -- --prod → sortie 1 s'il reste quoi que ce soit
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const modeProduction = process.argv.includes("--prod");
const anomalies = [];

// ── 1. Données du cabinet restant à confirmer ─────────────────────────────
const cabinet = readFileSync("src/config/cabinet.ts", "utf8");

for (const ligne of cabinet.split("\n")) {
  const correspondance = ligne.match(/^\s*(\w+):\s*aConfirmer[<(]/);
  if (correspondance) {
    anomalies.push({
      categorie: "Donnée non validée",
      detail: `src/config/cabinet.ts — champ « ${correspondance[1]} »`,
    });
  }
}

// ── 2. Textes de mission encore au statut brouillon ───────────────────────
const missions = readFileSync("src/content/missions.ts", "utf8");
const slugs = [...missions.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const brouillons = (missions.match(/statutRedaction:\s*"brouillon"/g) ?? []).length;

if (brouillons > 0) {
  anomalies.push({
    categorie: "Texte non validé",
    detail: `${brouillons} page(s) mission sur ${slugs.length} au statut « brouillon »`,
  });
}

// ── 3. Articles non publiés ───────────────────────────────────────────────
const dossierArticles = join("content", "actualites");
if (existsSync(dossierArticles)) {
  for (const fichier of readdirSync(dossierArticles)) {
    if (!fichier.endsWith(".md")) continue;
    const contenu = readFileSync(join(dossierArticles, fichier), "utf8");
    const statut = contenu.match(/^statut:\s*(\S+)/m)?.[1];
    if (statut && statut !== "publie") {
      anomalies.push({
        categorie: "Article non publié",
        detail: `${fichier} — statut « ${statut} » (non généré, non indexé)`,
      });
    }
  }
}

// ── Restitution ───────────────────────────────────────────────────────────
if (anomalies.length === 0) {
  console.log("✓ Aucun contenu en attente de validation.");
  process.exit(0);
}

const parCategorie = new Map();
for (const anomalie of anomalies) {
  const liste = parCategorie.get(anomalie.categorie) ?? [];
  liste.push(anomalie.detail);
  parCategorie.set(anomalie.categorie, liste);
}

console.log(`\n${anomalies.length} élément(s) en attente de validation :\n`);
for (const [categorie, details] of parCategorie) {
  console.log(`  ${categorie}`);
  for (const detail of details) console.log(`    · ${detail}`);
  console.log("");
}

if (modeProduction) {
  console.error(
    "✗ Mise en production refusée : ces éléments doivent être validés par le cabinet.\n",
  );
  process.exit(1);
}

console.log(
  "Sortie informative. Utiliser « npm run check:contenu -- --prod » comme barrière avant déploiement.\n",
);
