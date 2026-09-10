import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articlesPublies, trouverArticle, formaterDate } from "@/lib/actualites";
import { Conteneur } from "@/components/conteneur";
import { FilAriane } from "@/components/fil-ariane";
import { BlocCta } from "@/components/bloc-cta";
import { DonneesStructurees } from "@/components/donnees-structurees";
import { jsonLdArticle } from "@/lib/jsonld";
import { metadonnees } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articlesPublies().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = trouverArticle(slug);
  if (!article) return {};

  return metadonnees({
    titre: article.titre,
    description: article.chapo,
    chemin: `/actualites/${article.slug}`,
    type: "article",
    publieLe: article.publieLe,
    modifieLe: article.misAJourLe ?? undefined,
  });
}

export default async function PageArticle({ params }: Props) {
  const { slug } = await params;
  const article = trouverArticle(slug);
  if (!article) notFound();

  const autres = articlesPublies()
    .filter((autre) => autre.slug !== article.slug)
    .slice(0, 2);

  return (
    <>
      <Conteneur taille="etroite">
        <div className="py-8">
          <FilAriane
            elements={[
              { libelle: "Actualités", href: "/actualites" },
              { libelle: article.titre, href: `/actualites/${article.slug}` },
            ]}
          />
        </div>

        <article className="pb-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-wide text-laiton">
              {article.categorie}
            </p>
            <h1 className="mt-3 font-titre text-3xl leading-tight sm:text-4xl">
              {article.titre}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ardoise-700">
              {article.chapo}
            </p>

            <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-2 border-y border-bordure py-4 text-sm text-ardoise-500">
              <div className="flex gap-2">
                <dt>Publié le</dt>
                <dd className="text-ardoise-900">
                  <time dateTime={article.publieLe}>
                    {formaterDate(article.publieLe)}
                  </time>
                </dd>
              </div>
              {article.misAJourLe && (
                <div className="flex gap-2">
                  <dt>Mis à jour le</dt>
                  <dd className="text-ardoise-900">
                    <time dateTime={article.misAJourLe}>
                      {formaterDate(article.misAJourLe)}
                    </time>
                  </dd>
                </div>
              )}
              <div className="flex gap-2">
                <dt>Auteur</dt>
                <dd className="text-ardoise-900">{article.auteur}</dd>
              </div>
              <div className="flex gap-2">
                <dt>Relu par</dt>
                <dd className="text-ardoise-900">{article.relecteur}</dd>
              </div>
              <div className="flex gap-2">
                <dt>Lecture</dt>
                <dd className="text-ardoise-900">{article.dureeLecture} min</dd>
              </div>
            </dl>
          </header>

          {/* Sommaire, pour les articles suffisamment longs. */}
          {article.sommaire.length > 2 && (
            <nav aria-label="Sommaire" className="mt-8 rounded-carte bg-craie-ombre p-5">
              <h2 className="font-titre text-base">Sommaire</h2>
              <ol className="mt-3 space-y-1.5 text-sm">
                {article.sommaire.map((entree) => (
                  <li
                    key={entree.ancre}
                    className={entree.niveau === 3 ? "ml-4" : undefined}
                  >
                    <a
                      href={`#${entree.ancre}`}
                      className="text-ardoise-700 underline-offset-2 hover:text-laiton hover:underline"
                    >
                      {entree.titre}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div
            className="prose-ofixis mt-10"
            // Contenu Markdown provenant du dépôt, rédigé et relu par le cabinet.
            dangerouslySetInnerHTML={{ __html: article.html }}
          />

          {/* Sources primaires — exigence de traçabilité. */}
          {article.sources.length > 0 && (
            <section className="mt-12 rounded-carte border border-bordure bg-white p-6">
              <h2 className="font-titre text-lg">Sources</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {article.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-laiton underline underline-offset-2 hover:text-encre"
                    >
                      {source.libelle}
                      <span className="sr-only"> (nouvelle fenêtre)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Avertissement obligatoire sur tout contenu technique. */}
          <aside className="mt-8 rounded-carte bg-craie-ombre p-6 text-sm text-ardoise-700">
            <h2 className="font-titre text-base text-encre">
              Portée de cet article
            </h2>
            <p className="mt-2">
              Cet article présente des informations générales à jour à sa date de
              publication ou de dernière mise à jour. La réglementation évolue et
              chaque situation comporte ses particularités : ces informations ne
              remplacent pas une consultation adaptée à votre cas.
            </p>
          </aside>
        </article>
      </Conteneur>

      {autres.length > 0 && (
        <section className="border-t border-bordure bg-white py-14">
          <Conteneur taille="etroite">
            <h2 className="font-titre text-2xl">À lire également</h2>
            <ul className="mt-6 space-y-5">
              {autres.map((autre) => (
                <li key={autre.slug}>
                  <p className="text-xs uppercase tracking-wide text-laiton">
                    {autre.categorie}
                  </p>
                  <h3 className="mt-1 font-titre text-lg">
                    <Link
                      href={`/actualites/${autre.slug}`}
                      className="hover:text-laiton"
                    >
                      {autre.titre}
                    </Link>
                  </h3>
                </li>
              ))}
            </ul>
          </Conteneur>
        </section>
      )}

      <DonneesStructurees
        donnees={jsonLdArticle({
          titre: article.titre,
          description: article.chapo,
          chemin: `/actualites/${article.slug}`,
          publieLe: article.publieLe,
          modifieLe: article.misAJourLe ?? undefined,
          auteur: article.auteur,
        })}
      />

      <BlocCta
        titre="Cette question concerne votre entreprise ?"
        texte="Un échange permet de savoir comment elle s'applique à votre situation."
      />
    </>
  );
}
