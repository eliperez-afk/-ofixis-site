import { NextResponse } from "next/server";
import { schemaContact } from "@/lib/validation";
import { limiteAtteinte } from "@/lib/limitation-debit";
import { CABINET } from "@/config/cabinet";
import { envoyerEmails } from "@/lib/emails";

/**
 * Réception du formulaire de contact.
 *
 * Ordre des contrôles : format, puis pièges anti-robots, puis limitation de
 * débit, puis envoi. Le principe directeur est qu'aucun succès n'est annoncé
 * tant que l'e-mail n'est pas effectivement parti.
 *
 * Journalisation : volontairement minimale. Ni le contenu du message, ni
 * l'adresse e-mail, ni le nom ne sont écrits dans les journaux.
 */

export const runtime = "nodejs";

/**
 * Traitement en région Paris.
 *
 * Les demandes transitent par cette fonction. La fixer sur `cdg1` maintient le
 * traitement des données du formulaire à l'intérieur de l'Union européenne,
 * alors que l'hébergeur est une société américaine. C'est ce que la politique
 * de confidentialité annonce.
 */
export const preferredRegion = "cdg1";

const DELAI_MINIMUM_MS = 3000;

export async function POST(requete: Request): Promise<NextResponse> {
  let corps: unknown;

  try {
    corps = await requete.json();
  } catch {
    return NextResponse.json(
      { message: "Requête illisible." },
      { status: 400 },
    );
  }

  const analyse = schemaContact.safeParse(corps);
  if (!analyse.success) {
    return NextResponse.json(
      {
        message:
          "Certains champs n'ont pas été acceptés. Merci de vérifier votre saisie.",
      },
      { status: 400 },
    );
  }

  const donnees = analyse.data;

  // Champ leurre rempli : requête automatisée. Réponse volontairement neutre.
  if (donnees.siteWeb) {
    return NextResponse.json({ message: "Requête rejetée." }, { status: 400 });
  }

  // Formulaire soumis en moins de trois secondes : comportement de robot.
  if (donnees.affichéÀ && Date.now() - donnees.affichéÀ < DELAI_MINIMUM_MS) {
    return NextResponse.json(
      { message: "Merci de prendre le temps de remplir le formulaire." },
      { status: 429 },
    );
  }

  const empreinte =
    requete.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requete.headers.get("x-real-ip") ??
    "inconnue";

  if (limiteAtteinte(empreinte)) {
    return NextResponse.json(
      {
        message:
          "Plusieurs demandes ont déjà été envoyées depuis cette connexion. Merci de patienter quelques minutes ou de nous appeler.",
      },
      { status: 429 },
    );
  }

  const resultat = await envoyerEmails(donnees);

  if (!resultat.succes) {
    // On journalise la cause technique, jamais le contenu de la demande.
    console.error("[contact] échec d'envoi :", resultat.raison);

    return NextResponse.json(
      {
        message: `Votre message n'a pas pu être envoyé. Merci de réessayer ou de nous appeler au ${CABINET.telephone.valeur.affichage}.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Message envoyé." }, { status: 200 });
}
