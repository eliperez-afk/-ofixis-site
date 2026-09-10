import Link from "next/link";
import type { Metadata } from "next";
import {
  articlesPublies,
  categoriesUtilisees,
  formaterDate,
} from "@/lib/actualites";
import { Conteneur } from "@/components/conteneur";
import { FilAriane } from "@/components/fil-ariane";
import { BlocCta } from "@/components/bloc-cta";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  titre: "Actualités comptables, fiscales et sociales",
  description:
    "Analyses et repères sur l'actualité comptable, fiscale, sociale et juridique, à destination des dirigeants d'entreprise et des professions libérales.",
  chemin: "/actualites",
});

type Props = { searchParams: Promise<{ theme?: string }> };

export default async function PageActualites({ searchParams }: Props) {
  const { theme } = await searchParams;
  const articles = articlesPublies();
  const categories = categoriesUtilisees();

  const filtres =
    theme && categories.includes(theme)
      ? articles.filter((article) => article.categorie === theme)
      : articles;

  return (
    <>
      <Conteneur taille="large">
        <div className="py-8">
          <FilAriane elements={[{ libelle: "Actualités", href: "/actualites" }]} />
        </div>

        <div className="max-w-2xl pb-10">
          <h1 className="font-titre text-4xl sm:text-5xl">Actualités</h1>
          <p className="mt-5 text-lg text-ardoise-700">
            Des repères sur ce qui change en matière comptable, fiscale, sociale
            et juridique. Chaque article indique ses sources, sa date de
            publication et la personne du cabinet qui l&apos;a relu.
          </p>
        </div>

        {/* Filtres par thème — affichés seulement s'il y a de quoi filtrer. */}
        {categories.length > 1 && (
          <nav aria-label="Filtrer par thème" className="pb-10">
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link
                  href="/actualites"
                  aria-current={!theme ? "true" : undefined}
                  className={`inline-block rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    !theme
                      ? "border-encre bg-encre text-white"
                      : "border-bordure text-ardoise-700 hover:border-laiton hover:text-laiton"
                  }`}
                >
                  Tous les thèmes
                </Link>
              </li>
              {categories.map((categorie) => (
                <li key={categorie}>
                  <Link
                    href={`/actualites?theme=${encodeURIComponent(categorie)}`}
                    aria-current={theme === categorie ? "true" : undefined}
                    className={`inline-block rounded-full border px-4 py-1.5 text-sm transition-colors ${
                      theme === categorie
                        ? "border-encre bg-encre text-white"
                        : "border-bordure text-ardoise-700 hover:border-laiton hover:text-laiton"
                    }`}
                  >
                    {categorie}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {filtres.length === 0 ? (
          /* État vide assumé : mieux qu'un contenu de remplissage. */
          <div className="mb-20 rounded-carte border border-bordure bg-white p-8">
            <h2 className="font-titre text-xl">
              Les premiers articles sont en préparation
            </h2>
            <p className="mt-3 max-w-xl text-ardoise-700">
              Nous préférons publier peu et juste. Chaque article est rédigé à
              partir de sources officielles, relu par un professionnel du
              cabinet, daté et revu périodiquement.
            </p>
            <p className="mt-3 max-w-xl text-ardoise-700">
              En attendant, une question précise trouve souvent sa réponse en un
              échange de quelques minutes.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-douce border border-encre px-5 py-3 font-medium text-encre transition-colors hover:bg-craie-ombre"
            >
              Poser votre question
            </Link>
          </div>
        ) : (
          <ul className="mb-20 divide-y divide-bordure border-y border-bordure">
            {filtres.map((article) => (
              <li key={article.slug}>
                <article className="py-8">
                  <p className="text-xs font-semibold uppercase tracking-wide text-laiton">
                    {article.categorie}
                  </p>
                  <h2 className="mt-2 font-titre text-2xl leading-snug">
                    <Link
                      href={`/actualites/${article.slug}`}
                      className="hover:text-laiton"
                    >
                      {article.titre}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-2xl text-ardoise-700">
                    {article.chapo}
                  </p>
                  <p className="mt-4 text-sm text-ardoise-500">
                    <time dateTime={article.publieLe}>
                      {formaterDate(article.publieLe)}
                    </time>
                    {article.misAJourLe && (
                      <>
                        {" "}
                        · Mis à jour le{" "}
                        <time dateTime={article.misAJourLe}>
                          {formaterDate(article.misAJourLe)}
                        </time>
                      </>
                    )}{" "}
                    · {article.dureeLecture} min de lecture
                  </p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </Conteneur>

      <BlocCta
        titre="Une question sur votre situation ?"
        texte="Les articles donnent des repères généraux. Votre cas particulier mérite une réponse qui lui corresponde."
      />
    </>
  );
}
