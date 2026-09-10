import type { Metadata } from "next";
import { CABINET } from "@/config/cabinet";
import { Conteneur } from "@/components/conteneur";
import { FilAriane } from "@/components/fil-ariane";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  titre: "Accessibilité",
  description:
    "Démarche d'accessibilité du site du cabinet OFIXIS : objectifs, mesures mises en œuvre et moyen de signaler une difficulté.",
  chemin: "/accessibilite",
});

export default function PageAccessibilite() {
  return (
    <Conteneur taille="etroite">
      <div className="py-8">
        <FilAriane
          elements={[{ libelle: "Accessibilité", href: "/accessibilite" }]}
        />
      </div>

      <div className="pb-20">
        <h1 className="font-titre text-4xl">Accessibilité</h1>

        <div className="prose-ofixis mt-10">
          <p>
            Ce site a été conçu pour être consultable par le plus grand nombre,
            quels que soient le matériel, le navigateur ou les aides techniques
            utilisés.
          </p>

          <h2>Niveau visé</h2>
          <p>
            Le site vise le niveau AA des règles pour l&apos;accessibilité des
            contenus web (WCAG 2.2). Ce niveau n&apos;a pas fait l&apos;objet
            d&apos;un audit de conformité par un organisme tiers : nous
            annonçons donc un objectif tenu par construction, pas une
            certification.
          </p>

          <h2>Mesures mises en œuvre</h2>
          <ul>
            <li>Structure de titres hiérarchisée sur chaque page</li>
            <li>Navigation complète au clavier et indicateur de focus visible</li>
            <li>Lien d&apos;évitement vers le contenu principal</li>
            <li>Contrastes de couleurs conformes au niveau AA</li>
            <li>Texte courant à 17 pixels, redimensionnable jusqu&apos;à 200 % sans perte d&apos;information</li>
            <li>Champs de formulaire dotés d&apos;étiquettes visibles et de messages d&apos;erreur explicites</li>
            <li>Aucun défilement horizontal, de 320 pixels de large aux grands écrans</li>
            <li>Animations réduites lorsque le système le demande</li>
            <li>Aucune fenêtre surgissante, aucun carrousel automatique</li>
          </ul>

          <h2>Limites connues</h2>
          <p>
            Aucune limite n&apos;est identifiée à ce jour. Si des contenus tiers
            venaient à être intégrés — agenda de réservation, carte
            interactive —, leur accessibilité dépendrait en partie de leur
            éditeur : une solution de remplacement accessible serait alors
            systématiquement proposée.
          </p>

          <h2>Signaler une difficulté</h2>
          <p>
            Si vous rencontrez un obstacle pour accéder à un contenu ou à une
            fonctionnalité, écrivez-nous à {CABINET.email.valeur} ou appelez le{" "}
            {CABINET.telephone.valeur.affichage}. Nous vous répondrons et
            chercherons à vous fournir l&apos;information par un autre moyen.
          </p>
        </div>
      </div>
    </Conteneur>
  );
}
