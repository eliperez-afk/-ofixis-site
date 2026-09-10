# OFIXIS — Rapport de tests

**Date :** 10 septembre 2026
**Version testée :** préproduction, branche `claude/ofixis-website-redesign-9a8kk6`

---

## 1. Vérifications automatisées

| Contrôle | Commande | Résultat |
|---|---|---|
| Types TypeScript (mode strict) | `npm run typecheck` | ✅ aucune erreur |
| Analyse statique | `npm run lint` | ✅ aucune erreur, aucun avertissement |
| Compilation de production | `npm run build` | ✅ 25 routes générées |
| Tests de bout en bout | `npm test` | ✅ 41 tests passés, 1 ignoré |
| Barrière de contenu | `npm run check:contenu` | ⚠️ 18 éléments en attente de validation (attendu) |

Le test ignoré est celui de la barre d'actions mobile, volontairement écarté
sur le profil « ordinateur » où cette barre n'existe pas.

## 2. Couverture des tests de bout en bout

Les tests s'exécutent sur deux profils : Chrome de bureau (1280 px) et
Pixel 7 (mobile). Ils portent sur ce dont la régression coûterait une demande
entrante ou créerait un risque juridique.

**Parcours de conversion**
- Le premier écran annonce l'activité, la ville et les actions disponibles
- Le numéro de téléphone est un lien `tel:` correctement formé (`tel:+33650281286`)
- Les trois actions de la barre mobile sont présentes et le pied de page reste atteignable
- La page de rendez-vous ne présente aucun agenda simulé tant que Bookings n'est pas configuré

**Formulaire de contact**
- Les erreurs de saisie sont explicites et le focus part sur le premier champ fautif
- **Un échec d'envoi n'est jamais présenté comme un succès** — vérifié en conditions réelles,
  service d'e-mail non configuré : l'utilisateur voit un message d'erreur et le numéro de téléphone
- L'avertissement « ne transmettez aucune donnée confidentielle » est présent

**Contenu non validé — garde-fous**
- Un article au statut brouillon renvoie une 404 (non listé, non indexé, non accessible par URL)
- La page « Équipe » n'existe pas tant qu'aucun consentement n'a été recueilli
- **Aucun nom de client n'apparaît** — vérification explicite sur Allianz, Axa, Krys, Orangetheory
- **Aucune adresse ni téléphone de l'ancien site ne subsiste** — vérification sur Noisy-le-Sec,
  rue Bosio, Provins, Courloison, Saint-Mandé et le numéro 01 89 41 04 76, sur quatre pages

**SEO technique**
- Titre, description et URL canonique uniques sur chaque page testée
- La préproduction est interdite d'indexation (`X-Robots-Tag` et `robots.txt`)
- Les anciennes URLs sont redirigées de façon permanente vers une cible thématique
- Une page inconnue renvoie une 404 accompagnée de liens utiles

**Qualité générale**
- Aucune erreur console sur les pages principales
- Aucune image sans alternative textuelle
- Aucun défilement horizontal à 320 px de large

## 3. Accessibilité

Objectif : WCAG 2.2 niveau AA. **Aucun audit de conformité par un organisme
tiers n'a été réalisé** — ce qui suit relève de la vérification technique.

| Point | État | Vérification |
|---|---|---|
| Navigation clavier complète | ✅ | Test automatisé du lien d'évitement ; parcours complet à confirmer en recette |
| Indicateur de focus visible | ✅ | Contour de 3 px sur tout élément interactif |
| Lien d'évitement | ✅ | Testé : premier élément atteint par la touche Tab |
| Hiérarchie des titres | ✅ | Un seul `h1` par page |
| Étiquettes de formulaire visibles | ✅ | Aucun champ dépourvu d'étiquette |
| Erreurs de formulaire annoncées | ✅ | `aria-invalid`, `aria-describedby`, `role="alert"` |
| Texte courant ≥ 16 px | ✅ | 17 px |
| Zoom 200 % | ⏸ | Mise en page fluide, sans largeur fixe ; à vérifier en recette |
| Défilement horizontal | ✅ | Aucun, de 320 px aux grands écrans |
| `prefers-reduced-motion` | ✅ | Animations et défilement fluide neutralisés |
| Aucune fenêtre surgissante, aucun carrousel | ✅ | Par conception |
| Liens externes signalés | ✅ | Mention « nouvelle fenêtre » pour les lecteurs d'écran |

**Contrastes** — rapports réellement calculés sur la palette retenue
(exigence AA : 4,5:1 pour le texte courant) :

| Combinaison | Rapport | AA |
|---|---|---|
| Encre `#0c1f2c` sur craie `#fbfaf8` | 16,13:1 | ✅ |
| Encre sur blanc | 16,83:1 | ✅ |
| Ardoise 700 `#2f4a5c` sur craie | 8,93:1 | ✅ |
| Ardoise 500 `#546a77` sur craie | 5,43:1 | ✅ |
| Ardoise 500 sur craie ombrée `#f2efe9` | 4,94:1 | ✅ |
| Laiton `#8a5f22` sur craie | 5,38:1 | ✅ |
| Laiton sur laiton pâle `#f4ece0` | 4,79:1 | ✅ |
| Blanc sur encre | 16,83:1 | ✅ |
| Laiton clair `#d6a45c` sur encre | 7,47:1 | ✅ |
| Ardoise 100 `#d9e0e4` sur encre | 12,61:1 | ✅ |
| Erreur `#a3231f` sur craie | 7,15:1 | ✅ |

> Le calcul a fait apparaître un écart : la teinte « ardoise 500 » initialement
> retenue (`#5c7482`) tombait à 4,28:1 sur fond craie ombré, sous le seuil AA.
> Elle a été assombrie en `#546a77`, ce qui ramène toutes les combinaisons
> au-dessus de 4,5:1.

**Reste à faire :** test au lecteur d'écran (NVDA ou VoiceOver) sur le parcours
de contact, à réaliser lors de la recette par le cabinet.

## 4. Performance

Aucune mesure Lighthouse n'a pu être exécutée : l'environnement de
développement n'a pas accès au réseau sortant. Les éléments objectifs
mesurables sont les suivants.

| Élément | Valeur | Effet |
|---|---|---|
| Polices distantes | **aucune** | Aucune requête réseau, aucun décalage de mise en page au chargement |
| Scripts tiers | **aucun** par défaut | La mesure d'audience n'est chargée que si elle est configurée |
| Images | **aucune** pour l'instant | À intégrer avec dimensions explicites et chargement différé |
| Pages générées statiquement | 20 sur 25 | Servies sans calcul serveur |
| JavaScript côté client | 3 composants | En-tête (menu mobile), formulaire, fil d'Ariane |
| Cookies | **aucun** | Aucun bandeau de consentement nécessaire |

Ces choix orientent favorablement le LCP et le CLS, mais **les cibles annoncées
— Lighthouse ≥ 90, LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 — devront être
mesurées sur la préproduction hébergée**, avec les images définitives.

## 5. Sécurité

| Mesure | État |
|---|---|
| `X-Content-Type-Options: nosniff` | ✅ vérifié |
| `Referrer-Policy: strict-origin-when-cross-origin` | ✅ vérifié |
| `Permissions-Policy` (caméra, micro, géolocalisation désactivés) | ✅ vérifié |
| `X-Frame-Options: SAMEORIGIN` | ✅ vérifié |
| `X-Robots-Tag: noindex` en préproduction | ✅ vérifié |
| HSTS | ⏸ activé automatiquement en production, après validation du domaine |
| Politique de sécurité de contenu (CSP) | ⏸ à finaliser une fois les services tiers arrêtés |
| Validation serveur par schéma | ✅ Zod, côté serveur, indépendante du client |
| Protection anti-robots | ✅ champ leurre + délai minimal + limitation de débit |
| Secrets hors du dépôt | ✅ variables d'environnement, `.env.example` documenté |
| Journaux sans donnée personnelle | ✅ seule la cause technique est journalisée |
| Dépendances | ✅ `npm audit` : 0 vulnérabilité |

**Point ouvert :** la CSP n'est pas encore posée. Elle dépend des services tiers
retenus (Bookings, mesure d'audience, portail client). À finaliser avant la mise
en production — inscrit à la check-list de lancement.

## 6. Limites de ce rapport

1. **Aucune mesure de performance réelle** — nécessite une préproduction hébergée.
2. **Aucun test au lecteur d'écran** — à réaliser en recette.
3. **Aucun test du formulaire en conditions réelles d'envoi** — le service
   d'e-mail n'est pas configuré. Le comportement en cas d'échec, lui, est testé.
4. **Aucun test de la prise de rendez-vous** — la page Bookings n'existe pas encore.
5. **Le contenu est au statut brouillon** — les tests portent sur le
   fonctionnement, pas sur l'exactitude des textes, qui relève de la validation
   par le cabinet.

## 7. Rejouer les tests

```bash
npm install
npm run verify        # types, analyse statique, compilation, tests
npm run check:contenu # inventaire de ce qui reste à valider
```

Dans cet environnement, Chromium doit être désigné explicitement :

```bash
CHEMIN_CHROMIUM=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npx playwright test
```
