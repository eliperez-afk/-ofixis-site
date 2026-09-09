# OFIXIS — Audit Phase 0

**Date de l'audit :** 9 septembre 2026
**Périmètre :** site public `https://www.ofixis.fr/`, dépôt Git `eliperez-afk/-ofixis-site`
**Auteur :** équipe projet (Claude Code)
**Statut :** audit préliminaire — **incomplet par contrainte technique** (voir § 1)

---

## 1. Limite majeure de cet audit — à lever avant toute décision technique

L'environnement d'exécution utilisé pour ce projet applique une politique réseau
sortante restrictive. **Toute récupération directe de pages a été refusée** :

| Cible | Résultat |
|---|---|
| `https://www.ofixis.fr/` | `403` du proxy sortant — `EGRESS_BLOCKED` |
| `https://www.ofixis.fr/robots.txt` | `403` du proxy sortant — `EGRESS_BLOCKED` |
| `https://web.archive.org/…` | accès refusé |
| `https://developers.google.com/…` | accès refusé |

**Conséquence :** je n'ai pas pu lire le HTML du site, ses en-têtes HTTP, son
`robots.txt`, son `sitemap.xml`, ses scripts tiers, ses cookies, ni exécuter de
mesure Lighthouse ou de test d'accessibilité automatisé. Conformément aux règles
du projet, **je n'invente aucun contenu de page**.

Ce qui suit s'appuie donc uniquement sur des sources **indirectes et vérifiables** :
index des moteurs de recherche, registres publics (`annuaire-entreprises.data.gouv.fr`,
`pappers.fr`, `societe.com`), annuaire officiel de l'Ordre des experts-comptables,
et annuaires professionnels tiers. Chaque élément est tracé dans `CONTENT_INVENTORY.md`.

**Action attendue (bloquante pour l'audit technique complet) :** autoriser
`www.ofixis.fr` en sortie réseau, **ou** fournir un export du site
(archive HTML/WordPress, accès lecture au back-office, ou export Screaming Frog /
liste d'URLs depuis la Search Console). Sans cela, la matrice de redirections
restera partielle et les scores de performance/accessibilité de l'existant ne
pourront pas être établis.

---

## 2. Ce que l'audit indirect établit

### 2.1 Nature technique du site actuel

Les URL indexées révèlent une installation **WordPress** avec permaliens par date :

- `https://www.ofixis.fr/` — accueil
- `http://www.ofixis.fr/mentions-legales/` — *indexé en `http://`, pas en `https://`*
- `https://www.ofixis.fr/author/eli-amram/` — page auteur WordPress
- `https://www.ofixis.fr/2020/05/03/selarl-ou-centre-dentaire/`
- `https://www.ofixis.fr/2020/05/06/quels-sont-les-professionnels-de-sante-liberaux-concernes-par-la-prise-en-charge-des-indemnites-journalieres/`

**Signaux à vérifier dès que l'accès sera ouvert :** archives `/category/`, `/tag/`,
`/author/`, pagination `/page/N/`, flux `/feed/`, pièces jointes `/wp-content/uploads/`,
`/wp-admin/`, `/wp-json/`, `/xmlrpc.php`, versions WordPress et extensions,
présence de `sitemap_index.xml` (Yoast/RankMath).

**Risque relevé :** la page `mentions-legales` est indexée en clair (`http://`).
À confirmer : la redirection `http → https` et la canonicalisation `www`/apex
sont-elles correctement en place ? C'est un point de sécurité *et* de SEO.

**Risque relevé :** WordPress non maintenu = surface d'attaque. La version, les
extensions et la date de dernière mise à jour doivent être auditées avant de
décider du sort de l'installation existante.

### 2.2 Contenu éditorial existant

Deux articles identifiés, **datés de mai 2020**, orientés professions de santé :

- « SELARL ou Centre dentaire ? »
- « Quels sont les professionnels de santé libéraux concernés par la prise en
  charge des indemnités journalières ? » — sujet lié au contexte Covid-19,
  **très probablement obsolète sur le fond**

Le site présente par ailleurs un positionnement **médical et paramédical**
(médecins, spécialistes, infirmiers, dentistes, kinésithérapeutes, ostéopathes,
sages-femmes, psychologues, orthophonistes, audioprothésistes, opticiens) qui
n'apparaît pas dans le brief initial.

**Point produit à trancher :** cette clientèle santé est-elle toujours une
priorité commerciale ? Si oui, elle justifie des pages `/secteurs/` dédiées et
change la hiérarchie de l'arborescence. Si non, il faut décider du sort SEO des
contenus existants (mise à jour, désindexation, ou redirection).

**Point de conformité :** ces deux articles ne portent, en l'état de ce que je
peux voir, ni date de mise à jour, ni source primaire, ni relecteur identifié,
ni avertissement de portée générale — les quatre exigences de la règle n° 6.
Ils ne peuvent pas être repris tels quels.

### 2.3 Identité légale — **incohérences majeures détectées**

C'est le point le plus sérieux de cet audit.

| Donnée | Mentions légales du site actuel | Registres publics / annuaire OEC |
|---|---|---|
| Dénomination | Ofixis | OFIXIS |
| Forme | SARL | SARL |
| SIREN | 841 080 971 | 841 080 971 ✔ concordant |
| Capital | 1 000 € | non vérifié |
| RCS | **Bobigny** | siège indiqué à **Levallois-Perret (92300)** → relèverait de **Nanterre** |
| Siège | **2 rue de l'Union, 93130 Noisy-le-Sec** | **Levallois-Perret**, adresse relevée : **90 rue Chaptal, 92300** |
| Directeur de publication | M. Eli PEREZ | — |

L'annuaire officiel de l'Ordre des experts-comptables référence OFIXIS à
**Levallois-Perret**, et l'établissement SIRET `841 080 971 00036` est également
rattaché à Levallois-Perret.

**Lecture la plus probable (à confirmer, non publiable en l'état) :** le siège
social a été transféré et **les mentions légales du site n'ont pas été mises à
jour**. Des mentions légales inexactes constituent un manquement à l'article 6-III
de la LCEN et fragilisent la conformité RGPD (identification du responsable de
traitement).

**Autre anomalie :** l'adresse de Levallois-Perret n'apparaît nulle part dans la
liste de bureaux du site (Paris Ouest / Paris Est / Paris Sud). Un cabinet dont
le siège légal n'est pas mentionné sur son propre site est un signal de
désynchronisation générale des données.

### 2.4 Implantations — **cinq adresses en circulation, aucune consolidée**

| Adresse | Source | Statut |
|---|---|---|
| 7 rue Bosio, 75016 Paris (« Paris Ouest ») | site actuel | à confirmer |
| 2 rue de l'Union, 93130 Noisy-le-Sec (« Paris Est ») | site actuel + annuaires | à confirmer |
| 11 rue de Courloison, 77160 Provins (« Paris Sud ») | site actuel | **contradictoire** |
| 6 avenue Alain Peyrefitte, 77160 Provins | site actuel + annuaires (CEGECO) | **contradictoire** |
| 90 rue Chaptal, 92300 Levallois-Perret | registres + annuaire OEC | **absente du site** |
| 5 avenue du Général de Gaulle, 94160 Saint-Mandé (« Porte de Vincennes ») | annuaires tiers | **absente du site** |

Six adresses pour un cabinet qui en affiche trois. **Aucune page d'implantation
ne peut être écrite avant arbitrage.** C'est également un problème de SEO local
direct : la cohérence NAP (Nom / Adresse / Téléphone) est la base du référencement
local, et elle est actuellement rompue.

### 2.5 Téléphone — **NAP rompu**

| Numéro | Source |
|---|---|
| 01 89 41 04 76 | site actuel (affiché pour les trois bureaux) |
| 01 85 05 26 94 | annuaires tiers |
| 06 50 28 12 86 | annuaires tiers |

Un numéro unique pour trois implantations est un choix défendable (standard
centralisé), mais il doit être **délibéré** et répliqué à l'identique sur le
site, les fiches Google Business Profile et les annuaires.

### 2.6 Relation OFIXIS ↔ CEGECO — **question juridique, pas cosmétique**

Le site affiche « OFIXIS–Cegeco Paris Sud ». Or les registres publics montrent
**deux personnes morales distinctes** :

- **OFIXIS** — SARL, SIREN 841 080 971, immatriculée en 2018
- **CEGECO** (Centre d'Études de Gestion et d'Expertise Comptable) — **SAS**,
  SIREN 313 700 353, créée le 1er janvier 1978, 6 avenue Alain Peyrefitte, 77160 Provins

Présenter l'établissement d'une autre entité juridique comme un bureau d'OFIXIS
engage le cabinet : sur la véracité de l'information (art. 152 du Code de
déontologie), sur les mentions légales, et sur la responsabilité contractuelle
vis-à-vis d'un prospect qui croirait contracter avec OFIXIS.

**Il faut établir la nature exacte du lien** (rapprochement capitalistique,
fusion en cours, groupement, partenariat, simple mise à disposition de locaux)
et la formulation validée qui en découle. Tant que ce point n'est pas tranché,
**la mention « Paris Sud » ne sera pas publiée**.

### 2.7 Références clients — **interdiction de publication en l'état**

Des annuaires tiers associent à OFIXIS les noms **Allianz, Axa, Krys,
Orangetheory Fitness**. Le site actuel affiche par ailleurs des logos clients.

Ces éléments relèvent simultanément :

- du **secret professionnel** (art. 226-13 du Code pénal ; Code de déontologie) —
  révéler l'identité d'un client sans son accord est une faute, indépendamment
  de toute question de droit des marques ;
- du **droit des marques** — l'usage d'un logo suppose une licence ;
- de la **règle n° 3** du présent projet.

**Statut : interdit de publication** jusqu'à production d'une autorisation écrite,
nominative et datée, par client. Je recommande par défaut de **ne pas reprendre
les logos** dans la V1 et de leur substituer des preuves non nominatives
(secteurs accompagnés, types de missions, ancienneté moyenne des relations),
elles-mêmes validées.

### 2.8 Chiffres affichés

« 30 collaborateurs », « +700 clients ». Non vérifiables publiquement. Doivent
être **datés et périmétrés** (« au 1er janvier 2026, groupe OFIXIS » ≠ « OFIXIS SARL »).
Un chiffre qui agrège OFIXIS et CEGECO sans le dire serait trompeur.

### 2.9 Défauts d'expérience et de structure relevés dans le brief

Confirmés comme axes de travail, sous réserve de vérification directe :
répétitions de contenu, formulaires multiples identiques, faible nombre de pages
distinctes, absence de présentation d'équipe, absence de centre de contenus
structuré, absence de réservation de rendez-vous, lien « Connection » pointant
vers Microsoft sans libellé explicite.

### 2.10 Non audité à ce stade

Par manque d'accès : performances réelles (LCP/INP/CLS), Lighthouse,
accessibilité WCAG, en-têtes de sécurité (CSP, HSTS, X-Content-Type-Options),
cookies et traceurs réellement déposés, scripts tiers, `robots.txt`, `sitemap.xml`,
liens cassés, poids et formats des images, textes alternatifs, backlinks,
positions et pages à trafic (nécessite la Search Console).

---

## 3. Synthèse

### À conserver
- Le nom de domaine `ofixis.fr` et son historique d'indexation.
- La marque OFIXIS.
- Les numéros d'inscription OEC / CNCC (après vérification) — ce sont de vraies
  preuves de légitimité, à mettre en valeur plutôt qu'à reléguer en pied de page.
- L'ancrage multi-sites en Île-de-France, une fois les adresses consolidées.
- L'axe santé/professions libérales s'il est toujours pertinent commercialement.

### Problèmes
1. Mentions légales probablement périmées (siège / RCS).
2. Six adresses en circulation, trois affichées, aucune consolidée.
3. Trois numéros de téléphone en circulation.
4. Statut juridique du bureau « Paris Sud » non établi.
5. Références clients affichées sans autorisation vérifiée.
6. Contenus éditoriaux de 2020 non datés, non sourcés, non relus, potentiellement obsolètes.
7. Page indexée en `http://`.
8. Chiffres non datés ni périmétrés.
9. Absence de dispositif de conversion structuré (prise de rendez-vous, formulaire unique qualifiant).
10. Sécurité et maintenance de l'installation WordPress non évaluées.

### Risques
| Risque | Gravité | Traitement |
|---|---|---|
| Manquement au secret professionnel (logos/références clients) | **Élevée** | Ne rien publier sans autorisation écrite |
| Mentions légales inexactes (LCEN, RGPD) | **Élevée** | Bloquant avant mise en production |
| Information trompeuse sur l'implantation « Paris Sud » (art. 152) | **Élevée** | Bloquant avant publication de la page |
| Perte de référencement à la migration | Moyenne | Matrice de redirections exhaustive — nécessite l'accès aux URLs |
| Contenus fiscaux obsolètes engageant la responsabilité du cabinet | Moyenne | Datation, sourçage, relecture, avertissement, révision planifiée |
| Dépendance à un embed tiers (Bookings) sur la performance et les cookies | Faible | Solution de repli documentée (bouton vers Bookings) |

### Opportunités
- **Preuve institutionnelle sous-exploitée** : l'inscription à l'Ordre et à la
  CNCC, et la double compétence expertise comptable + commissariat aux comptes,
  différencient réellement — sans superlatif ni comparaison.
- **SEO local multi-implantations** : trois à cinq bureaux réels correctement
  décrits et cohérents avec autant de fiches Google Business Profile,
  c'est le levier le plus rentable à court terme.
- **Verticale santé/libéraux** : un contenu réellement expert sur SELARL, SEL,
  centres de santé, BNC/BIC, cumul emploi-retraite, capte des intentions
  précises et peu concurrentielles, avec un lien direct vers une mission.
- **Prise de rendez-vous en ligne** : encore rare chez les confrères ;
  transforme une intention tiède en créneau ferme sans friction téléphonique.
- **Repartir d'un socle propre** (Next.js + CMS headless) supprime la dette de
  sécurité WordPress et donne des performances hors d'atteinte du site actuel.

---

## 4. État du dépôt

Le dépôt `eliperez-afk/-ofixis-site` est **vide** — aucun commit sur aucune
branche. Il n'existe donc **aucune contrainte technique héritée** : le choix de
la stack est entièrement libre. Environnement disponible : Node.js 22.22.2,
npm 10.9.7 (registre npm accessible malgré la restriction réseau générale).
