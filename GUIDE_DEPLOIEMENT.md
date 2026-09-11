# Mettre le site en ligne — Vercel et IONOS

**Mis à jour le 11 septembre 2026**

Ce guide couvre deux étapes distinctes, à faire dans l'ordre :

1. **Publier une préproduction** — le site en ligne, privé, pour recette.
   Aucun effet sur `www.ofixis.fr`, aucun risque.
2. **Basculer le domaine** — le site devient public. **Sur accord écrit uniquement.**

> Ces manipulations se font dans **vos** comptes. Je n'y ai pas accès et je ne
> peux pas les faire à votre place : ni compte Vercel, ni compte IONOS, ni
> accès réseau depuis mon environnement de travail. Chaque étape est décrite
> pour être suivie clic par clic, et je reste disponible à chaque blocage.

---

# Partie 1 — La préproduction

## 1.1 Relier Vercel à GitHub

Vous vous êtes connecté à Vercel avec votre identifiant Apple
(`eli.perez@outlook.fr`). C'est très bien, mais Vercel ne voit pas encore le
code : celui-ci est sur GitHub, dans un compte différent.

Dans Vercel → **Settings** → **Authentication** (ou lors du premier import),
connectez votre compte **GitHub** — celui qui possède le dépôt
`eliperez-afk/-ofixis-site`. Vercel demandera l'autorisation d'accéder à vos
dépôts ; vous pouvez la limiter à ce seul dépôt.

## 1.2 Importer le projet

Vercel → **Add New** → **Project** → choisissez `-ofixis-site` → **Import**.

Vercel reconnaît Next.js tout seul. **Ne modifiez aucun réglage de build** :
la commande, le répertoire de sortie et la version de Node sont déjà corrects.

Le dépôt ne contient qu'une branche,
`claude/ofixis-website-redesign-9a8kk6` : c'est celle que Vercel utilisera.
Vous pouvez le vérifier ensuite dans **Settings** → **Git** → *Production Branch*.

## 1.3 Renseigner les variables d'environnement

Avant de lancer le premier déploiement, ouvrez **Environment Variables** et
ajoutez celles-ci. Elles sont toutes décrites dans `.env.example`.

**Pour la préproduction — les trois seules indispensables :**

| Nom | Valeur |
|---|---|
| `NEXT_PUBLIC_ENVIRONNEMENT` | `preproduction` |
| `NEXT_PUBLIC_URL_SITE` | `https://www.ofixis.fr` |
| `NEXT_PUBLIC_URL_ESPACE_CLIENT` | `https://apps.tiime.fr/signin` |

`NEXT_PUBLIC_ENVIRONNEMENT` à `preproduction` déclenche trois comportements :
le bandeau « Version de recette » en haut des pages, l'interdiction
d'indexation dans `robots.txt`, et l'en-tête `X-Robots-Tag: noindex`. Le site
ne peut donc pas apparaître dans Google par accident.

**Pour que le formulaire envoie réellement — à ajouter dès que l'application
Microsoft est créée :**

| Nom | Valeur |
|---|---|
| `MS_TENANT_ID` | ID de l'annuaire (locataire) |
| `MS_CLIENT_ID` | ID de l'application |
| `MS_CLIENT_SECRET` | Le secret de l'application |
| `MS_BOITE_EXPEDITRICE` | `site@ofixis.fr` |
| `EMAIL_DESTINATAIRE` | `contact@ofixis.fr` |

> **Saisissez `MS_CLIENT_SECRET` directement dans Vercel**, jamais dans un
> e-mail ni un message. Vercel le chiffre et ne le réaffiche plus ensuite.

Puis **Deploy**. Comptez une à deux minutes.

## 1.4 Protéger l'accès

Vercel → **Settings** → **Deployment Protection** → activez
**Vercel Authentication**.

Seules les personnes connectées à Vercel et ayant accès au projet pourront
alors ouvrir le site. C'est gratuit sur toutes les offres, y compris la
gratuite.

À savoir : la protection par simple mot de passe partageable est une option
payante (offre Pro, environ 20 $ par mois et par projet). Sur l'offre gratuite,
pour montrer le site à quelqu'un, il faut l'inviter comme membre du projet —
et **l'offre gratuite ne permet qu'un seul utilisateur externe**. Si vous devez
le faire relire par plusieurs personnes, dites-le moi : il existe des
contournements simples, et le passage à l'offre payante reste votre décision.

Quoi qu'il arrive, l'interdiction d'indexation posée par le site lui-même
fonctionne indépendamment de ce réglage.

## 1.5 Vérifier

Ouvrez l'adresse fournie par Vercel (de la forme `xxx.vercel.app`) et vérifiez :

- [ ] le bandeau sombre « Version de recette » s'affiche en haut
- [ ] `/robots.txt` affiche `Disallow: /`
- [ ] le numéro de téléphone lance bien un appel depuis un mobile
- [ ] le bouton « Espace client » ouvre le portail Tiime dans un nouvel onglet
- [ ] les huit pages de mission s'affichent correctement
- [ ] le formulaire : soit il envoie réellement, soit il affiche une erreur
      explicite — **jamais un faux succès**

**À ce stade, `www.ofixis.fr` n'a pas bougé d'un pouce.** L'ancien site
continue de fonctionner normalement.

---

# Partie 2 — La bascule du domaine

> **À ne lancer qu'après votre accord écrit explicite**, et après avoir levé
> les points bloquants de `LAUNCH_CHECKLIST.md` — au premier rang desquels
> l'attestation d'assurance RC professionnelle.

## 2.1 Avant tout : sauvegarder l'existant

Le domaine est chez **IONOS**. Reste à établir **où le site WordPress actuel
est hébergé** — souvent chez IONOS également, parfois ailleurs.

Avant toute modification :

1. **Sauvegarde complète** de l'ancien site : fichiers et base de données.
   Chez IONOS, cela passe par l'espace client (sauvegarde du pack
   d'hébergement) ou par l'export WordPress.
2. **Capture d'écran de la zone DNS actuelle**, tous enregistrements visibles.
   C'est ce qui permettra de tout remettre en état en quelques minutes si
   nécessaire.
3. **Vérification** que la sauvegarde se restaure réellement — une sauvegarde
   jamais testée n'est pas une sauvegarde.

**L'ancien site ne sera pas supprimé.** Il restera en sauvegarde après la
bascule, le temps de s'assurer que tout fonctionne.

## 2.2 Préparer : abaisser le TTL

Dans la zone DNS chez IONOS, **24 à 48 heures avant** la bascule, ramenez le
TTL des enregistrements concernés à la valeur la plus basse proposée
(300 secondes si possible).

Le TTL est la durée pendant laquelle les fournisseurs d'accès gardent en
mémoire l'ancienne adresse. Un TTL bas au moment de la bascule signifie que le
changement — **et un éventuel retour en arrière** — se propage en minutes
plutôt qu'en heures.

## 2.3 Déclarer le domaine dans Vercel

Vercel → projet → **Settings** → **Domains** → ajoutez `www.ofixis.fr`,
puis `ofixis.fr`.

Vercel affiche alors **les enregistrements DNS exacts à créer**. Utilisez
**ces valeurs-là**, telles qu'affichées : elles diffèrent d'un projet à
l'autre, les projets récents recevant une adresse issue d'un ensemble
d'adresses distinctes. Vous verrez typiquement :

- un enregistrement **A** pour `ofixis.fr` (le domaine nu) ;
- un enregistrement **CNAME** pour `www`.

Un CNAME ne peut pas être posé sur le domaine nu — la norme DNS l'interdit dès
lors que d'autres enregistrements y existent, ce qui est le cas de vos
enregistrements de messagerie. D'où l'enregistrement A.

## 2.4 Modifier la zone DNS chez IONOS

Dans l'espace client IONOS : **Domaines & SSL** → `ofixis.fr` → **DNS**.

1. Si le domaine est « connecté » à un pack d'hébergement ou à un site IONOS,
   **détachez-le d'abord** : tant qu'il l'est, IONOS ne laisse pas modifier
   librement les enregistrements.
2. Modifiez l'enregistrement **A** du domaine nu avec la valeur affichée par Vercel.
3. Modifiez ou créez le **CNAME** de `www` avec la valeur affichée par Vercel.
4. **Ne touchez à rien d'autre.**

> ⚠ **Ne supprimez surtout pas les enregistrements MX, SPF, DKIM ni DMARC.**
> Ce sont eux qui font fonctionner votre messagerie Microsoft 365. Les
> supprimer couperait tous les e-mails du cabinet, y compris ceux du
> formulaire. Seuls l'enregistrement A et le CNAME `www` sont concernés.

## 2.5 Basculer le site en production

Dans Vercel, passez `NEXT_PUBLIC_ENVIRONNEMENT` de `preproduction` à
`production`, puis relancez un déploiement.

Cela retire le bandeau de recette, autorise l'indexation, publie le sitemap et
active l'en-tête de sécurité HSTS.

Désactivez également **Vercel Authentication**, sans quoi le site resterait
privé.

## 2.6 Vérifier immédiatement après

- [ ] `https://www.ofixis.fr` affiche le nouveau site
- [ ] `http://ofixis.fr` redirige vers `https://www.ofixis.fr`
- [ ] le bandeau de recette a disparu
- [ ] `/robots.txt` autorise désormais l'indexation
- [ ] `/sitemap.xml` répond
- [ ] **un e-mail de test arrive bien sur `contact@ofixis.fr`**
- [ ] les anciennes adresses ne renvoient pas d'erreur — par exemple
      `www.ofixis.fr/mentions-legales/` et
      `www.ofixis.fr/2020/05/03/selarl-ou-centre-dentaire/`
- [ ] **votre messagerie fonctionne toujours** : envoyez-vous un e-mail

Puis, dans la Search Console, soumettez le sitemap et demandez l'indexation
des pages principales.

## 2.7 Si quelque chose ne va pas

Remettez dans la zone DNS IONOS les valeurs relevées à l'étape 2.1. Avec un
TTL bas, le retour à l'ancien site prend quelques minutes. L'ancien site
n'ayant pas été supprimé, il répond de nouveau normalement.

**Ne supprimez l'ancien hébergement qu'après trente jours de fonctionnement
sans incident.**

---

# Ce qui reste ensuite

Pendant trente jours : surveiller les erreurs 404, l'indexation, les
performances réelles et le nombre de demandes reçues. Le détail figure dans
`LAUNCH_CHECKLIST.md`.
