# Configurer l'envoi des e-mails du formulaire via Microsoft 365

Guide destiné à l'administrateur du locataire Microsoft 365 du cabinet.
Comptez une trentaine de minutes.

---

## Pourquoi cette méthode

Le site doit pouvoir envoyer deux e-mails lorsqu'un visiteur remplit le
formulaire : une notification au cabinet et un accusé de réception au prospect.

La méthode historique — un mot de passe d'application et une connexion SMTP —
**ne fonctionne plus**. Microsoft a engagé l'extinction de l'authentification
basique pour la soumission SMTP dans Exchange Online le 1er mars 2026 et l'a
achevée le 30 avril 2026. Les mots de passe d'application, qui reposaient sur
ce mécanisme, sont inopérants depuis.

La voie recommandée par Microsoft est **Microsoft Graph** avec une application
inscrite dans Microsoft Entra ID. C'est ce que le site utilise. Aucun mot de
passe d'utilisateur n'est stocké : l'application dispose de son propre secret,
révocable à tout moment sans toucher à un compte.

---

## Deux façons de procéder

**À la main**, en suivant ce guide écran par écran — c'est la voie décrite
ci-dessous, et celle à privilégier si vous n'êtes pas à l'aise avec PowerShell.

**Par script** : `scripts/configurer-microsoft-365.ps1` enchaîne les étapes 2
à 5 et affiche les valeurs à reporter.

```powershell
./scripts/configurer-microsoft-365.ps1 -BoiteExpeditrice site@ofixis.fr -WhatIf   # simulation
./scripts/configurer-microsoft-365.ps1 -BoiteExpeditrice site@ofixis.fr           # exécution
```

> Ce script n'a pas pu être essayé contre un locataire Microsoft réel lors de
> sa rédaction — je n'ai accès à aucun. Lisez-le avant de le lancer et
> commencez par `-WhatIf`. Le résultat est strictement identique à la
> procédure manuelle.

---

## Étape 1 — Créer la boîte d'envoi

Créez une boîte aux lettres dédiée, par exemple **site@ofixis.fr**.

Pourquoi une boîte dédiée plutôt que `contact@ofixis.fr` : si un jour les
messages automatiques posent un problème de réputation ou de délivrabilité,
la messagerie courante du cabinet n'est pas affectée. Les réponses des
prospects, elles, arriveront bien sur `contact@ofixis.fr` : le site configure
l'en-tête « répondre à » sur l'adresse du prospect.

Une boîte partagée convient et ne consomme pas de licence.

## Étape 2 — Inscrire l'application

Dans le **centre d'administration Microsoft Entra** → *Applications* →
*Inscriptions d'applications* → **Nouvelle inscription** :

- **Nom** : `Site ofixis.fr — formulaire de contact`
- **Types de comptes** : comptes de cet annuaire d'organisation uniquement
- **URI de redirection** : laisser vide — l'application n'a pas d'interface

Relevez, sur la page d'aperçu :

- l'**ID d'application (client)** → `MS_CLIENT_ID`
- l'**ID de l'annuaire (locataire)** → `MS_TENANT_ID`

## Étape 3 — Ne PAS accorder de permission dans Entra

Contrairement à ce que l'on trouve souvent, **n'ajoutez aucune autorisation
d'API à l'application**. Ne cochez pas `Mail.Send`, n'accordez aucun
consentement administrateur.

C'est contre-intuitif, et c'est pourtant le point le plus important de ce
guide. Voici pourquoi.

Une permission `Mail.Send` accordée dans Entra vaut **pour toutes les boîtes
du locataire**, sans exception possible. Elle peut être restreinte — mais
uniquement par le mécanisme historique des *application access policies*, que
Microsoft remplace et déconseille désormais pour les nouvelles configurations.

Le mécanisme actuel, le contrôle d'accès basé sur les rôles côté Exchange
(étape 4), permet d'accorder la permission **directement sur une seule boîte**.
Mais — et c'est le piège — les deux systèmes **s'additionnent**. Microsoft le
documente explicitement : si l'application détient une permission `Mail.Send`
non restreinte dans Entra *et* une permission limitée à une boîte côté
Exchange, le résultat est une permission non restreinte. La restriction ne
sert alors à rien.

**Donc : aucune permission dans Entra, tout se joue à l'étape 4.**

> Si une permission `Mail.Send` a déjà été accordée dans Entra lors d'un essai
> précédent, retirez-la avant de continuer — sinon la restriction de
> l'étape 4 restera sans effet.

## Étape 4 — Accorder la permission sur la seule boîte d'envoi

Cette étape se fait en PowerShell, module `ExchangeOnlineManagement`. Elle
demande le rôle **Administrateur Exchange** ou l'appartenance au groupe
**Organization Management**.

```powershell
Connect-ExchangeOnline

# 1. Créer le pointeur vers l'application Entra
New-ServicePrincipal -AppId "<MS_CLIENT_ID>" `
                     -ObjectId "<ID d'objet du principal de service>" `
                     -DisplayName "Site ofixis.fr"

# 2. Délimiter le périmètre à la seule boîte d'envoi
New-ManagementScope -Name "Portee site ofixis" `
                    -RecipientRestrictionFilter "PrimarySmtpAddress -eq 'site@ofixis.fr'"

# 3. Attribuer le rôle, restreint à ce périmètre
New-ManagementRoleAssignment -Name "Site ofixis - envoi" `
                             -Role "Application Mail.Send" `
                             -App "<MS_CLIENT_ID>" `
                             -CustomResourceScope "Portee site ofixis"

# 4. Vérifier
Test-ServicePrincipalAuthorization -Identity "<MS_CLIENT_ID>" -Resource "site@ofixis.fr"
```

`Test-ServicePrincipalAuthorization` contourne le cache de permissions et
donne une réponse immédiate. Sans lui, comptez de 30 minutes à 2 heures avant
qu'un changement de permission soit effectif.

Le script `scripts/configurer-microsoft-365.ps1` enchaîne l'ensemble de ces
opérations, étapes 2 à 5 comprises.

Après cette configuration, une tentative d'envoi depuis une autre boîte que
`site@ofixis.fr` est refusée par Exchange.

## Étape 5 — Créer le secret client

Dans l'application → *Certificats et secrets* → **Nouveau secret client** :

- **Description** : `Site ofixis.fr`
- **Expiration** : 24 mois

**Copiez immédiatement la valeur du secret** : elle n'est affichée qu'une fois.
C'est elle qui alimente `MS_CLIENT_SECRET`.

> **Notez la date d'expiration dans votre agenda.** Le jour où le secret
> expire, le formulaire cesse d'envoyer. Le site l'indiquera clairement au
> visiteur — il n'affichera jamais un faux succès — mais les demandes seront
> perdues jusqu'au renouvellement.

Un certificat est plus sûr qu'un secret et n'a pas cet inconvénient : c'est
une évolution possible si vous le souhaitez.

## Étape 6 — Transmettre les valeurs

Cinq valeurs sont à reporter dans la configuration du site :

| Variable | Valeur |
|---|---|
| `MS_TENANT_ID` | ID de l'annuaire (locataire) |
| `MS_CLIENT_ID` | ID d'application (client) |
| `MS_CLIENT_SECRET` | Le secret de l'étape 5 |
| `MS_BOITE_EXPEDITRICE` | `site@ofixis.fr` |
| `EMAIL_DESTINATAIRE` | `contact@ofixis.fr` |

**Ne transmettez pas le secret par e-mail ni par messagerie instantanée.**
Il est à saisir directement dans les variables d'environnement de
l'hébergement, où il reste chiffré et n'apparaît jamais dans le dépôt de code.

## Étape 7 — Vérifier

Une fois les variables en place, remplissez le formulaire de contact sur la
préproduction, puis vérifiez :

1. la notification arrive sur `contact@ofixis.fr` ;
2. l'accusé de réception arrive chez l'expéditeur du test ;
3. **répondre à la notification** s'adresse bien au prospect, pas au site ;
4. une copie figure dans les éléments envoyés de `site@ofixis.fr` ;
5. le message n'arrive pas en indésirable.

---

## Délivrabilité

L'envoi partant de l'infrastructure Microsoft depuis une boîte de votre propre
locataire, l'authentification du domaine est déjà assurée par la configuration
Microsoft 365 de `ofixis.fr` (SPF, DKIM). Aucun enregistrement DNS
supplémentaire n'est nécessaire pour ce formulaire — c'est l'avantage de cette
solution sur un prestataire d'envoi tiers.

Si vous n'avez jamais activé **DKIM** pour `ofixis.fr` dans Microsoft 365,
c'est le moment : cela améliore la délivrabilité de tous vos e-mails, pas
seulement ceux du site.

## En cas de problème

| Symptôme | Cause la plus probable |
|---|---|
| « Authentification Microsoft refusée » | Secret expiré ou erroné, ou mauvais `MS_TENANT_ID` |
| Erreur 403 sur l'envoi | Rôle Exchange non attribué, périmètre excluant la boîte d'envoi, ou cache de permissions pas encore rafraîchi (jusqu'à 2 heures — utilisez `Test-ServicePrincipalAuthorization`) |
| Erreur 404 sur l'envoi | `MS_BOITE_EXPEDITRICE` ne correspond à aucune boîte du locataire |
| Le visiteur voit un message d'erreur | Normal si l'envoi a échoué : le site ne simule jamais un succès. Consultez les journaux du serveur, où seule la cause technique est enregistrée — jamais le contenu de la demande |

---

## Ce que le site fait des données

Aucune donnée du formulaire n'est stockée en base. Le message est transmis par
Graph, puis conservé uniquement dans les boîtes Microsoft 365 du cabinet,
selon la durée annoncée dans la politique de confidentialité (3 ans à compter
du dernier contact pour une demande sans suite).

Les journaux techniques du site n'enregistrent que la cause d'un échec
d'envoi : ni le nom, ni l'adresse e-mail, ni le contenu du message.
