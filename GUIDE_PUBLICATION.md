# Publier ou mettre à jour une actualité

Guide destiné aux personnes du cabinet, sans connaissance technique requise.

---

## Comment fonctionne la rubrique Actualités

Chaque article est un fichier texte rangé dans le dossier `content/actualites`.
Le nom du fichier détermine l'adresse de l'article :

> `facturation-electronique-calendrier.md`
> devient `www.ofixis.fr/actualites/facturation-electronique-calendrier`

Un article n'apparaît sur le site **que** lorsque son statut est `publie`.
Tant qu'il est `brouillon` ou `relecture`, il n'existe pas côté public : il
n'apparaît dans aucune liste, il est absent du plan du site, et son adresse
directe affiche une page « introuvable ». Vous pouvez donc préparer un article
en toute tranquillité, même sur plusieurs jours.

---

## Écrire un nouvel article

**1. Partir du modèle.** Copiez le fichier
`content/actualites/exemple-modele-article.md` et renommez la copie d'après
l'adresse souhaitée : uniquement des minuscules, des chiffres et des tirets,
sans accent ni espace.

**2. Remplir l'en-tête.** C'est la partie entre les deux lignes de tirets, en
haut du fichier. Tous ces champs sont obligatoires.

| Champ | Ce qu'il faut y mettre |
|---|---|
| `titre` | Le titre de l'article |
| `chapo` | Un résumé de deux phrases. Il sert aussi de description dans Google : soignez-le. |
| `categorie` | Le thème : Comptabilité, Fiscalité, Social, Juridique, Création… |
| `auteur` | La personne qui a rédigé |
| `relecteur` | La personne du cabinet qui a validé le fond |
| `publieLe` | La date de publication, au format `2026-09-15` |
| `misAJourLe` | `null` au départ ; une date lors d'une mise à jour |
| `revoirAvantLe` | La date à laquelle il faudra revérifier le contenu |
| `statut` | `brouillon`, puis `relecture`, puis `publie` |
| `sources` | Les sources officielles utilisées, avec leur adresse |

**3. Écrire le texte**, sous l'en-tête. La mise en forme suit des règles simples :

```
## Un titre de partie
### Un sous-titre

Un paragraphe s'écrit normalement. Une ligne vide sépare deux paragraphes.

- un élément de liste
- un autre élément

**Un mot en gras** s'entoure de deux étoiles.
[Un lien](https://www.exemple.fr) s'écrit ainsi.
```

Au-delà de deux titres de partie, un sommaire est ajouté automatiquement en
haut de l'article.

**4. Passer le statut à `publie`** une fois la relecture faite, puis enregistrer.
L'article apparaît sur le site à la mise en ligne suivante.

---

## Ce qui est ajouté automatiquement

Vous n'avez pas à vous en occuper :

- la date de publication et la date de mise à jour, affichées en tête d'article ;
- les noms de l'auteur et du relecteur ;
- la durée de lecture estimée ;
- le sommaire ;
- l'avertissement de portée générale, en bas de chaque article ;
- la liste des sources ;
- la présence de l'article dans la rubrique, dans le plan du site et dans le flux RSS.

---

## Mettre à jour un article existant

Modifiez le texte, puis **renseignez la date du jour dans `misAJourLe`**. Cette
date s'affiche sur l'article et signale aux lecteurs comme aux moteurs de
recherche que le contenu a été revérifié.

**Ne changez pas le nom du fichier** d'un article déjà publié : son adresse
changerait et les liens existants tomberaient en erreur. Si un changement
d'adresse est indispensable, prévenez la personne qui gère le site : une
redirection doit être mise en place en même temps.

---

## Règles à respecter

Ces règles ne sont pas des recommandations de style : elles engagent la
responsabilité du cabinet.

1. **Toute affirmation technique s'appuie sur une source officielle** citée dans
   l'en-tête : BOFiP, URSSAF, Légifrance, service-public.fr, site d'un ordre
   professionnel.
2. **Un article est relu par un professionnel du cabinet** avant publication.
   Le nom du relecteur est publié : il engage.
3. **Les seuils, taux et barèmes sont datés.** Ils changent — c'est le rôle du
   champ `revoirAvantLe`.
4. **Aucun superlatif, aucune comparaison** avec un confrère, aucune promesse de
   résultat. Les articles 152 et 161 du Code de déontologie s'appliquent aux
   contenus du site comme au reste de la communication du cabinet.
5. **Aucun nom de client, aucun cas réel identifiable**, même anonymisé si la
   personne reste reconnaissable. Le secret professionnel prime.
6. **Aucun texte produit par une intelligence artificielle n'est publié tel
   quel.** Un tel texte peut servir de point de départ, jamais de contenu final.

---

## Le processus, de l'idée à la publication

1. **Choix du sujet** — de préférence dans le calendrier éditorial de `SEO_PLAN.md`
2. **Collecte des sources officielles**
3. **Rédaction** — statut `brouillon`
4. **Vérification technique** — les chiffres, les dates, les références
5. **Validation par un expert-comptable** — statut `relecture`
6. **Publication** — statut `publie`
7. **Révision planifiée** — à la date inscrite dans `revoirAvantLe`

---

## Et plus tard, une interface d'administration ?

Aujourd'hui, les articles sont des fichiers. C'est simple, gratuit, sans
maintenance, et l'historique de chaque modification est conservé.

Si le rythme de publication augmente, ou si plusieurs personnes doivent écrire
sans passer par des fichiers, une interface d'administration en ligne pourra
être ajoutée. Les champs décrits ci-dessus ont été conçus pour correspondre
exactement à cette future interface : la bascule se fera sans réécrire les
articles ni modifier les pages du site. Les options comparées figurent dans
`CADRAGE_TECHNIQUE.md`.
