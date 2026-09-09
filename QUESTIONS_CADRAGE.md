# OFIXIS — Questions de cadrage

**Date :** 9 septembre 2026
**À l'attention de :** direction du cabinet OFIXIS
**Objet :** informations nécessaires avant le démarrage du développement

Ces questions sont posées **en une seule fois**, conformément à la méthode de
travail convenue. Les réponses alimenteront `CONTENT_INVENTORY.md` et feront
passer chaque donnée au statut « confirmée ».

Trois niveaux :

- 🔴 **BLOQUANT** — le développement ne peut pas démarrer sans la réponse
- 🟠 **BLOQUANT PARTIEL** — bloque une page ou une fonctionnalité précise
- 🟡 **STRUCTURANT** — n'empêche pas de démarrer, mais oriente des arbitrages

Une réponse « je ne sais pas » ou « à vérifier » est une réponse utile : elle
est enregistrée comme telle et la donnée reste non publiable.

---

## A. Accès — préalable technique

**A1.** 🔴 L'environnement de travail ne peut actuellement **pas atteindre
`www.ofixis.fr`** (blocage du proxy réseau sortant). L'audit du site existant
est donc incomplet et la matrice de redirections partielle. Pouvez-vous fournir
**l'un** des éléments suivants ?

- un accès en lecture à la Google Search Console (export des pages sur 16 mois) ;
- le fichier `sitemap.xml` (ou `sitemap_index.xml`) du site actuel ;
- un accès en lecture au back-office WordPress ;
- ou l'autorisation d'accès réseau à `www.ofixis.fr` depuis cet environnement.

Sans cela, **des URLs recevant du trafic seront perdues à la migration**, sans
qu'il soit possible de savoir lesquelles.

**A2.** 🔴 Le domaine `www.officexis.fr` mentionné dans la commande initiale
semble être une erreur de saisie pour `www.ofixis.fr`. **Confirmez-vous que le
site à remplacer est bien `https://www.ofixis.fr/` et que le domaine reste
inchangé ?** Aucun changement de domaine ne sera engagé sans décision explicite.

---

## B. Identité légale — corrections urgentes

**B1.** 🔴 Les mentions légales du site indiquent un siège au **2 rue de l'Union,
93130 Noisy-le-Sec** et un **RCS Bobigny**. Les registres publics et l'annuaire
de l'Ordre rattachent OFIXIS à **Levallois-Perret (92300)**, adresse relevée
**90 rue Chaptal**. Quelle est l'adresse **actuelle du siège social**, et quelle
est la **ville du RCS** correspondante ?

> Si le siège a été transféré, les mentions légales publiées aujourd'hui sont
> inexactes. C'est un point à corriger indépendamment du projet de refonte.

**B2.** 🔴 Merci de confirmer : **raison sociale exacte**, **forme juridique**,
**capital social actuel**, **SIREN**, **numéro de TVA intracommunautaire**.

**B3.** 🔴 **Directeur de la publication** : nom, prénom et fonction exacte,
tels qu'ils doivent être publiés.

**B4.** 🔴 **Hébergeur du nouveau site** : si vous n'avez pas de préférence,
nous recommandons Vercel (voir `CADRAGE_TECHNIQUE.md`) et fournirons la mention
légale correspondante. Confirmez-vous, ou imposez-vous un hébergeur ?

**B5.** 🟠 Numéros d'inscription à publier : **OEC IDF `140000548701`** et
**CNCC `4100090432`**. Sont-ils exacts et à jour ? Sous quel libellé exact
doivent-ils apparaître ?

**B6.** 🟠 **Assurance responsabilité civile professionnelle** : assureur, numéro
de police, couverture géographique — à publier ou non selon votre choix.

**B7.** 🟡 Dispositif de **médiation de la consommation** applicable, le cas échéant.

---

## C. Structure et relation avec CEGECO

**C1.** 🔴 Le site présente « **OFIXIS–Cegeco Paris Sud** ». Or CEGECO est une
**personne morale distincte** (SAS, SIREN 313 700 353, créée en 1978). Quelle est
la **nature juridique exacte du lien** entre les deux entités : rapprochement
capitalistique, fusion en cours, groupement, partenariat commercial, mise à
disposition de locaux, autre ?

**C2.** 🔴 Selon la réponse : **quelle formulation exacte** êtes-vous autorisé à
publier, et **CEGECO a-t-il donné son accord écrit** à l'emploi de son nom sur
le site d'OFIXIS ?

> Tant que ce point n'est pas tranché, la mention « Paris Sud » **ne sera pas
> publiée**. Présenter l'établissement d'une autre entité comme un bureau
> d'OFIXIS engage le cabinet sur la véracité de l'information (art. 152 du Code
> de déontologie) et vis-à-vis d'un prospect qui croirait contracter avec OFIXIS.

---

## D. Implantations

**D1.** 🔴 **Six adresses** circulent aujourd'hui, dont trois seulement figurent
sur le site. Merci d'indiquer, pour chacune, si c'est un **bureau réel ouvert au
public**, une **adresse administrative**, ou une **donnée erronée à faire corriger** :

| Adresse | Statut réel ? |
|---|---|
| 7 rue Bosio, 75016 Paris | |
| 2 rue de l'Union, 93130 Noisy-le-Sec | |
| 11 rue de Courloison, 77160 Provins | |
| 6 avenue Alain Peyrefitte, 77160 Provins | |
| 90 rue Chaptal, 92300 Levallois-Perret | |
| 5 avenue du Général de Gaulle, 94160 Saint-Mandé | |

**D2.** 🔴 Pour Provins : **11 rue de Courloison** ou **6 avenue Alain
Peyrefitte** ? Le site affiche actuellement les deux.

**D3.** 🟠 Pour chaque bureau retenu : **horaires d'ouverture**, **accès et
transports**, **stationnement**, **équipe présente sur place**, **zone
d'intervention**.

**D4.** 🟠 Existe-t-il une **fiche Google Business Profile par bureau** ? Si oui,
qui en a l'administration ? (Déterminant pour le référencement local.)

---

## E. Contact et conversion

**E1.** 🔴 **Quel numéro de téléphone afficher ?** Trois numéros circulent :
`01 89 41 04 76` (site), `01 85 05 26 94` et `06 50 28 12 86` (annuaires).
Un numéro unique pour tous les bureaux, ou un numéro par bureau ?

**E2.** 🔴 **Adresse e-mail publique** à afficher (`contact@ofixis.fr` ?).

**E3.** 🔴 **Qui reçoit les demandes du formulaire ?** Une ou plusieurs adresses
internes, éventuellement différenciées selon l'objet de la demande.

**E4.** 🔴 **Quel délai de rappel êtes-vous certain de tenir ?** Il sera affiché
et doit être tenable en pratique — un engagement non tenu se retourne contre
le cabinet. Si aucun délai n'est garanti, nous n'en afficherons aucun.

**E5.** 🔴 **URL exacte de l'espace client.** Le lien « Connection » du site
actuel semble pointer vers Microsoft. Quelle est l'adresse réelle du portail,
et doit-il s'ouvrir dans un nouvel onglet ?

---

## F. Prise de rendez-vous

**F1.** 🔴 Disposez-vous d'une **licence Microsoft 365 incluant Bookings** ?

**F2.** 🔴 Une **page Bookings existe-t-elle déjà** ? Si oui, quelle est son URL ?

**F3.** 🟠 **Types de rendez-vous** à proposer, et pour chacun : durée,
modalité (présentiel / téléphone / visioconférence Teams), personne(s)
affectée(s), plages horaires, délai minimal de réservation.

**F4.** 🟠 Un **premier rendez-vous est-il gratuit et sans engagement** ? Si oui,
nous pourrons le dire explicitement — c'est un levier de conversion important.

---

## G. Missions

**G1.** 🔴 **Liste exhaustive des missions réellement proposées aujourd'hui.**
Merci de confirmer, retirer ou compléter : expertise comptable ; audit légal et
contractuel / CAC ; social-paie-RH ; juridique ; fiscalité ; gestion de
patrimoine ; création-reprise ; cession-transmission ; projets internationaux.

**G2.** 🔴 **Missions juridiques** : quel périmètre exact ? (Rappel : le conseil
juridique de l'expert-comptable est accessoire à la mission comptable ;
la page doit refléter cette limite sans ambiguïté.)

**G3.** 🔴 **Gestion de patrimoine** : quelles **habilitations** le cabinet
détient-il (CIF, ORIAS, courtage, carte T) ? Sans habilitation vérifiée, cette
page ne sera pas publiée.

**G4.** 🟠 **Projets internationaux** : quelle offre réelle, quelles compétences,
quels pays ? Sans réponse, la page ne sera pas créée.

**G5.** 🟡 Y a-t-il des missions **que vous ne souhaitez plus** mettre en avant ?

---

## H. Clientèles et secteurs

**H1.** 🔴 **Clientèles prioritaires, classées par ordre d'importance commerciale.**

**H2.** 🔴 Le site actuel affiche un positionnement fort sur les **professions
médicales et paramédicales** (médecins, dentistes, kinés, ostéopathes, infirmiers,
opticiens, audioprothésistes…). **Est-ce toujours un axe prioritaire ?**
Ce point change la hiérarchie du site : c'est actuellement ce que Google associe
le mieux à OFIXIS, et l'abandonner sans transition coûterait du référencement.

**H3.** 🟠 Dans quels **autres secteurs** pouvez-vous démontrer une expérience
réelle (nombre de dossiers, ancienneté, compétences internes) ?

> Rappel : nous n'écrirons pas « spécialiste » ni « spécialité » pour une
> compétence sectorielle non officiellement reconnue. Formulations retenues :
> « expérience », « compétences », « accompagnement dédié ».

---

## I. Preuves, chiffres et références

**I1.** 🔴 « **30 collaborateurs** » et « **+700 clients** » : ces chiffres
sont-ils exacts, **à quelle date**, et sur **quel périmètre** (OFIXIS seul ?
OFIXIS + CEGECO ?) ? Ils seront publiés datés et périmétrés, ou pas publiés.

**I2.** 🔴 **Logos et références clients** : disposez-vous, **pour chaque client
concerné**, d'une autorisation **écrite, nominative et datée** ? Des annuaires
tiers associent publiquement à OFIXIS les noms Allianz, Axa, Krys et Orangetheory
Fitness — nous ne les reprendrons pas sans preuve d'autorisation.

> Au-delà du droit des marques, le **secret professionnel** interdit de révéler
> l'identité d'un client sans son accord. **Recommandation : pas de logos clients
> en V1**, remplacés par des preuves non nominatives (secteurs, types de missions,
> ancienneté des relations).

**I3.** 🟠 **Témoignages ou avis** publiables, avec autorisation écrite ?

**I4.** 🟡 **Certifications, labels, partenariats** que vous êtes autorisé à afficher ?

---

## J. Présentation du cabinet et équipe

**J1.** 🟠 **Histoire du cabinet** : année de création, étapes marquantes,
origine du projet.

**J2.** 🟠 **Valeurs et méthode de travail** — en termes concrets et vérifiables :
comment se déroule une mission, à quelle fréquence le client est-il vu, qui est
son interlocuteur, que reçoit-il et quand.

**J3.** 🔴 **Équipe** — pour chaque personne à présenter : nom, prénom, fonction
exacte, statut (expert-comptable inscrit / commissaire aux comptes / ni l'un ni
l'autre), biographie courte, portrait photo, et **consentement écrit de publication**.

**J4.** 🟠 Le compte auteur WordPress `eli-amram` publie les articles actuels.
À qui correspond-il réellement ?

**J5.** 🟠 **Outils** : lesquels pouvez-vous **nommer publiquement** (marque de
l'éditeur), et lesquels faut-il décrire par leur fonction sans citer de nom ?

---

## K. Marque et ressources

**K1.** 🟠 Disposez-vous du **logo vectoriel** (SVG, AI ou EPS) ?

**K2.** 🟠 Existe-t-il une **charte graphique** (couleurs, typographies) ?
À défaut, nous proposerons une direction visuelle à valider.

**K3.** 🟠 Disposez-vous de **photographies originales** des bureaux et de l'équipe,
et des **droits** correspondants ?

> Aucun portrait généré par IA ni collaborateur fictif ne sera publié.
> À défaut de photos, des emplacements neutres et soignés seront prévus.

---

## L. Exploitation et administration

**L1.** 🟠 **Qui publiera les actualités**, et avec quel niveau d'autonomie
attendu ? (Voir la comparaison des solutions dans `CADRAGE_TECHNIQUE.md`.)

**L2.** 🟠 **Qui relit et valide** un contenu fiscal ou social avant publication ?
Cette personne sera nommée sur chaque article, conformément à la règle n° 6.

**L3.** 🟠 **Accès actuels** : hébergement, registrar, DNS, Search Console,
outil de mesure d'audience, Google Business Profile, prestataire éventuel.

**L4.** 🟡 **Langues** : le site doit-il être multilingue aujourd'hui ou à terme ?

**L5.** 🟡 **Budget** et services tiers payants acceptables (CMS, hébergement,
envoi d'e-mails, mesure d'audience).

---

## M. Données personnelles

**M1.** 🟠 **Responsable de traitement** : quelle entité exactement ?

**M2.** 🟠 **Adresse d'exercice des droits** (postale et e-mail).

**M3.** 🟠 Un **DPO** est-il désigné ?

**M4.** 🟠 **Durée de conservation** des demandes de prospects
(recommandation par défaut : 3 ans à compter du dernier contact).

**M5.** 🟠 **Sous-traitants** déjà en place traitant des données du site
(hébergeur, messagerie, CRM, outil de mesure).

**M6.** 🟡 Existe-t-il un **registre des traitements** à compléter ?

---

## N. Mesure d'audience — arbitrage recommandé

**N1.** 🟡 Souhaitez-vous **Google Analytics** (dépôt de traceurs → bandeau de
consentement obligatoire, et perte des données des visiteurs qui refusent),
ou une **mesure sans cookie exemptée de consentement** (Plausible, Matomo en
configuration exemptée) ?

> **Recommandation : mesure sans cookie.** Elle évite le bandeau, mesure 100 %
> des visites, allège la page et simplifie la conformité. Pour un site dont
> l'objectif est le nombre de demandes qualifiées, les fonctions avancées de
> Google Analytics n'apportent pas grand-chose. Nous n'installerons de bandeau
> de consentement que si un traceur le rend réellement nécessaire.

---

## Réponses prioritaires

Si le temps manque, **six réponses débloquent l'essentiel du travail** :
**A1** (accès aux URLs), **B1** (siège et RCS), **C1** (lien avec CEGECO),
**D1** (adresses réelles), **E1** (téléphone), **G1** (missions réelles).

Les autres réponses peuvent suivre : elles conditionnent des pages précises,
pas le démarrage.
