# OFIXIS — Cadrage technique et architecture proposée

**Date :** 9 septembre 2026
**Statut :** proposition soumise au **point de validation 1** — rien n'est développé à ce stade.

---

## 1. Socle technique proposé

Le dépôt étant vide, aucune contrainte technique n'est héritée. Versions stables
relevées ce jour (elles seront **verrouillées au lockfile** au moment de
l'installation, jamais figées à l'avance dans un document) :

| Brique | Choix | Version stable au 09/09/2026 | Pourquoi |
|---|---|---|---|
| Framework | **Next.js** (App Router) | 16.3.4 | Rendu serveur et génération statique natifs — indispensables pour le SEO ; écosystème mature ; hébergement simple |
| UI | **React** | 19.3.0 | Imposé par Next.js |
| Langage | **TypeScript strict** | 7.0.2 | Détecte à la compilation les erreurs qui, sinon, se voient en production |
| Styles | **Tailwind CSS** avec tokens de design | 4.3.3 | Cohérence visuelle imposée par construction ; CSS final réduit au strict nécessaire |
| Hébergement | **Vercel** (à valider) | — | Intégration native Next.js, préproduction protégée automatique, retour arrière en un clic |
| E-mails transactionnels | **Resend** ou SMTP du cabinet | — | Notification interne + accusé de réception |
| Mesure d'audience | **Plausible** (hébergement UE, sans cookie) | — | Pas de bandeau de consentement nécessaire, page plus légère, mesure complète |

**Principes appliqués**

- Toutes les pages référençables sont **générées statiquement ou rendues côté
  serveur**. Aucune page importante ne dépend de JavaScript pour être lue.
- **Le moins de JavaScript client possible.** Les composants interactifs
  (menu mobile, filtres d'actualités, formulaire) sont isolés ; le reste est du
  HTML servi tel quel.
- **Source unique de vérité** pour les informations du cabinet
  (`src/config/cabinet.ts`) : adresses, téléphones, horaires, numéros
  d'inscription. C'est la réponse directe au problème d'incohérence relevé dans
  l'audit — une adresse corrigée à un endroit l'est partout, y compris dans les
  données structurées JSON-LD.
- **Aucun secret dans Git.** Variables documentées dans `.env.example`.
- Dépendances limitées au nécessaire ; chaque ajout doit se justifier.

---

## 2. CMS — recommandation et alternatives

**Besoin réel** : publier des actualités fiscales, sociales, comptables et
juridiques, avec brouillon, relecture, prévisualisation, auteur et relecteur
identifiés. Un ou deux rédacteurs non techniques. Quelques articles par mois.

Ce besoin est modeste : **un CMS surdimensionné serait une erreur** — coût
récurrent, complexité de maintenance, et interface décourageante pour des
utilisateurs occasionnels.

### Recommandation : Payload CMS 3 (auto-hébergé dans l'application)

| Critère | Évaluation |
|---|---|
| Coût | **0 € de licence.** Base de données PostgreSQL managée : 0 à ~20 €/mois |
| Localisation des données | **Union européenne**, au choix — argument déontologique et RGPD |
| Interface d'administration | En français, dans le navigateur, sans compte technique |
| Brouillons / versions / prévisualisation | Natifs |
| Sauvegarde | Export base + fichiers, scriptable |
| Réversibilité | **Totale** — données dans votre propre base, exportables |
| Maintenance | À notre charge : mises à jour du CMS et de la base |
| Sécurité | Authentification native, à durcir (mots de passe forts, 2FA) |
| Risque | Une brique de plus à maintenir dans la durée |

### Alternative 1 : Sanity (SaaS)

Interface éditoriale excellente, aucune infrastructure à maintenir, offre
gratuite suffisante pour ce volume (au-delà, ~15 $/utilisateur/mois).
**Contrepartie :** les contenus sont hébergés par un tiers américain (région UE
disponible sur les offres payantes) et la réversibilité passe par un export.

### Alternative 2 : Keystatic (contenus dans Git)

Coût nul, aucune base de données, aucune surface d'attaque supplémentaire, tout
l'historique éditorial dans Git. **Contrepartie :** chaque rédacteur a besoin
d'un compte GitHub — rédhibitoire si les rédacteurs ne sont pas à l'aise
techniquement.

### Synthèse

| | Payload | Sanity | Keystatic |
|---|---|---|---|
| Coût récurrent | Faible | Nul puis par utilisateur | **Nul** |
| Données en UE | **Oui** | Selon l'offre | **Oui (Git)** |
| Confort non technique | Bon | **Excellent** | Moyen |
| Charge de maintenance | Moyenne | **Faible** | **Faible** |
| Réversibilité | **Totale** | Par export | **Totale** |

**Notre recommandation : Payload**, pour la maîtrise des données et l'absence de
coût par utilisateur. **Si la priorité est de ne rien avoir à maintenir : Sanity.**
Décision attendue au point de validation 1 (question L1).

---

## 3. Arborescence proposée

Structure **soumise aux réponses des questions G, H et D** : une page ne sera
créée que si la mission ou l'implantation correspondante est confirmée.
Aucune page ne sera créée « pour le SEO » sans contenu réel derrière.

```
/                                   Accueil
/cabinet                            Histoire, méthode, engagements, outils
/equipe                             Personnes et fonctions exactes
/missions                           Vue d'ensemble
  /missions/expertise-comptable
  /missions/fiscalite
  /missions/paie-rh
  /missions/juridique               (périmètre à confirmer — G2)
  /missions/pilotage-conseil
  /missions/creation-reprise
  /missions/transmission-evaluation
  /missions/audit-commissariat-aux-comptes
  /missions/international           (seulement si G4 confirmé)
  /missions/gestion-patrimoine      (seulement si habilitations confirmées — G3)
/secteurs                           (seulement si expériences démontrables — H2/H3)
  /secteurs/professions-de-sante    (candidat prioritaire — voir § 4)
/implantations                      (une page par bureau réel confirmé — D1)
/actualites                         Filtres par thème
/actualites/[slug]
/prendre-rendez-vous
/contact
/faq                                (si les réponses sont substantielles)
/mentions-legales
/politique-confidentialite
/cookies                            (seulement si un traceur le rend nécessaire)
/accessibilite
→ Espace client                     Lien externe sécurisé (URL à confirmer — E5)
```

**Écarts assumés par rapport à la trame initiale**

- `/secteurs/professions-de-sante` est proposé en **priorité** : c'est
  aujourd'hui l'axe sur lequel le site existant est identifié par les moteurs.
  L'abandonner sans transition coûterait du référencement acquis (question H2).
- `/cookies` ne sera créée que si un traceur soumis à consentement est
  effectivement installé. Sinon, l'information figure dans la politique de
  confidentialité — une page « cookies » sans cookie est un contresens.
- Pas de pages de villes sans présence réelle.

---

## 4. Conversion — dispositif prévu

**Trois actions visibles dès le premier écran**, sur mobile comme sur ordinateur :
**Prendre rendez-vous**, **Appeler le cabinet**, **Espace client** — clairement
distinctes l'une de l'autre.

- **Barre d'actions mobile** fixe et discrète : Appeler · Rendez-vous · Message.
  Respect des zones sûres iOS, sans masquer le contenu.
- **Téléphone** : liens `tel:` avec libellé accessible.
- **Formulaire unique et court** : nom, entreprise, e-mail, téléphone,
  objet, message, canal de rappel préféré. Validation serveur par schéma,
  normalisation, limitation de débit, honeypot, journalisation minimale.
  **Pas de captcha tiers en V1** : le honeypot et la limitation de débit
  suffisent à ce volume, sans dépendance externe ni traceur.
- **Message explicite** invitant à ne transmettre aucune donnée confidentielle
  ni document comptable, avec renvoi vers l'espace client sécurisé.
  **Aucune pièce jointe** dans la V1.
- **Jamais de faux message de succès** : si l'envoi échoue, l'utilisateur le sait
  et reçoit une voie de contact de repli.
- **Rendez-vous** : intégration Microsoft Bookings. Si l'embed dégrade
  l'accessibilité, la performance ou impose des cookies, repli assumé sur un
  bouton vers Bookings dans un nouvel onglet, avec explication claire.
- **Espace client** : lien vers l'URL confirmée uniquement, en
  `rel="noopener noreferrer"`. **Aucune authentification locale simulée.**

---

## 5. Sécurité et conformité — dispositions prévues

- HTTPS exclusif ; redirection `http → https` ; canonicalisation `www` ou apex
  (à trancher, cohérente avec l'existant pour préserver l'acquis).
- En-têtes : CSP, `X-Content-Type-Options`, `Referrer-Policy`,
  `Permissions-Policy`, puis HSTS **après** validation du domaine.
- Validation serveur systématique ; assainissement des contenus issus du CMS.
- Aucune donnée sensible dans les journaux.
- Bandeau de consentement **uniquement** si un traceur non essentiel est installé ;
  dans ce cas, refus aussi simple que l'acceptation, et retrait possible à tout moment.

---

## 6. Objectifs de qualité

| Indicateur | Cible |
|---|---|
| Lighthouse (performance, accessibilité, bonnes pratiques, SEO) | ≥ 90 sur mobile et ordinateur |
| LCP | ≤ 2,5 s (75e centile) |
| INP | ≤ 200 ms (75e centile) |
| CLS | ≤ 0,1 (75e centile) |
| Accessibilité | WCAG 2.2 niveau AA |
| Erreurs console | Aucune |
| Liens cassés | Aucun |
| Images sans alternative textuelle appropriée | Aucune |

Tests prévus : lint, vérification de types, build, tests unitaires des fonctions
critiques (validation de formulaire, génération des données structurées,
résolution des redirections), tests d'intégration formulaire et CMS, tests
end-to-end des parcours appel, contact, rendez-vous, espace client et navigation
mobile.
