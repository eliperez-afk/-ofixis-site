# OFIXIS — Check-list de lancement

**Date :** 9 septembre 2026
**Statut :** squelette établi en Phase 0, complété au fil du projet.
**Règle absolue :** aucune mise en production, aucune modification DNS sans
**accord écrit explicite** du dirigeant. L'ancien site n'est pas supprimé tant
que la nouvelle version, les redirections et la procédure de retour arrière ne
sont pas validées.

---

## A. Préalables bloquants — à lever avant toute mise en ligne

- [ ] **Mentions légales exactes** : siège social et ville du RCS confirmés (question B1)
- [ ] **Statut du bureau « Paris Sud »** et relation avec CEGECO qualifiés par écrit (question C1)
- [ ] **Adresses réelles** arbitrées, une seule valeur par bureau (question D1)
- [ ] **Téléphone** unique décidé et répliqué partout (question E1)
- [ ] **Aucun logo ni référence client** publié sans autorisation écrite, nominative et datée
- [ ] **Consentement écrit** de chaque personne présentée sur `/equipe`
- [ ] **Chiffres clés** datés et périmétrés, ou retirés
- [ ] **URL de l'espace client** confirmée (question E5)
- [ ] Chaque contenu fiscal, social ou juridique **daté, sourcé, relu** par une
      personne identifiée, avec avertissement de portée générale
- [ ] **Relecture déontologique** : aucun superlatif, aucune comparaison,
      aucune mention « n° 1 » / « meilleur » / « moins cher » / « certifié par l'Ordre »,
      aucun emploi de « spécialiste » pour une compétence non officiellement reconnue
      (articles 152 et 161 du Code de déontologie)

## B. Préproduction

- [ ] Environnement de préproduction déployé
- [ ] **Indexation bloquée** : `X-Robots-Tag: noindex` + protection par mot de passe
- [ ] URL de prévisualisation transmise avec un guide de recette
- [ ] Recette effectuée par le cabinet ; anomalies consignées
- [ ] Tous les défauts bloquants corrigés
- [ ] Contenus validés importés ; contenus faibles ou inexacts réécrits

## C. Qualité

- [ ] `lint`, vérification de types et `build` sans erreur
- [ ] Tests unitaires, d'intégration et end-to-end au vert
- [ ] Lighthouse ≥ 90 sur les quatre axes, mobile et ordinateur, sur les pages types
- [ ] Navigation clavier complète ; focus visible ; lien d'évitement
- [ ] Test au lecteur d'écran sur les parcours clés
- [ ] Zoom 200 % sans perte de contenu ni défilement horizontal
- [ ] Contrastes AA vérifiés
- [ ] Rendu vérifié de 320 px aux grands écrans
- [ ] Aucune erreur console, aucun lien cassé, aucune image sans alternative appropriée
- [ ] `prefers-reduced-motion` respecté

## D. Conversion

- [ ] Liens `tel:` fonctionnels sur mobile, libellés accessibles
- [ ] Formulaire : validation serveur, limitation de débit, honeypot, messages d'erreur explicites
- [ ] Notification interne **et** accusé de réception reçus lors d'un test réel
- [ ] Aucun faux message de succès en cas d'échec d'envoi
- [ ] Mention d'information RGPD présente et lien vers la politique complète
- [ ] Message « ne transmettez aucune donnée confidentielle » visible
- [ ] Microsoft Bookings testé : choix du service, fuseau Europe/Paris,
      disponibilités, confirmation, annulation, report, création du lien Teams, affichage mobile
- [ ] **Aucun créneau ni réunion factice en production**
- [ ] Espace client : URL confirmée, `rel="noopener noreferrer"`, distinct de « Prendre rendez-vous »
- [ ] Barre d'actions mobile : ne masque pas le contenu, zones sûres iOS respectées

## E. SEO

- [ ] Titres et méta-descriptions uniques sur toutes les pages
- [ ] Canoniques correctes
- [ ] `robots.txt` de production autorisant l'indexation
- [ ] Sitemap XML complet et valide
- [ ] **100 % des lignes de `REDIRECT_MAP.csv` rejouées** : bon code, bonne cible, aucune chaîne
- [ ] Aucune ancienne URL utile en 404
- [ ] JSON-LD validé au Rich Results Test, conforme au contenu visible
- [ ] Fil d'Ariane en place sur les pages profondes
- [ ] NAP identique entre site, fiches Google Business Profile et annuaires
- [ ] Open Graph vérifié sur un partage réel

## F. Conformité et sécurité

- [ ] Politique de confidentialité complète et **validée juridiquement**
- [ ] Mentions légales à jour
- [ ] Page accessibilité publiée
- [ ] Bandeau de consentement **uniquement** si un traceur le rend nécessaire ;
      refus aussi simple que l'acceptation ; retrait possible ; blocage réel avant consentement
- [ ] Registre des services tiers et des cookies tenu à jour
- [ ] HTTPS exclusif ; redirection `http → https`
- [ ] En-têtes CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` en place
- [ ] HSTS activé **après** validation du domaine
- [ ] Aucun secret dans Git ; variables d'environnement documentées
- [ ] Dépendances auditées
- [ ] Aucune donnée sensible dans les journaux

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
12. Corriger les **mentions légales** du site actuel si le siège a effectivement changé
