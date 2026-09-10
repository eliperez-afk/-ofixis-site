# OFIXIS — Check-list de lancement

**Date :** 10 septembre 2026
**Statut :** mise à jour après livraison du site. Les cases cochées ont été vérifiées ; les autres restent ouvertes.
**Règle absolue :** aucune mise en production, aucune modification DNS sans
**accord écrit explicite** du dirigeant. L'ancien site n'est pas supprimé tant
que la nouvelle version, les redirections et la procédure de retour arrière ne
sont pas validées.

---

## A. Préalables bloquants — à lever avant toute mise en ligne

- [x] Siège social confirmé : 90 rue Chaptal, 92300 Levallois-Perret
- [ ] **Ville du RCS, capital et n° de TVA** confirmés (question B2)
- [x] Bureau « Paris Sud » retiré du site — la question CEGECO est sans objet
- [x] Adresse unique arbitrée ; anciennes adresses retirées et verrouillées par test
- [x] Numéro unique (06 50 28 12 86) répliqué partout et verrouillé par test
- [ ] Remplacer par la ligne fixe dès sa mise en service
- [x] Aucun logo ni référence client — décision du dirigeant, vérifiée par test
- [ ] **Consentement écrit** de chaque personne présentée sur `/equipe`
- [x] Chiffres clés retirés
- [ ] **URL de l'espace client** confirmée (question E5)
- [ ] Chaque contenu fiscal, social ou juridique **daté, sourcé, relu** par une
      personne identifiée, avec avertissement de portée générale
- [ ] **Relecture déontologique** : aucun superlatif, aucune comparaison,
      aucune mention « n° 1 » / « meilleur » / « moins cher » / « certifié par l'Ordre »,
      aucun emploi de « spécialiste » pour une compétence non officiellement reconnue
      (articles 152 et 161 du Code de déontologie)

## B. Préproduction

- [ ] Environnement de préproduction déployé
- [x] `X-Robots-Tag: noindex` et `robots.txt` bloquants en préproduction — vérifié par test
- [ ] Protection par mot de passe de la préproduction hébergée
- [ ] URL de prévisualisation transmise avec un guide de recette
- [ ] Recette effectuée par le cabinet ; anomalies consignées
- [ ] Tous les défauts bloquants corrigés
- [ ] Contenus validés importés ; contenus faibles ou inexacts réécrits

## C. Qualité

- [x] `lint`, vérification de types et `build` sans erreur
- [x] Tests de bout en bout au vert (41 tests, profils ordinateur et mobile)
- [ ] **Lighthouse ≥ 90** — mesure impossible sans préproduction hébergée
- [x] Focus visible et lien d'évitement en place (parcours clavier complet à confirmer en recette)
- [ ] Test au lecteur d'écran sur les parcours clés
- [ ] Zoom 200 % sans perte de contenu ni défilement horizontal
- [x] Contrastes AA vérifiés par calcul ; une teinte corrigée
- [ ] Rendu vérifié de 320 px aux grands écrans
- [x] Aucune erreur console, aucune image sans alternative (aucune image à ce stade)
- [x] `prefers-reduced-motion` respecté

## D. Conversion

- [x] Liens `tel:` vérifiés (`tel:+33650281286`), libellés accessibles
- [x] Formulaire : validation serveur, limitation de débit, champ leurre, messages explicites
- [ ] **Notification interne et accusé de réception à tester en réel** — service d'envoi non configuré
- [x] Aucun faux message de succès en cas d'échec — vérifié par test
- [x] Mention d'information RGPD et lien vers la politique complète
- [x] Message « ne transmettez aucune donnée confidentielle » vérifié par test
- [ ] Microsoft Bookings testé : choix du service, fuseau Europe/Paris,
      disponibilités, confirmation, annulation, report, création du lien Teams, affichage mobile
- [ ] **Aucun créneau ni réunion factice en production**
- [ ] Espace client : URL à fournir — le bouton est absent tant qu'elle manque
- [x] Barre d'actions mobile : ne masque pas le contenu, zones sûres iOS respectées

## E. SEO

- [x] Titres et méta-descriptions uniques — vérifié par test
- [x] Canoniques uniques — vérifié par test
- [ ] `robots.txt` de production autorisant l'indexation
- [x] Sitemap XML dynamique en place
- [ ] **100 % des lignes de `REDIRECT_MAP.csv` rejouées** : bon code, bonne cible, aucune chaîne
- [ ] Aucune ancienne URL utile en 404
- [x] JSON-LD conforme au contenu visible
- [ ] Validation au Rich Results Test (nécessite une URL publique)
- [x] Fil d'Ariane en place sur les pages profondes
- [ ] NAP identique entre site, fiches Google Business Profile et annuaires
- [ ] Open Graph vérifié sur un partage réel

## F. Conformité et sécurité

- [ ] Politique de confidentialité complète et **validée juridiquement**
- [ ] Mentions légales à jour
- [ ] Page accessibilité publiée
- [x] Aucun traceur, aucun cookie, aucune police distante — aucun bandeau nécessaire
- [ ] Registre des services tiers et des cookies tenu à jour
- [ ] HTTPS exclusif ; redirection `http → https`
- [x] `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options` en place
- [ ] **CSP à finaliser** une fois les services tiers arrêtés
- [ ] HSTS activé **après** validation du domaine
- [x] Aucun secret dans Git ; `.env.example` documenté
- [x] Dépendances auditées : 0 vulnérabilité
- [x] Aucune donnée sensible dans les journaux

## G. Bascule DNS — sur accord écrit uniquement

- [ ] **Accord écrit explicite du dirigeant obtenu**
- [ ] Sauvegarde complète de l'ancien site (fichiers + base) réalisée et **restauration testée**
- [ ] Configuration DNS actuelle documentée (capture de tous les enregistrements)
- [ ] TTL abaissé 24 à 48 h avant la bascule
- [ ] Certificat TLS émis et vérifié
- [ ] Domaine canonique (`www` ou apex) décidé et cohérent avec l'existant
- [ ] Fenêtre de bascule programmée hors période de forte activité
- [ ] **Procédure de retour arrière écrite, datée, testée** — qui l'exécute, en combien de temps
- [ ] TTL rétabli après stabilisation

## H. Immédiatement après la mise en ligne

- [ ] `robots.txt` de production vérifié (l'interdiction d'indexation a bien été retirée)
- [ ] Sitemap soumis à la Search Console
- [ ] Pages clés inspectées et demande d'indexation envoyée
- [ ] Redirections vérifiées en production
- [ ] Formulaire testé en conditions réelles
- [ ] Prise de rendez-vous testée en conditions réelles
- [ ] Numéros de téléphone testés depuis un mobile
- [ ] Fiches Google Business Profile mises à jour avec les nouvelles URLs
- [ ] Ancien site conservé en sauvegarde, **non supprimé**

## I. Suivi à 30 jours

- [ ] Erreurs 404 surveillées et redirections complétées
- [ ] Indexation des nouvelles pages suivie
- [ ] Core Web Vitals suivis (données réelles)
- [ ] Demandes reçues comptées par canal
- [ ] Positions suivies sur les intentions prioritaires
- [ ] Bilan à 30 jours transmis au cabinet
- [ ] Décision sur le sort définitif de l'ancien site

---

## Reste à faire avant toute mise en ligne — synthèse

1. **Mentions légales** : ville du RCS, capital, n° de TVA, hébergeur
2. **Adresse e-mail destinataire** des demandes et configuration du service d'envoi
3. **URL de l'espace client**
4. **Page Microsoft Bookings**, si la prise de rendez-vous en ligne est souhaitée
5. **Validation des 8 pages de mission** (périmètre réel)
6. **Relecture juridique** de la politique de confidentialité
7. **Finalisation de la CSP** une fois les services tiers arrêtés
8. **Préproduction hébergée** pour mesurer les performances réelles
9. **Liste des URLs de l'ancien site** pour compléter les redirections

---

## Actions manuelles à la charge du cabinet

Ces actions ne peuvent pas être réalisées à sa place :

1. Créer ou configurer la page **Microsoft Bookings** (services, durées, personnes, horaires)
2. Fournir l'**URL réelle du portail espace client**
3. Donner accès au **registrar / DNS** ou exécuter la bascule
4. Revendiquer et vérifier la propriété **Google Search Console**
5. Créer le compte de **mesure d'audience**
6. Revendiquer et corriger les **fiches Google Business Profile**
7. Faire corriger les **annuaires tiers** diffusant des données périmées
8. Obtenir les **autorisations écrites** pour tout logo, avis ou témoignage
9. Recueillir les **consentements** de publication de l'équipe (photo et données)
10. Faire **valider juridiquement** la politique de confidentialité
11. Désigner le **relecteur** des contenus fiscaux, sociaux et juridiques
12. Corriger les **mentions légales du site actuel** — le siège y est encore indiqué à Noisy-le-Sec
13. **Faire corriger les annuaires tiers** (PagesJaunes, Mappy, annuaires d'experts-comptables)
    qui diffusent encore les anciennes adresses et d'anciens numéros de téléphone
