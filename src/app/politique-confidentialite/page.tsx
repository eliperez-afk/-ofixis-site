import type { Metadata } from "next";
import { CABINET, adresseUneLigne } from "@/config/cabinet";
import { Conteneur } from "@/components/conteneur";
import { FilAriane } from "@/components/fil-ariane";
import { Valeur } from "@/components/valeur-a-confirmer";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  titre: "Politique de confidentialité",
  description:
    "Traitement des données personnelles collectées sur le site du cabinet OFIXIS : finalités, base légale, durées de conservation et exercice de vos droits.",
  chemin: "/politique-confidentialite",
});

/**
 * ⚠ Ce texte doit être validé juridiquement avant mise en production.
 * Il décrit fidèlement ce que fait le site tel qu'il est développé — aucune
 * finalité n'y est déclarée qui ne corresponde à un traitement réel.
 */
export default function PagePolitiqueConfidentialite() {
  const utiliseMesureAudience = Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAINE);

  return (
    <Conteneur taille="etroite">
      <div className="py-8">
        <FilAriane
          elements={[
            {
              libelle: "Politique de confidentialité",
              href: "/politique-confidentialite",
            },
          ]}
        />
      </div>

      <div className="pb-20">
        <h1 className="font-titre text-4xl">Politique de confidentialité</h1>

        <div className="prose-ofixis mt-10">
          <p>
            Cette page décrit la manière dont le cabinet {CABINET.nom} traite les
            données personnelles collectées par ce site.
          </p>

          <h2>Responsable de traitement</h2>
          <p>
            Le responsable de traitement est <Valeur donnee={CABINET.legal.raisonSociale} />,
            dont le siège est situé {adresseUneLigne()}.
          </p>
          <p>
            Adresse pour l&apos;exercice de vos droits :{" "}
            <Valeur donnee={CABINET.rgpd.adresseExerciceDroits} />.
          </p>

          <h2>Quelles données sont collectées</h2>
          <p>
            Seules les données que vous saisissez volontairement dans le
            formulaire de contact sont collectées : nom et prénom, nom de
            l&apos;entreprise le cas échéant, adresse e-mail, numéro de
            téléphone si vous le renseignez, objet de la demande, contenu du
            message et canal de rappel souhaité.
          </p>
          <p>
            Le formulaire ne permet pas de joindre de document. Il vous est
            expressément demandé de ne transmettre aucune donnée confidentielle
            ni aucune pièce comptable par ce canal.
          </p>

          <h2>Finalités et base légale</h2>
          <ul>
            <li>
              <strong>Répondre à votre demande</strong> — base légale : votre
              consentement, recueilli par la case à cocher du formulaire, et
              l&apos;intérêt légitime du cabinet à traiter les sollicitations
              qui lui sont adressées.
            </li>
            <li>
              <strong>Assurer la sécurité du formulaire</strong> — base légale :
              l&apos;intérêt légitime du cabinet à se prémunir contre les envois
              automatisés.
            </li>
          </ul>
          <p>
            Vos données ne sont utilisées à aucune fin de prospection
            commerciale, ne sont ni cédées ni revendues, et ne font
            l&apos;objet d&apos;aucune décision automatisée.
          </p>

          <h2>Destinataires</h2>
          <p>
            Vos données sont accessibles aux seuls membres du cabinet chargés de
            traiter les demandes entrantes. Elles sont transmises à notre
            prestataire d&apos;envoi d&apos;e-mails, qui agit en qualité de
            sous-traitant et n&apos;est pas autorisé à les utiliser à
            d&apos;autres fins.
          </p>

          <h2>Durée de conservation</h2>
          <p>
            Les demandes n&apos;ayant pas donné suite à une relation
            contractuelle sont conservées{" "}
            <Valeur donnee={CABINET.rgpd.conservationProspects} />. Lorsque la
            demande débouche sur une mission, les données sont conservées dans le
            cadre du dossier client, selon les durées légales applicables.
          </p>

          <h2>Vos droits</h2>
          <p>
            Vous disposez d&apos;un droit d&apos;accès, de rectification,
            d&apos;effacement, de limitation et d&apos;opposition, ainsi que
            d&apos;un droit à la portabilité de vos données. Vous pouvez retirer
            votre consentement à tout moment.
          </p>
          <p>
            Pour exercer ces droits, écrivez à{" "}
            <Valeur donnee={CABINET.email} /> ou à l&apos;adresse postale du
            cabinet. Si vous estimez que vos droits ne sont pas respectés, vous
            pouvez introduire une réclamation auprès de la CNIL
            (www.cnil.fr).
          </p>

          <h2>Cookies et traceurs</h2>
          {utiliseMesureAudience ? (
            <>
              <p>
                Ce site utilise une mesure d&apos;audience configurée sans
                cookie : aucune information n&apos;est stockée sur votre
                appareil et aucun identifiant permettant de vous suivre
                d&apos;un site à l&apos;autre n&apos;est créé. Les données
                collectées sont agrégées et ne permettent pas de vous
                identifier.
              </p>
              <p>
                Ce dispositif relevant des traitements exemptés de consentement,
                aucun bandeau ne vous est imposé.
              </p>
            </>
          ) : (
            <p>
              Ce site ne dépose aucun cookie et n&apos;utilise aucun traceur.
              Aucun outil de mesure d&apos;audience, de publicité ou de réseau
              social n&apos;y est intégré. C&apos;est la raison pour laquelle
              aucun bandeau de consentement ne vous est présenté.
            </p>
          )}
          <p>
            Si un traceur soumis à consentement devait être ajouté
            ultérieurement, un dispositif de recueil du consentement serait mis
            en place, permettant de refuser aussi simplement que d&apos;accepter,
            et de revenir sur votre choix à tout moment.
          </p>

          <h2>Sécurité</h2>
          <p>
            Le site est servi exclusivement en HTTPS. Les données transmises par
            le formulaire ne sont pas stockées en base de données : elles sont
            transmises par e-mail aux personnes chargées d&apos;y répondre. Le
            contenu des messages n&apos;est pas inscrit dans les journaux
            techniques du site.
          </p>

          <h2>Mise à jour</h2>
          <p>
            Cette politique peut être modifiée pour tenir compte des évolutions
            du site ou de la réglementation.
          </p>
        </div>
      </div>
    </Conteneur>
  );
}
