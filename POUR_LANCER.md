# Ce qu'il reste à faire pour mettre le site en ligne

**Mis à jour le 11 septembre 2026**
**À l'attention du dirigeant du cabinet OFIXIS**

---

## En un mot

**Le site est fait.** Quatorze pages, écrites, testées, qui fonctionnent.
Ce qui reste n'est plus du développement : ce sont des **accès à vos comptes**,
que je ne peux pas créer à votre place, et **trois informations**.

Rien de ce qui suit ne demande de compétence technique de votre part, sauf
l'étape 1, qui est le travail d'une demi-heure pour votre administrateur
Microsoft 365.

---

## Ce que j'attends de vous — six points

### 1. Les identifiants Microsoft pour l'envoi des e-mails

**Pourquoi :** sans cela, quand un visiteur remplit le formulaire de contact,
rien ne part. Le site le lui dira honnêtement — il n'affichera jamais un faux
message de succès — mais vous ne recevrez pas la demande.

**Ce qu'il faut faire :** suivre `GUIDE_MICROSOFT_365.md`, qui détaille chaque
écran. Comptez une trentaine de minutes pour la personne qui administre votre
Microsoft 365.

**Ce que vous me transmettez :** quatre valeurs.

| Variable | D'où elle vient |
|---|---|
| `MS_TENANT_ID` | Page d'aperçu de l'application Entra |
| `MS_CLIENT_ID` | Page d'aperçu de l'application Entra |
| `MS_CLIENT_SECRET` | Créé à l'étape 5 du guide |
| `MS_BOITE_EXPEDITRICE` | La boîte d'envoi, par exemple `site@ofixis.fr` |

> ⚠ **Ne m'envoyez pas le secret par message.** Il se saisit directement dans
> l'interface de l'hébergement, où il reste chiffré. Dites-moi simplement quand
> c'est fait, ou faisons-le ensemble.

**C'est le seul point vraiment bloquant pour que le site serve à quelque chose.**

---

### 2. L'accès à l'hébergement

**Pourquoi :** il faut un endroit où le site tourne réellement. Aujourd'hui il
n'existe que sous forme de code.

**Ce qu'il faut faire :** créer un compte sur **vercel.com** avec l'adresse du
cabinet, puis m'y donner accès — ou le faire ensemble, cela prend dix minutes.
L'offre gratuite suffit pour un site de cette taille ; si un jour vous passez
à l'offre payante, ce sera votre décision, pas la mienne.

**Ce que cela permet :** je déploie une **préproduction** — une version en
ligne, protégée par mot de passe et invisible des moteurs de recherche, que
vous pourrez parcourir sur votre téléphone et montrer autour de vous avant
toute décision.

---

### 3. L'accès au nom de domaine `ofixis.fr`

**Pourquoi :** pour que `www.ofixis.fr` pointe vers le nouveau site le jour J,
il faut modifier un réglage chez l'entreprise auprès de laquelle le domaine a
été acheté (le « registrar »).

**Ce que j'ai besoin de savoir :**

- chez qui le domaine `ofixis.fr` est-il enregistré (OVH, Gandi, Ionos…) ?
- qui héberge le site WordPress actuel ?
- qui a les identifiants de ces deux comptes ?

Si vous ne savez pas, votre prestataire actuel ou vos anciennes factures le
diront. **C'est souvent le point qui retarde le plus un lancement**, donc
autant le chercher dès maintenant, avant d'en avoir besoin.

> **Rien ne sera modifié sans votre accord écrit explicite.** Et l'ancien site
> ne sera pas supprimé : il restera sauvegardé, avec une procédure de retour en
> arrière testée.

---

### 4. L'attestation d'assurance RC professionnelle

**Pourquoi :** c'est la dernière ligne manquante de vos mentions légales.

**Ce qu'il faut :** l'attestation **de l'exercice en cours**, à demander à
Verspieren. Le document que vous m'avez transmis porte sur 2020 : il prouve
qu'un contrat existait alors, pas que vous êtes couvert aujourd'hui.

**En attendant :** la page indique que le cabinet est couvert — c'est une
obligation pour tout professionnel inscrit — sans nommer d'assureur ni de
numéro de police. Ce n'est pas bloquant pour une préproduction, ça l'est pour
la mise en ligne définitive.

---

### 5. Votre relecture des textes

**Pourquoi :** j'ai rédigé huit pages de mission. Elles décrivent ces missions
telles qu'elles s'exercent habituellement dans un cabinet d'expertise
comptable. Elles ne contiennent **aucun chiffre, délai, tarif ou engagement**
qui vous soit propre — je ne les ai pas inventés.

Mais c'est **votre** cabinet : vous seul savez si le périmètre décrit
correspond à ce que vous proposez réellement.

**Ce qu'il faut faire :** parcourir les huit pages sur la préproduction et me
dire, pour chacune : c'est juste / il manque ceci / retirez cela.

Les huit pages :
expertise comptable · fiscalité · paie et social · audit et commissariat aux
comptes · création et reprise · pilotage et conseil · transmission et
évaluation · juridique

**Deux pages ont été volontairement écartées** : gestion de patrimoine (elle
suppose des habilitations — CIF, ORIAS — que je n'ai pas vérifiées) et
international (je ne sais pas si l'offre existe réellement). Dites-moi si
elles doivent exister.

---

### 6. Votre feu vert

Quand la préproduction vous convient, vous me donnez votre accord **par écrit**
et je procède à la bascule. Pas avant.

---

## Trois choses facultatives

Elles n'empêchent pas le lancement, mais elles rapportent.

| | Pourquoi c'est utile |
|---|---|
| **Une page Microsoft Bookings** | Un prospect réserve un créneau à 22 h sans vous appeler. Aujourd'hui la page de rendez-vous renvoie vers le téléphone et le formulaire, ce qui fonctionne, mais convertit moins |
| **Des photos du cabinet et de l'équipe** | Le site n'a aucune image. C'est volontaire : pas de banque d'images, pas de visages générés par ordinateur. De vraies photos de vos bureaux et de vos collaborateurs feraient beaucoup |
| **Votre fiche Google Business Profile** | Le levier le plus rentable à court terme pour être trouvé à Levallois. Voir plus bas |

---

## Ce que je fais, moi, à chaque étape

| Vous | Moi |
|---|---|
| Identifiants Microsoft | Je raccorde le formulaire et je teste un envoi réel de bout en bout |
| Accès à l'hébergement | Je déploie la préproduction et je vous envoie le lien |
| Accès au domaine | Je prépare la bascule, les redirections et la procédure de retour arrière |
| Attestation RCP | Je complète les mentions légales |
| Relecture des textes | J'applique vos corrections |
| Feu vert | Je bascule, je soumets le site à Google, je surveille 30 jours |

---

## Deux choses à faire de votre côté, indépendamment du site

Ce ne sont pas des tâches de développement, mais elles comptent autant que le
site lui-même pour être trouvé.

**1. Corriger les annuaires.** PagesJaunes, Mappy et les annuaires
d'experts-comptables diffusent encore vos anciennes adresses (Noisy-le-Sec,
Paris 16e, Provins, Saint-Mandé) et deux numéros de téléphone qui ne sont plus
les vôtres. Google recoupe ces sources : tant qu'elles se contredisent, votre
référencement local en souffre. C'est fastidieux, mais c'est efficace.

**2. Revendiquer votre fiche Google Business Profile** pour le 90 rue Chaptal,
avec vos horaires (lundi–vendredi, 8h30–19h30), votre numéro et la catégorie
« Expert-comptable ». Pour un cabinet qui cherche des clients dans son secteur,
c'est souvent plus déterminant que le site lui-même.

---

## Récapitulatif

**Pour voir le site en ligne, en privé :** points 2 et 3.
**Pour que le formulaire fonctionne :** point 1.
**Pour la mise en ligne publique :** points 4, 5 et 6.

**Le plus urgent est le point 3** — retrouver qui détient le domaine et
l'hébergement actuels. C'est celui qui prend le plus de temps, et il ne dépend
pas de moi.

Si un point n'est pas clair, dites-le : je le reformule ou je vous
accompagne pas à pas.
