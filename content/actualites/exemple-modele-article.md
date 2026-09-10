---
titre: "Modèle d'article — à dupliquer, ne pas publier"
chapo: "Ce fichier documente le format attendu d'une actualité. Son statut « brouillon » le tient hors du site : il n'est ni généré, ni listé, ni présent dans le sitemap."
categorie: "Comptabilité"
auteur: "Prénom Nom"
relecteur: "Prénom Nom, expert-comptable"
publieLe: "2026-09-10"
misAJourLe: null
revoirAvantLe: "2027-09-10"
statut: brouillon
sources:
  - libelle: "Titre exact de la source officielle — BOFiP, URSSAF, Légifrance…"
    url: "https://bofip.impots.gouv.fr/"
---

## Comment utiliser ce modèle

Dupliquez ce fichier dans `content/actualites/`, nommez-le d'après le futur
slug de l'article (`facturation-electronique-calendrier.md` donnera l'adresse
`/actualites/facturation-electronique-calendrier`), puis remplissez l'en-tête.

Tant que `statut` vaut `brouillon` ou `relecture`, l'article n'existe pas côté
public : il n'apparaît dans aucune liste et son URL directe renvoie une page
404. Passez-le à `publie` uniquement après relecture par la personne nommée
dans le champ `relecteur`.

## Champs obligatoires

| Champ | Rôle |
| --- | --- |
| `titre` | Titre de l'article, également utilisé comme titre de la page |
| `chapo` | Résumé de deux phrases, repris en méta-description |
| `categorie` | Thème, qui alimente les filtres de la rubrique |
| `auteur` | Personne ayant rédigé |
| `relecteur` | Personne du cabinet ayant validé le fond |
| `publieLe` | Date de première publication, au format AAAA-MM-JJ |
| `misAJourLe` | Date de dernière mise à jour, ou `null` |
| `revoirAvantLe` | Date à laquelle le contenu doit être revérifié |
| `statut` | `brouillon`, `relecture` ou `publie` |
| `sources` | Sources primaires, avec leur libellé et leur URL |

## Règles de rédaction

Chaque affirmation technique s'appuie sur une source officielle citée dans
l'en-tête. Les seuils, taux et barèmes sont datés, car ils changent : c'est le
rôle du champ `revoirAvantLe`.

L'article n'annonce aucun résultat garanti, ne se compare à aucun confrère et
n'emploie pas de superlatif. L'avertissement de portée générale est ajouté
automatiquement en bas de page : il n'a pas à être répété dans le texte.

### Structure

Utilisez des titres de niveau 2 et 3 : un sommaire est généré automatiquement
au-delà de deux titres. Terminez par un lien vers la page mission concernée,
afin que le lecteur intéressé sache où aller ensuite.
