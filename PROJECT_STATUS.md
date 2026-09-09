# OFIXIS — Statut du projet

**Dernière mise à jour :** 9 septembre 2026
**Phase en cours :** Phase 0 — découverte, audit et questions — **terminée**
**Prochaine étape :** **point de validation 1** — en attente des réponses du cabinet

---

## Avancement

| Phase | Objet | Statut |
|---|---|---|
| 0 | Découverte, audit, questions | ✅ Terminée |
| — | **Point de validation 1** | ⏸ **En attente du cabinet** |
| 1 | Stratégie, arborescence, contenu | ⛔ Non démarrée |
| — | Point de validation 2 | — |
| 2 | Direction visuelle et expérience | ⛔ Non démarrée |
| 3 | Socle technique | ⛔ Non démarrée |
| 4 | Conversions et intégrations | ⛔ Non démarrée |
| 5 | SEO technique, local et éditorial | 🟡 Plan provisoire rédigé |
| 6 | Conformité, sécurité, qualité | ⛔ Non démarrée |
| 7 | Migration, préproduction, lancement | ⛔ Non démarrée |

**Aucune ligne de code n'a été écrite**, conformément à la consigne : l'audit et
les questions bloquantes précèdent le développement.

---

## Documents produits

| Fichier | Contenu |
|---|---|
| `AUDIT_PHASE0.md` | Audit de l'existant, incohérences, risques, opportunités |
| `CONTENT_INVENTORY.md` | Chaque donnée, sa source, sa date, son statut |
| `QUESTIONS_CADRAGE.md` | Questions de cadrage, hiérarchisées par criticité |
| `CADRAGE_TECHNIQUE.md` | Socle technique, comparaison des CMS, arborescence proposée |
| `SEO_PLAN.md` | Plan SEO provisoire, calendrier éditorial 3 mois |
| `REDIRECT_MAP.csv` | Matrice de redirections — **partielle** |
| `REDIRECT_MAP_NOTES.md` | Méthode de complétion de la matrice |
| `LAUNCH_CHECKLIST.md` | Check-list de lancement et actions manuelles du cabinet |

---

## Décisions prises (réversibles, prises en autonomie)

| # | Décision | Motif |
|---|---|---|
| 1 | Next.js (App Router) + TypeScript strict + Tailwind CSS | Dépôt vide, aucune contrainte héritée ; rendu serveur natif indispensable au SEO |
| 2 | Versions verrouillées au lockfile au moment de l'installation | Ne pas figer une version qui serait obsolète le jour du développement |
| 3 | Source unique de vérité pour les informations du cabinet | Réponse directe au problème d'incohérence relevé dans l'audit |
| 4 | Pas de captcha tiers en V1 (honeypot + limitation de débit) | Suffisant à ce volume, sans dépendance externe ni traceur |
| 5 | Recommandation : mesure d'audience sans cookie | Évite le bandeau de consentement, mesure complète, page plus légère |
| 6 | Page `/cookies` créée seulement si un traceur la rend nécessaire | Une page « cookies » sans cookie est un contresens |
| 7 | `/secteurs/professions-de-sante` proposé en priorité | C'est l'axe sur lequel les moteurs identifient aujourd'hui le site |
| 8 | Recommandation CMS : Payload, alternative Sanity | Données en UE, pas de coût par utilisateur — arbitrage laissé au cabinet |
| 9 | Aucun contenu public rédigé à ce stade | Toutes les données factuelles sont non validées |

---

## Blocages

| # | Blocage | Gravité | Levée |
|---|---|---|---|
| B1 | **`www.ofixis.fr` inaccessible depuis l'environnement** (proxy réseau) — audit technique et matrice de redirections incomplets | 🔴 Élevée | Question A1 : accès Search Console, sitemap, back-office, ou ouverture réseau |
| B2 | **Mentions légales probablement périmées** (siège Noisy-le-Sec / RCS Bobigny vs Levallois-Perret dans les registres) | 🔴 Élevée | Question B1 |
| B3 | **Relation OFIXIS ↔ CEGECO non qualifiée** — entités juridiques distinctes | 🔴 Élevée | Questions C1, C2 |
| B4 | **Six adresses en circulation**, trois affichées, aucune consolidée | 🔴 Élevée | Question D1 |
| B5 | **Trois numéros de téléphone** en circulation | 🔴 Élevée | Question E1 |
| B6 | **Références clients sans autorisation vérifiée** (secret professionnel) | 🔴 Élevée | Question I2 |
| B7 | Missions réellement proposées non confirmées | 🟠 Moyenne | Questions G1 à G4 |
| B8 | Équipe et consentements de publication inconnus | 🟠 Moyenne | Question J3 |
| B9 | Existence et configuration de Microsoft Bookings inconnues | 🟠 Moyenne | Questions F1 à F3 |
| B10 | URL de l'espace client inconnue | 🟠 Moyenne | Question E5 |
| B11 | Chiffres clés non datés ni périmétrés | 🟠 Moyenne | Question I1 |
| B12 | Ressources graphiques (logo vectoriel, charte, photos) inconnues | 🟡 Faible | Questions K1 à K3 |

---

## Prochaine action

**Côté cabinet :** répondre à `QUESTIONS_CADRAGE.md`. Si le temps manque,
six réponses débloquent l'essentiel : **A1** (accès aux URLs), **B1** (siège et
RCS), **C1** (lien avec CEGECO), **D1** (adresses réelles), **E1** (téléphone),
**G1** (missions réelles).

**Côté équipe projet, à réception :** consolider `CONTENT_INVENTORY.md`,
compléter `REDIRECT_MAP.csv`, arrêter l'arborescence définitive, puis engager la
Phase 1 (plan de site, maquettes basse fidélité, direction visuelle, deux pages
de contenu représentatives) jusqu'au point de validation 2.

---

## Journal

| Date | Événement |
|---|---|
| 2026-09-09 | Dépôt inspecté : vide, aucun commit, aucune contrainte technique héritée |
| 2026-09-09 | Accès direct à `www.ofixis.fr` refusé par le proxy réseau — audit réorienté vers les sources indirectes |
| 2026-09-09 | Audit indirect réalisé (index moteurs, registres publics, annuaire de l'Ordre, annuaires tiers) |
| 2026-09-09 | Incohérence siège social / RCS détectée entre les mentions légales et les registres publics |
| 2026-09-09 | CEGECO identifiée comme personne morale distincte (SAS, SIREN 313 700 353, 1978) |
| 2026-09-09 | Six adresses et trois numéros de téléphone en circulation — NAP rompu |
| 2026-09-09 | Références clients citées par des annuaires tiers classées « interdit de publication » |
| 2026-09-09 | Livrables de Phase 0 rédigés ; projet en attente du point de validation 1 |
