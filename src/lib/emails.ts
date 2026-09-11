import { CABINET, adresseUneLigne } from "@/config/cabinet";
import type { DonneesContact } from "./validation";

/**
 * Envoi des e-mails du formulaire de contact via Microsoft Graph.
 *
 * Pourquoi Graph et non SMTP : Microsoft a désactivé définitivement
 * l'authentification basique pour la soumission SMTP dans Exchange Online
 * (extinction progressive à partir du 1er mars 2026, achevée le 30 avril 2026).
 * Les mots de passe d'application ne fonctionnent plus. Microsoft Graph est la
 * méthode recommandée pour qu'une application envoie du courrier depuis une
 * boîte Microsoft 365.
 *
 * Deux messages sont émis :
 *   1. la notification interne, qui contient la demande ;
 *   2. l'accusé de réception au prospect, qui ne reprend AUCUN élément de sa
 *      demande — un e-mail transite en clair et peut arriver dans une boîte
 *      partagée.
 *
 * Si l'application n'est pas configurée, la fonction échoue explicitement.
 * Elle ne fait jamais croire à un succès : l'utilisateur doit savoir que sa
 * demande n'est pas partie.
 */

type Resultat = { succes: true } | { succes: false; raison: string };

const echapper = (valeur: string): string =>
  valeur
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// ── Jeton d'accès ─────────────────────────────────────────────────────────

/**
 * Le jeton est valable une heure. Le conserver en mémoire évite un
 * aller-retour vers Microsoft Entra à chaque envoi. La marge de 60 secondes
 * écarte le cas d'un jeton qui expirerait pendant la requête.
 */
let jetonEnCache: { valeur: string; expireA: number } | null = null;

async function obtenirJeton(
  locataire: string,
  identifiantClient: string,
  secretClient: string,
): Promise<{ jeton: string } | { erreur: string }> {
  if (jetonEnCache && jetonEnCache.expireA > Date.now() + 60_000) {
    return { jeton: jetonEnCache.valeur };
  }

  const reponse = await fetch(
    `https://login.microsoftonline.com/${encodeURIComponent(locataire)}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: identifiantClient,
        client_secret: secretClient,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    },
  );

  if (!reponse.ok) {
    // Le corps de la réponse peut contenir des indications de configuration,
    // jamais de donnée personnelle : il est utile au diagnostic.
    const detail = await reponse.text().catch(() => "");
    return {
      erreur: `Authentification Microsoft refusée (HTTP ${reponse.status}) ${detail.slice(0, 200)}`,
    };
  }

  const donnees = (await reponse.json()) as {
    access_token?: string;
    expires_in?: number;
  };

  if (!donnees.access_token) {
    return { erreur: "Réponse d'authentification Microsoft sans jeton." };
  }

  jetonEnCache = {
    valeur: donnees.access_token,
    expireA: Date.now() + (donnees.expires_in ?? 3600) * 1000,
  };

  return { jeton: donnees.access_token };
}

// ── Envoi ─────────────────────────────────────────────────────────────────

type Message = {
  destinataires: string[];
  sujet: string;
  html: string;
  repondreA?: string;
};

async function envoyerViaGraph(
  jeton: string,
  boiteExpeditrice: string,
  message: Message,
): Promise<{ ok: true } | { ok: false; raison: string }> {
  const reponse = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(boiteExpeditrice)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jeton}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: message.sujet,
          body: { contentType: "HTML", content: message.html },
          toRecipients: message.destinataires.map((adresse) => ({
            emailAddress: { address: adresse },
          })),
          ...(message.repondreA
            ? { replyTo: [{ emailAddress: { address: message.repondreA } }] }
            : {}),
        },
        saveToSentItems: true,
      }),
    },
  );

  // Graph répond 202 Accepted lorsque le message est pris en charge.
  if (reponse.status !== 202) {
    const detail = await reponse.text().catch(() => "");
    return {
      ok: false,
      raison: `Graph sendMail (HTTP ${reponse.status}) ${detail.slice(0, 200)}`,
    };
  }

  return { ok: true };
}

export async function envoyerEmails(donnees: DonneesContact): Promise<Resultat> {
  const locataire = process.env.MS_TENANT_ID;
  const identifiantClient = process.env.MS_CLIENT_ID;
  const secretClient = process.env.MS_CLIENT_SECRET;
  const boiteExpeditrice = process.env.MS_BOITE_EXPEDITRICE;
  const destinataire = process.env.EMAIL_DESTINATAIRE;

  if (
    !locataire ||
    !identifiantClient ||
    !secretClient ||
    !boiteExpeditrice ||
    !destinataire
  ) {
    return {
      succes: false,
      raison:
        "Envoi Microsoft 365 non configuré (MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, MS_BOITE_EXPEDITRICE ou EMAIL_DESTINATAIRE manquant).",
    };
  }

  const authentification = await obtenirJeton(
    locataire,
    identifiantClient,
    secretClient,
  ).catch((erreur: Error) => ({ erreur: erreur.message }));

  if ("erreur" in authentification) {
    return { succes: false, raison: authentification.erreur };
  }

  const { jeton } = authentification;

  // ── 1. Notification interne ────────────────────────────────────────────
  const lignes: [string, string][] = [
    ["Nom", donnees.nom],
    ["Entreprise", donnees.entreprise || "—"],
    ["E-mail", donnees.email],
    ["Téléphone", donnees.telephone || "—"],
    ["Objet", donnees.objet],
    ["Rappel souhaité par", donnees.canalRappel],
  ];

  const notification = `
    <h2 style="font-family:Georgia,serif">Nouvelle demande depuis le site</h2>
    <table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">
      ${lignes
        .map(
          ([libelle, valeur]) =>
            `<tr><th align="left" style="padding:4px 12px 4px 0;color:#546a77">${libelle}</th><td style="padding:4px 0">${echapper(valeur)}</td></tr>`,
        )
        .join("")}
    </table>
    <h3 style="font-family:Georgia,serif">Message</h3>
    <p style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap">${echapper(donnees.message)}</p>
  `;

  const envoiInterne = await envoyerViaGraph(jeton, boiteExpeditrice, {
    destinataires: destinataire.split(",").map((adresse) => adresse.trim()),
    sujet: `Site — ${donnees.objet} — ${donnees.nom}`,
    html: notification,
    // Répondre au message ouvre directement une réponse au prospect.
    repondreA: donnees.email,
  }).catch((erreur: Error) => ({ ok: false as const, raison: erreur.message }));

  if (!envoiInterne.ok) {
    return { succes: false, raison: `Notification interne : ${envoiInterne.raison}` };
  }

  // ── 2. Accusé de réception ─────────────────────────────────────────────
  // Sans reprise du contenu de la demande, volontairement.
  const accuse = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#0c1f2c">
      <p>Bonjour,</p>
      <p>Nous avons bien reçu votre demande adressée au cabinet ${CABINET.nom}.
      Un membre du cabinet vous recontactera par ${donnees.canalRappel.toLowerCase()}.</p>
      <p>Ce message confirme simplement la réception de votre demande ; il n'en
      reprend pas le contenu.</p>
      <p style="color:#546a77;font-size:14px">
        ${CABINET.nom} — ${adresseUneLigne()}<br>
        ${CABINET.telephone.valeur.affichage}
      </p>
    </div>
  `;

  const envoiAccuse = await envoyerViaGraph(jeton, boiteExpeditrice, {
    destinataires: [donnees.email],
    sujet: `${CABINET.nom} — réception de votre demande`,
    html: accuse,
  }).catch((erreur: Error) => ({ ok: false as const, raison: erreur.message }));

  // L'accusé de réception est secondaire : son échec ne doit pas faire croire
  // au prospect que sa demande n'est pas parvenue au cabinet.
  if (!envoiAccuse.ok) {
    console.error("[contact] accusé de réception non envoyé :", envoiAccuse.raison);
  }

  return { succes: true };
}
