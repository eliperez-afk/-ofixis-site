# OFIXIS — Statut du projet

**Dernière mise à jour :** 10 septembre 2026 (identité légale confirmée)
**Phase en cours :** développement du site — **socle livré et fonctionnel**
**Prochaine étape :** validation des contenus par le cabinet, puis préproduction hébergée

---

## Avancement

| Phase | Objet | Statut |
|---|---|---|
| 0 | Découverte, audit, questions | ✅ Terminée |
| 1 | Stratégie, arborescence, contenu | ✅ Arborescence livrée · textes au statut brouillon |
| 2 | Direction visuelle et expérience | ✅ Livrée — à valider par le cabinet |
| 3 | Socle technique | ✅ Livré |
| 4 | Conversions et intégrations | 🟡 Formulaire et téléphone opérationnels · Bookings et espace client en attente d'URL |
| 5 | SEO technique, local et éditorial | ✅ Technique livré · 🟡 éditorial en attente de validation |
| 6 | Conformité, sécurité, qualité | 🟡 Livré · CSP et validation juridique en attente |
| 7 | Migration, préproduction, lancement | ⛔ Non démarrée — bloquée par les validations |

---

## Ce qui fonctionne aujourd'hui

Site complet de **14 pages**, 25 routes générées, compilé et testé :

- accueil, cabinet, missions (vue d'ensemble + **8 pages de mission**),
  actualités, contact, prise de rendez-vous, mentions légales, politique de
  confidentialité, accessibilité, page 404 ;
- **formulaire de contact opérationnel** : validation serveur, protection
  anti-robots sans captcha ni traceur, notification interne et accusé de
  réception, message d'erreur explicite si l'envoi échoue ;
- **barre d'actions mobile** : Appeler · Rendez-vous · Message ;
- **rubrique Actualités** avec filtres, sommaire automatique, sources, flux RSS
  et guide de publication non technique ;
- **SEO technique** : titres et descriptions uniques, canoniques, sitemap et
  robots dynamiques, JSON-LD, fil d'Ariane, redirections depuis l'ancien site ;
- **41 tests automatisés** au vert sur profils ordinateur et mobile ;
- **aucun cookie, aucun script tiers, aucune police distante** — donc aucun
  bandeau de consentement nécessaire.

## Décisions du dirigeant, 9 septembre 2026

| # | Décision | Mise en œuvre |
|---|---|---|
| D1 | **Un seul bureau** : 90 rue Chaptal, 92300 Levallois-Perret | Seule adresse du site. Paris 16e, Noisy-le-Sec, Provins et Saint-Mandé retirés |
| D2 | **Un seul numéro** : 06 50 28 12 86 (mobile, provisoire) | Numéro unique partout. Une ligne fixe le remplacera |
| D3 | **Suppression des logos clients** | Aucun nom ni logo de client sur le site |
| D4 | Les informations de l'ancien site sont erronées | Aucun contenu repris sans réécriture ; chiffres clés retirés |

Ces quatre décisions sont **verrouillées par des tests automatisés** : toute
réapparition d'une ancienne adresse, de l'ancien numéro ou d'un nom de client
fait échouer la suite de tests.

## Décisions techniques prises en autonomie

| # | Décision | Motif |
|---|---|---|
| 1 | Next.js 16 (App Router), React 19, TypeScript strict, Tailwind 4 | Dépôt vide, aucune contrainte héritée ; rendu serveur natif indispensable au SEO |
| 2 | TypeScript 6 plutôt que 7 | L'analyse statique ne supporte pas encore TS 7 ; TS 6 est la dernière version pleinement outillée |
| 3 | **Articles en fichiers Markdown versionnés, pas de CMS en V1** | Livre un site complet sans attendre l'arbitrage CMS ni engager d'abonnement. Les champs correspondent au futur schéma : la bascule ne réécrira ni les articles ni les pages |
| 4 | Source unique de vérité (`src/config/cabinet.ts`) | Réponse directe aux incohérences de l'ancien site |
| 5 | Barrière `npm run check:contenu -- --prod` | Refuse mécaniquement le déploiement tant qu'une donnée n'est pas validée |
| 6 | Bookings en lien plutôt qu'en iframe | L'iframe dépose des cookies tiers, alourdit la page et n'est pas corrigeable côté accessibilité. Révisable après essai réel |
| 7 | Aucun captcha tiers | Champ leurre + délai minimal + limitation de débit suffisent à ce volume, sans traceur |
| 8 | Aucune police distante | Zéro requête réseau, aucun décalage au chargement, aucun cookie |
| 9 | Pas de balisage `FAQPage` | Google réserve ce résultat enrichi aux sites gouvernementaux et de santé depuis 2023 |
| 10 | Ardoise 500 assombrie en `#546a77` | Le calcul de contraste donnait 4,28:1 sur fond ombré, sous le seuil AA |

## Ce qui n'est pas publié, et pourquoi

Le site est construit pour qu'une donnée non validée **ne puisse pas** être
affichée par inadvertance :

| Élément | État | Condition de publication |
|---|---|---|
| Page **Équipe** | Route inexistante (404) | Consentement écrit de chaque personne |
| **Chiffres clés** | Aucun affiché | Chiffre daté et périmétré |
| **Logos clients** | Aucun | Décision : ne pas en publier |
| **Numéros OEC et CNCC** | ✅ Publiés (mentions légales et pied de page) | — |
| **Mentions légales** | ✅ Complètes, sauf l'assurance RCP | Attestation de l'exercice en cours |
| **Horaires d'ouverture** | Non affichés | Communication par le cabinet |
| **Espace client** | Bouton absent partout | URL réelle du portail |
| **Prise de rendez-vous en ligne** | Renvoi vers téléphone et formulaire | URL de la page Bookings |
| **Articles** | Rubrique vide, message assumé | Rédaction, relecture, passage au statut publié |
| **Textes des missions** | Publiés, marqués « brouillon » en recette | Validation du périmètre par le cabinet |

## Blocages

| # | Blocage | Gravité | Levée |
|---|---|---|---|
| B1 | **Mentions légales complètes sauf l'assurance RCP** — attestation de l'exercice en cours demandée au courtier, en attente de réception | 🟠 Moyenne | Réception de l'attestation — dernier point bloquant des mentions légales |
| B2 | **Envoi d'e-mails non configuré** — le formulaire ne peut pas aboutir | 🔴 Élevée | Clé du service d'envoi + adresse destinataire (question E3) |
| B3 | **`www.ofixis.fr` inaccessible** — matrice de redirections incomplète | 🟠 Moyenne | Question A1 : Search Console, sitemap ou ouverture réseau |
| B4 | Périmètre réel des missions non confirmé | 🟠 Moyenne | Question G1 — 8 pages au statut brouillon |
| B5 | URL de l'espace client inconnue | 🟠 Moyenne | Question E5 |
| B6 | Page Bookings inexistante | 🟠 Moyenne | Questions F1 à F3 |
| B7 | Équipe et consentements | 🟠 Moyenne | Question J3 |
| B8 | Politique de confidentialité non validée juridiquement | 🟠 Moyenne | Relecture juridique |
| B9 | CSP non finalisée | 🟡 Faible | Dépend des services tiers retenus |
| B10 | Logo vectoriel et photographies | 🟡 Faible | Questions K1 à K3 |
| B11 | Annuaires tiers diffusant les anciennes adresses | 🟡 Faible | À faire corriger par le cabinet |

## Prochaine action

**Côté cabinet**
1. Relire les 8 pages de mission et confirmer le périmètre de chacune.
2. Transmettre l'**attestation RCP de l'exercice en cours** (demandée à Verspieren).
3. Indiquer l'adresse e-mail destinataire des demandes.
4. Indiquer l'URL de l'espace client et, si elle existe, la page Bookings.
5. Confirmer l'adresse d'exercice des droits RGPD et la durée de conservation
   des demandes (3 ans proposés par défaut).

**Côté équipe projet, à réception**
1. Renseigner et valider les données dans la configuration.
2. Configurer le service d'envoi et tester le formulaire de bout en bout.
3. Déployer une préproduction protégée et mesurer les performances réelles.
4. Compléter la matrice de redirections à partir de la Search Console.

---

## Journal

| Date | Événement |
|---|---|
| 2026-09-09 | Dépôt inspecté : vide, aucune contrainte technique héritée |
| 2026-09-09 | Accès direct à `www.ofixis.fr` refusé — audit réorienté vers les sources indirectes |
| 2026-09-09 | Incohérence siège / RCS détectée ; CEGECO identifiée comme entité distincte |
| 2026-09-09 | Livrables de Phase 0 rédigés |
| 2026-09-09 | **Décisions du dirigeant** : bureau unique à Levallois-Perret, numéro unique, suppression des logos clients |
| 2026-09-10 | Socle technique installé : Next.js 16, React 19, TypeScript 6 strict, Tailwind 4 |
| 2026-09-10 | Direction visuelle définie ; contraste « ardoise 500 » corrigé après calcul |
| 2026-09-10 | 14 pages livrées, formulaire opérationnel, SEO technique en place |
| 2026-09-10 | 41 tests automatisés au vert ; barrière de mise en production opérationnelle |
| 2026-09-10 | **Identité légale confirmée par le dirigeant** : SARL au capital de 1 000 €, RCS Nanterre 841 080 971, siège 90 rue Chaptal à Levallois-Perret, contact@ofixis.fr. L'incohérence « RCS Bobigny » de l'ancien site est levée |
| 2026-09-10 | Appel de prime RCP 2020 reçu (Verspieren / MMA IARD, police 118269730) — **non publiable** : pièce vieille de six ans, attestation en cours de validité requise |
| 2026-09-10 | Éléments en attente de validation ramenés de 18 à 13 |
| 2026-09-10 | **Mentions légales complétées** : TVA FR 64 841 080 971 (clé vérifiée), directeur de la publication, n° OEC 140000548701 et CNCC 4100090432, hébergeur Vercel validé |
| 2026-09-10 | Traitement du formulaire fixé en région Paris (`cdg1`) : les données saisies ne quittent pas l'Union européenne |
| 2026-09-10 | Éléments en attente ramenés de 13 à 8 — seule l'assurance RCP bloque encore les mentions légales |
