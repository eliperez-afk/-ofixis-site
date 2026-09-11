# Site OFIXIS — refonte

Refonte du site du cabinet OFIXIS (expertise comptable et commissariat aux
comptes, Île-de-France), destiné à remplacer `https://www.ofixis.fr/`.

**État du projet : site développé et testé, en attente de validation des
contenus par le cabinet.** Rien n'est en production.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
npm run verify       # types, analyse statique, compilation, tests
npm run check:contenu # ce qui reste à valider avant mise en ligne
```

Copier `.env.example` en `.env.local` et renseigner les variables.
Le site fonctionne sans aucune d'entre elles : les fonctionnalités qui en
dépendent (envoi d'e-mails, espace client, prise de rendez-vous en ligne)
restent simplement masquées ou signalent explicitement leur indisponibilité.

## Organisation du code

| Chemin | Contenu |
|---|---|
| `src/config/cabinet.ts` | **Source unique de vérité** : adresse, téléphone, mentions légales, statut de validation de chaque donnée |
| `src/config/redirections.ts` | Redirections depuis l'ancien site WordPress |
| `src/content/missions.ts` | Textes des 8 pages de mission |
| `content/actualites/*.md` | Articles — voir `GUIDE_PUBLICATION.md` |
| `src/app/` | Pages et routes |
| `src/components/` | Composants d'interface |
| `src/lib/` | Métadonnées, JSON-LD, validation, envoi d'e-mails, limitation de débit |
| `tests/` | Tests de bout en bout |
| `scripts/check-contenu.mjs` | Barrière de mise en production |

## Par où commencer

| Document | À lire pour |
|---|---|
| [`PROJECT_STATUS.md`](PROJECT_STATUS.md) | L'état d'avancement, les décisions et les blocages |
| [`AUDIT_PHASE0.md`](AUDIT_PHASE0.md) | Ce que révèle l'audit du site existant |
| [`QUESTIONS_CADRAGE.md`](QUESTIONS_CADRAGE.md) | **Les questions auxquelles le cabinet doit répondre** |
| [`CADRAGE_TECHNIQUE.md`](CADRAGE_TECHNIQUE.md) | Le socle technique et l'arborescence proposés |
| [`CONTENT_INVENTORY.md`](CONTENT_INVENTORY.md) | Le statut de chaque donnée : confirmée, à confirmer, interdite |
| [`SEO_PLAN.md`](SEO_PLAN.md) | Le plan de visibilité et le calendrier éditorial |
| [`REDIRECT_MAP.csv`](REDIRECT_MAP.csv) | Les redirections préservant le référencement acquis |
| [`LAUNCH_CHECKLIST.md`](LAUNCH_CHECKLIST.md) | Ce qui doit être vérifié avant la mise en ligne |
| [`GUIDE_PUBLICATION.md`](GUIDE_PUBLICATION.md) | **Publier une actualité** — guide non technique |
| [`GUIDE_MICROSOFT_365.md`](GUIDE_MICROSOFT_365.md) | **Raccorder l'envoi des e-mails** à Microsoft 365 |
| [`RAPPORT_TESTS.md`](RAPPORT_TESTS.md) | Tests, accessibilité, performance et sécurité |

## Règles de travail

- Aucune information sur le cabinet n'est inventée. Toute donnée non validée par
  écrit reste au statut `À CONFIRMER` et n'est pas publiée.
- Aucun logo, nom, témoignage ou référence client sans autorisation écrite vérifiée.
- Aucun superlatif, aucune comparaison avec des confrères (articles 152 et 161
  du Code de déontologie).
- Tout contenu fiscal, social ou juridique est daté, sourcé, relu par une
  personne identifiée du cabinet, et assorti d'un avertissement de portée générale.
- Aucune mise en production ni modification DNS sans accord écrit explicite.

## Garde-fous automatiques

Le site est construit pour qu'une donnée non validée ne puisse pas être publiée
par inadvertance :

- une donnée au statut « à confirmer » s'affiche comme telle, en évidence ;
- la page « Équipe » n'existe pas tant qu'aucun consentement n'a été recueilli ;
- un article non relu renvoie une page introuvable, même par adresse directe ;
- la préproduction est interdite d'indexation par deux mécanismes distincts ;
- `npm run check:contenu -- --prod` **refuse le déploiement** tant qu'un
  élément reste en attente de validation ;
- des tests vérifient qu'aucune ancienne adresse, aucun ancien numéro et aucun
  nom de client ne réapparaît sur le site.
