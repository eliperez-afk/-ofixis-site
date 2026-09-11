# Matrice de redirections — notes de méthode

**Statut : IMPLÉMENTÉE MAIS INCOMPLÈTE.**

Les redirections listées dans `REDIRECT_MAP.csv` sont en place dans le code
(`src/config/redirections.ts`) et vérifiées par les tests automatisés.

`REDIRECT_MAP.csv` ne contient aujourd'hui que les URLs que l'index des moteurs
de recherche a permis d'identifier. Le site n'ayant pas pu être exploré
(cf. `AUDIT_PHASE0.md` § 1 — blocage réseau sortant), **cette matrice est
certainement très incomplète**.

## Pourquoi des codes 308 et non 301

Next.js émet un **308 Permanent Redirect** là où l'ancien usage employait un 301.
Les deux codes signifient « déplacé définitivement » et sont traités de façon
identique par les moteurs de recherche pour la transmission du référencement.
Le 308 a l'avantage de préserver la méthode HTTP. Aucune action n'est requise.

## Ce qu'il faut pour la compléter

Le site actuel est hébergé chez **IONOS**, et le cabinet en a l'accès : la
liste des pages est donc récupérable directement, ce qui n'était pas le cas
lors de l'audit initial.

Le plus rapide : ouvrir dans un navigateur l'une de ces adresses et en
transmettre le contenu.

- `https://www.ofixis.fr/wp-sitemap.xml` — plan du site généré par WordPress
- `https://www.ofixis.fr/sitemap_index.xml` — si l'extension Yoast est installée
- `https://www.ofixis.fr/sitemap.xml` — autres extensions

À défaut, l'export WordPress (`Outils` → `Exporter` → `Tout le contenu`)
contient l'intégralité des adresses.

Une seule de ces sources suffit, par ordre de préférence :

1. **Google Search Console** — export « Pages » sur 16 mois. C'est la source la
   plus utile : elle donne les URLs *qui reçoivent réellement du trafic et des
   impressions*, donc celles dont la redirection compte vraiment.
2. **Le `sitemap.xml` du site actuel** — généralement `sitemap_index.xml` sur une
   installation WordPress équipée de Yoast ou RankMath.
3. **Un accès en lecture au back-office WordPress**, ou l'autorisation réseau
   permettant une exploration complète depuis cet environnement.

## Motifs d'URL à couvrir systématiquement (WordPress)

L'installation actuelle utilise des permaliens par date. Il faudra donc traiter :

| Motif | Traitement prévu |
|---|---|
| `/AAAA/MM/JJ/slug/` | 301 vers `/actualites/slug` — au cas par cas selon la pertinence du contenu |
| `/category/…` | 301 vers `/actualites?theme=…` ou vers `/actualites` |
| `/tag/…` | 301 vers `/actualites` |
| `/author/…` | 301 vers `/equipe` |
| `/page/N/` | 301 vers la page 1 de la rubrique correspondante |
| `/feed/`, `/comments/feed/` | 301 vers le nouveau flux RSS `/actualites/rss.xml` |
| `/wp-content/uploads/…` | conserver les fichiers réellement liés (PDF notamment) ou 410 |
| `/wp-admin`, `/wp-login.php`, `/xmlrpc.php`, `/wp-json` | 410 après extinction de WordPress |
| Pages de service existantes | 301 vers la page `/missions/…` correspondante |

## Règles de décision

- **301** par défaut pour toute URL utile ayant un équivalent thématique.
- **410** pour ce qui est délibérément supprimé et sans équivalent — plus honnête
  qu'une 301 vers l'accueil, et mieux traité par les moteurs.
- **Jamais** de redirection massive vers l'accueil : les moteurs la traitent
  comme une 404 déguisée (*soft 404*) et le bénéfice SEO est nul.
- **Une seule redirection** par URL : pas de chaîne `A → B → C`.
- Toute URL recevant du trafic doit avoir une cible **thématiquement équivalente**,
  pas simplement une cible qui répond en 200.

## Contrôle avant mise en production

1. Rejouer 100 % des lignes du CSV et vérifier : code retourné, URL finale,
   absence de chaîne de redirection.
2. Vérifier qu'aucune ancienne URL utile ne retourne 404.
3. Vérifier la canonicalisation retenue (`www` ou apex) et la redirection
   `http → https` sur l'ensemble.
4. Conserver la matrice active **au moins 12 mois** après la bascule.
