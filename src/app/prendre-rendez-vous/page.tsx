import Link from "next/link";
import type { Metadata } from "next";
import { CABINET } from "@/config/cabinet";
import { Conteneur } from "@/components/conteneur";
import { FilAriane } from "@/components/fil-ariane";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  titre: "Prendre rendez-vous",
  description:
    "Prenez rendez-vous avec le cabinet OFIXIS : au cabinet à Levallois-Perret, par téléphone ou en visioconférence.",
  chemin: "/prendre-rendez-vous",
});

/**
 * Page de prise de rendez-vous.
 *
 * L'intégration Microsoft Bookings n'est affichée que si son URL est
 * configurée. Tant qu'elle ne l'est pas, la page propose le téléphone et le
 * formulaire — jamais un agenda simulé ni des créneaux fictifs.
 *
 * Le choix retenu est le lien vers Bookings dans un nouvel onglet plutôt que
 * l'intégration en iframe : l'iframe Bookings dépose des cookies tiers, ajoute
 * plusieurs centaines de kilo-octets de JavaScript et son accessibilité au
 * clavier ne peut pas être corrigée depuis notre page. Ce choix pourra être
 * revu après essai réel de l'intégration.
 */
export default function PagePriseRendezVous() {
  const telephone = CABINET.telephone.valeur;
  const adresse = CABINET.adresse.valeur;
  const bookings = CABINET.liens.bookings;

  return (
    <Conteneur taille="large">
      <div className="py-8">
        <FilAriane
          elements={[
            { libelle: "Prendre rendez-vous", href: "/prendre-rendez-vous" },
          ]}
        />
      </div>

      <div className="max-w-2xl pb-12">
        <h1 className="font-titre text-4xl sm:text-5xl">Prendre rendez-vous</h1>
        <p className="mt-5 text-lg text-ardoise-700">
          Un premier échange permet de comprendre votre situation et de vous
          dire si nous sommes le bon interlocuteur. Il est sans engagement.
        </p>
      </div>

      <div className="grid gap-10 pb-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          {bookings ? (
            <div className="rounded-carte border border-bordure bg-white p-7">
              <h2 className="font-titre text-2xl">Choisir un créneau</h2>
              <p className="mt-3 text-ardoise-700">
                La réservation se fait sur notre agenda en ligne. Vous y
                choisissez le type de rendez-vous, la date et l&apos;heure, puis
                vous recevez une confirmation par e-mail — avec le lien de
                visioconférence si vous avez choisi cette formule.
              </p>
              <a
                href={bookings}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-douce bg-encre px-6 py-3.5 font-medium text-white transition-colors hover:bg-ardoise-900"
              >
                Ouvrir l&apos;agenda de réservation
                <span className="sr-only"> (nouvelle fenêtre)</span>
              </a>
              <p className="mt-3 text-sm text-ardoise-500">
                L&apos;agenda s&apos;ouvre dans un nouvel onglet. Horaires
                affichés sur le fuseau Europe/Paris.
              </p>
            </div>
          ) : (
            <div className="rounded-carte border border-bordure bg-white p-7">
              <h2 className="font-titre text-2xl">Nous appeler ou nous écrire</h2>
              <p className="mt-3 text-ardoise-700">
                Le rendez-vous se fixe par téléphone ou à partir du formulaire de
                contact. Indiquez vos disponibilités et la formule qui vous
                convient : nous vous confirmons le créneau.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${telephone.lien}`}
                  className="rounded-douce bg-encre px-6 py-3.5 text-center font-medium text-white transition-colors hover:bg-ardoise-900"
                >
                  Appeler le {telephone.affichage}
                </a>
                <Link
                  href="/contact"
                  className="rounded-douce border border-encre px-6 py-3.5 text-center font-medium text-encre transition-colors hover:bg-craie-ombre"
                >
                  Demander un rendez-vous
                </Link>
              </div>
            </div>
          )}

          <h2 className="mt-12 font-titre text-2xl">Trois formules</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-3">
            {[
              {
                titre: "Au cabinet",
                texte: `${adresse.rue}, ${adresse.codePostal} ${adresse.ville}.`,
              },
              {
                titre: "Par téléphone",
                texte: "Pratique pour un premier échange ou une question ciblée.",
              },
              {
                titre: "En visioconférence",
                texte:
                  "Un lien de connexion vous est transmis avec la confirmation.",
              },
            ].map((formule) => (
              <li
                key={formule.titre}
                className="rounded-carte border border-bordure bg-white p-5"
              >
                <h3 className="font-titre text-base">{formule.titre}</h3>
                <p className="mt-2 text-sm text-ardoise-700">{formule.texte}</p>
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit space-y-6">
          <div className="rounded-carte bg-craie-ombre p-6">
            <h2 className="font-titre text-lg">Ce qui est utile à préparer</h2>
            <p className="mt-2 text-sm text-ardoise-700">
              Rien n&apos;est obligatoire pour un premier échange. Si vous les
              avez sous la main, ces éléments nous permettent d&apos;être plus
              précis :
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ardoise-700">
              {[
                "La nature de votre activité et son ancienneté",
                "Votre forme juridique, si la société existe déjà",
                "Le nombre de salariés, le cas échéant",
                "Vos derniers comptes annuels, si vous en disposez",
              ].map((element) => (
                <li key={element} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-laiton-clair"
                  />
                  {element}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ardoise-500">
              N&apos;envoyez aucun document avant le rendez-vous : les échanges
              de pièces se font ensuite par voie sécurisée.
            </p>
          </div>
        </aside>
      </div>
    </Conteneur>
  );
}
