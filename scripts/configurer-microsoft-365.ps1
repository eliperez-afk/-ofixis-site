#Requires -Version 7.0
<#
.SYNOPSIS
    Configure l'envoi des e-mails du site ofixis.fr via Microsoft Graph.

.DESCRIPTION
    Automatise les étapes 2 à 5 de GUIDE_MICROSOFT_365.md :
      1. inscrit une application dans Microsoft Entra ID ;
      2. crée son principal de service ;
      3. génère un secret client valable 24 mois ;
      4. accorde le rôle Exchange « Application Mail.Send » RESTREINT à la
         seule boîte d'envoi ;
      5. vérifie la configuration.

    Aucune permission n'est accordée dans Entra : c'est délibéré. Les
    permissions Entra et Exchange s'additionnent, et une permission Entra non
    restreinte annulerait la restriction posée côté Exchange. Toute la
    permission est donc accordée côté Exchange, sur une seule boîte.

.NOTES
    Rôles requis : Administrateur d'application (Entra) ET Administrateur
    Exchange, ou Administrateur général.

    ⚠ Ce script n'a pas pu être exécuté contre un locataire réel lors de sa
    rédaction. Lisez-le avant de le lancer, et utilisez -WhatIf pour une
    simulation. En cas de doute, suivez GUIDE_MICROSOFT_365.md à la main :
    le résultat est identique.

.EXAMPLE
    ./configurer-microsoft-365.ps1 -BoiteExpeditrice site@ofixis.fr -WhatIf
    ./configurer-microsoft-365.ps1 -BoiteExpeditrice site@ofixis.fr
#>

[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter(Mandatory)]
    [string] $BoiteExpeditrice,

    [string] $NomApplication = "Site ofixis.fr - formulaire de contact",

    [int] $MoisValiditeSecret = 24
)

$ErrorActionPreference = "Stop"

function Etape { param([string] $Texte) Write-Host "`n=== $Texte ===" -ForegroundColor Cyan }
function Info  { param([string] $Texte) Write-Host "    $Texte" -ForegroundColor Gray }
function Ok    { param([string] $Texte) Write-Host "  OK  $Texte" -ForegroundColor Green }

# ── Modules ───────────────────────────────────────────────────────────────
Etape "Vérification des modules PowerShell"

foreach ($module in @("Microsoft.Graph.Applications", "ExchangeOnlineManagement")) {
    if (-not (Get-Module -ListAvailable -Name $module)) {
        Info "Installation de $module ..."
        Install-Module $module -Scope CurrentUser -Force -AllowClobber
    }
    Import-Module $module
    Ok $module
}

# ── 1. Application Entra ──────────────────────────────────────────────────
Etape "Inscription de l'application dans Microsoft Entra ID"

Connect-MgGraph -Scopes "Application.ReadWrite.All" -NoWelcome
$contexte = Get-MgContext
$locataire = $contexte.TenantId
Info "Locataire : $locataire"
Info "Connecté en tant que : $($contexte.Account)"

$application = Get-MgApplication -Filter "displayName eq '$NomApplication'" -ErrorAction SilentlyContinue |
    Select-Object -First 1

if ($application) {
    Info "Application déjà existante, réutilisée."
} elseif ($PSCmdlet.ShouldProcess($NomApplication, "Créer l'application Entra")) {
    # SignInAudience restreint au seul annuaire de l'organisation.
    # Aucune RequiredResourceAccess : voir la note d'en-tête.
    $application = New-MgApplication -DisplayName $NomApplication -SignInAudience "AzureADMyOrg"
    Ok "Application créée."
} else {
    Info "Simulation : arrêt ici."
    return
}

Ok "MS_CLIENT_ID = $($application.AppId)"

$principal = Get-MgServicePrincipal -Filter "appId eq '$($application.AppId)'" -ErrorAction SilentlyContinue |
    Select-Object -First 1

if (-not $principal -and $PSCmdlet.ShouldProcess($application.AppId, "Créer le principal de service")) {
    $principal = New-MgServicePrincipal -AppId $application.AppId
    Ok "Principal de service créé."
}

Info "ID d'objet du principal de service : $($principal.Id)"

# ── 2. Secret client ──────────────────────────────────────────────────────
Etape "Génération du secret client"

$secret = $null
if ($PSCmdlet.ShouldProcess($NomApplication, "Générer un secret de $MoisValiditeSecret mois")) {
    $secret = Add-MgApplicationPassword -ApplicationId $application.Id -PasswordCredential @{
        DisplayName = "Site ofixis.fr"
        EndDateTime = (Get-Date).AddMonths($MoisValiditeSecret)
    }
    Ok "Secret généré, valable jusqu'au $($secret.EndDateTime.ToString('dd/MM/yyyy'))."
}

# ── 3. Permission Exchange, restreinte à une seule boîte ──────────────────
Etape "Attribution du rôle Exchange, restreint à $BoiteExpeditrice"

Connect-ExchangeOnline -ShowBanner:$false

if (-not (Get-Mailbox -Identity $BoiteExpeditrice -ErrorAction SilentlyContinue)) {
    throw "La boîte $BoiteExpeditrice n'existe pas. Créez-la (étape 1 du guide) puis relancez."
}
Ok "Boîte d'envoi trouvée."

$nomPortee     = "Portee site ofixis"
$nomAttribution = "Site ofixis - envoi"

if (-not (Get-ServicePrincipal -Identity $application.AppId -ErrorAction SilentlyContinue)) {
    if ($PSCmdlet.ShouldProcess($application.AppId, "Créer le pointeur Exchange vers l'application")) {
        New-ServicePrincipal -AppId $application.AppId `
                             -ObjectId $principal.Id `
                             -DisplayName "Site ofixis.fr" | Out-Null
        Ok "Pointeur Exchange créé."
    }
} else {
    Info "Pointeur Exchange déjà existant."
}

if (-not (Get-ManagementScope -Identity $nomPortee -ErrorAction SilentlyContinue)) {
    if ($PSCmdlet.ShouldProcess($nomPortee, "Créer le périmètre limité à $BoiteExpeditrice")) {
        New-ManagementScope -Name $nomPortee `
                            -RecipientRestrictionFilter "PrimarySmtpAddress -eq '$BoiteExpeditrice'" | Out-Null
        Ok "Périmètre créé."
    }
} else {
    Info "Périmètre déjà existant."
}

if (-not (Get-ManagementRoleAssignment -Identity $nomAttribution -ErrorAction SilentlyContinue)) {
    if ($PSCmdlet.ShouldProcess($nomAttribution, "Attribuer le rôle Application Mail.Send")) {
        New-ManagementRoleAssignment -Name $nomAttribution `
                                     -Role "Application Mail.Send" `
                                     -App $application.AppId `
                                     -CustomResourceScope $nomPortee | Out-Null
        Ok "Rôle attribué, restreint au périmètre."
    }
} else {
    Info "Attribution de rôle déjà existante."
}

# ── 4. Vérification ───────────────────────────────────────────────────────
Etape "Vérification"

try {
    # Cette commande contourne le cache de permissions, qui met sinon de
    # 30 minutes à 2 heures à se rafraîchir.
    $verification = Test-ServicePrincipalAuthorization -Identity $application.AppId `
                                                       -Resource $BoiteExpeditrice
    $verification | Format-Table -AutoSize
} catch {
    Info "Vérification impossible : $($_.Exception.Message)"
}

# ── 5. Restitution ────────────────────────────────────────────────────────
Etape "Valeurs à saisir dans Vercel"

Write-Host ""
Write-Host "  MS_TENANT_ID          = $locataire"
Write-Host "  MS_CLIENT_ID          = $($application.AppId)"
if ($secret) {
    Write-Host "  MS_CLIENT_SECRET      = $($secret.SecretText)" -ForegroundColor Yellow
} else {
    Write-Host "  MS_CLIENT_SECRET      = (non généré lors de cette exécution)"
}
Write-Host "  MS_BOITE_EXPEDITRICE  = $BoiteExpeditrice"
Write-Host "  EMAIL_DESTINATAIRE    = contact@ofixis.fr"
Write-Host ""
Write-Host "  Le secret n'est affiché qu'une fois. Saisissez-le directement" -ForegroundColor Yellow
Write-Host "  dans Vercel : Settings > Environment Variables." -ForegroundColor Yellow
if ($secret) {
    Write-Host "  Expiration : $($secret.EndDateTime.ToString('dd/MM/yyyy')) — à noter dans l'agenda." -ForegroundColor Yellow
}
Write-Host ""

Disconnect-ExchangeOnline -Confirm:$false | Out-Null
Disconnect-MgGraph | Out-Null
