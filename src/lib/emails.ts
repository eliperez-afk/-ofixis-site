import { CABINET, adresseUneLigne } from "@/config/cabinet";
import type { DonneesContact } from "./validation";

/**
 * Envoi des e-mails liés au formulaire de contact.
 *
 * Deux messages sont émis :
 *   1. la notification interne, qui contient la demande ;
 *   2. l'accusé de réception au prospect, qui ne reprend AUCUN élément de sa
 *      demande — un e-mail transite en clair et peut arriver dans une boîte
 *      partagée.
 *
 * Si le service d'envoi n'est pas configuré, la fonction échoue explicitement.
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

export async function envoyerEmails(donnees: DonneesContact): Promise<Resultat> {
  const cle = process.env.RESEND_API_KEY;
  const expediteur = process.env.EMAIL_EXPEDITEUR;
  const destinataire = process.env.EMAIL_DESTINATAIRE;

  if (!cle || !expediteur || !destinataire) {
    return {
      succes: false,
      raison:
        "Service d'envoi non configuré (RESEND_API_KEY, EMAIL_EXPEDITEUR ou EMAIL_DESTINATAIRE manquant).",
    };
  }

  const envoyer = async (charge: Record<string, unknown>): Promise<Response> =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cle}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(charge),
    });

  // ── 1. Notification interne ────────────────────────────────────────────
  const lignes = [
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
            `<tr><th align="left" style="padding:4px 12px 4px 0;color:#5c7482">${libelle}</th><td style="padding:4px 0">${echapper(String(valeur))}</td></tr>`,
        )
        .join("")}
    </table>
    <h3 style="font-family:Georgia,serif">Message</h3>
    <p style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap">${echapper(donnees.message)}</p>
  `;

  try {
    const reponse = await envoyer({
      from: expediteur,
      to: destinataire.split(",").map((adresse) => adresse.trim()),
      reply_to: donnees.email,
      subject: `Site — ${donnees.objet} — ${donnees.nom}`,
      html: notification,
    });

    if (!reponse.ok) {
      return {
        succes: false,
        raison: `Notification interne refusée (HTTP ${reponse.status}).`,
      };
    }
  } catch (erreur) {
    return {
      succes: false,
      raison: `Notification interne : ${(erreur as Error).message}`,
    };
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
      <p style="color:#5c7482;font-size:14px">
        ${CABINET.nom} — ${adresseUneLigne()}<br>
        ${CABINET.telephone.valeur.affichage}
      </p>
    </div>
  `;

  try {
    const reponse = await envoyer({
      from: expediteur,
      to: [donnees.email],
      subject: `${CABINET.nom} — réception de votre demande`,
      html: accuse,
    });

    // L'accusé de réception est secondaire : son échec ne doit pas faire
    // croire au prospect que sa demande n'est pas parvenue au cabinet.
    if (!reponse.ok) {
      console.error(
        `[contact] accusé de réception non envoyé (HTTP ${reponse.status}).`,
      );
    }
  } catch (erreur) {
    console.error(
      "[contact] accusé de réception non envoyé :",
      (erreur as Error).message,
    );
  }

  return { succes: true };
}
