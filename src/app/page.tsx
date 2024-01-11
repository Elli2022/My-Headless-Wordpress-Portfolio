import React from "react";
import Link from "next/link";
import PaginationControls from "./components/PaginationControls";
import Footer from "./components/Footer";
import FilterCategory from "./components/FilterCategory";
import FreelanceSection from "./components/FreelanceSection";
import Header from "./components/Header";
import getHome from "@/pages/queries/getHome";
import getPages from "@/pages/queries/getPages";
import getPosts from "@/pages/queries/getPosts";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Hantering av sökparametrar för sidnummer och antal poster per sida.
  const page = Array.isArray(searchParams["page"])
    ? searchParams["page"][0]
    : searchParams["page"] ?? "1";
  const perPage = Array.isArray(searchParams["per_page"])
    ? searchParams["per_page"][0]
    : searchParams["per_page"] ?? "6";

  // Hantering av kategori-ID från sökparametrar.
  const categoryId = Array.isArray(searchParams["categoryId"])
    ? searchParams["categoryId"][0]
    : searchParams["categoryId"];

  // Hämtning av inlägg, kategorier och sidinformation från API.
  const { posts, categories, pageInfo } = await getPosts(
    Number(page) || 1,
    Number(perPage) || 6,
    searchParams["after"] as string,
    searchParams["before"] as string,
    categoryId
  );

  // Hämtning av ytterligare data för hemsidan och navigationslänkar.
  const data = await getHome("/home");
  const navlinks = await getPages();
  const navHits = Object.values(navlinks.edges).map((hit: any) => hit.node);

  // Skapande av huvudlänkar för navigering.
  const mainLinks = {
    portfolio: navHits.find((hit: any) => hit.title === "Portfolio."),
    about: navHits.find((hit: any) => hit.title === "about me."),
    contact: navHits.find((hit: any) => hit.title === "contact."),
  };

  // Filtrering av inlägg baserat på vald kategori.
  let filteredPosts = posts;
  if (categoryId) {
    const categoryMatch = categories.find(
      (category: { databaseId: any }) => category.databaseId === categoryId
    );
    if (categoryMatch) {
      filteredPosts = posts.filter(
        (post: { categoryDatabaseId: any }) =>
          post.categoryDatabaseId === categoryId
      );
    }
  }
  const hasPosts = filteredPosts.length > 0;

  // Huvudrenderingslogik.
  return (
    <main className="min-h-screen bg-gradient-to-b text-black p-4 md:p-15">
      {/* Navigationsmeny */}
      <nav className="flex justify-between items-center">
        {/* Vänster navigationslänk */}
        <div className="nav-left font-bold">
          {/* Renderar Portfolio-länken om den finns */}
          {mainLinks.portfolio && (
            <a
              key={mainLinks.portfolio.id}
              href={mainLinks.portfolio.uri}
              className="link"
            >
              {mainLinks.portfolio.title}
            </a>
          )}
        </div>

        {/* Höger navigationslänkar */}
        <div className="nav-right flex">
          {/* Renderar Om Oss- och Kontakta Oss-länkar om de finns */}
          {mainLinks.about && (
            <a
              key={mainLinks.about.id}
              href={mainLinks.about.uri}
              className="font-bold no-underline text-base ml-2.5"
            >
              {mainLinks.about.title}
            </a>
          )}
          {mainLinks.contact && (
            <a
              key={mainLinks.contact.id}
              href={mainLinks.contact.uri}
              className="font-bold no-underline text-base ml-2.5"
            >
              {mainLinks.contact.title}
            </a>
          )}
        </div>
      </nav>

      <Header
        titleHtml={data?.homePage.homePageTitle.replace("fueled", "fueled<br>")}
        presentingText={data?.homePage.presentingText}
      />
      {/* Knapp och länkar för utforskning */}
      <div className="text-center mt-7">
        <a
          href={data?.homePage.buttonUrl}
          className="py-2.5 px-6 bg-blue-500 text-white uppercase rounded-full cursor-pointer no-underline text-base transition-colors duration-300 ease inline-block mt-5 mb-40"
        >
          {data?.homePage.buttonText}
        </a>
      </div>

      {/* Kategorifilter */}
      <FilterCategory categories={categories} />

      {/* Inläggskontainer */}
      <div className="grid grid-cols-3 gap-4 mb-16">
        {/* Konditionell rendering av inlägg eller ett meddelande om inga inlägg finns */}
        {hasPosts ? (
          filteredPosts.map((post: any) => (
            <div key={post.id} className="w-full pb-[100%] relative mb-20">
              <Link href={`/projects/${post.slug}`}>
                <img
                  src={post.featuredImage.node.mediaItemUrl}
                  alt={post.title}
                  className="absolute w-full h-full object-cover mb-40 mb-[-5rem]"
                />
                <div className="absolute w-full bottom-0 mb-[-5rem] p-4 bg-white flex flex-col items-center justify-center">
                  <p className="text-xs md:text-sm lg:text-base text-gray-500 uppercase tracking-wide mb-2">
                    {post.PostInfo.subtitle}
                  </p>
                  <h2 className="text-lg font text-center">{post.title}</h2>
                </div>
              </Link>
            </div>
          ))
        ) : (
          // Meddelande om inga inlägg - centreras på skärmen
          <div className="flex justify-center items-center h-full">
            <p className="text-center text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold uppercase">
              Inga inlägg hittades under den valda kategorin.
            </p>
          </div>
        )}
      </div>

      {/* Pagineringskontroller */}
      <PaginationControls
        hasNextPage={pageInfo.hasNextPage}
        hasPrevPage={Number(page) > 1}
        endCursor={pageInfo.endCursor}
        startCursor={pageInfo.startCursor}
        data={undefined}
        beforeCursor={""}
        posts={""}
      />

      {/* Frilanssektion */}
      <FreelanceSection
        freelanceTitle={data?.homePage.freelanceProjects.freelanceTitle}
        freelanceDescription={
          data?.homePage.freelanceProjects.freelanceDescription
        }
        freelanceContactUrl={
          data?.homePage.freelanceProjects.freelanceContactUrl
        }
        freelanceProjectsButton={
          data?.homePage.freelanceProjects.freelanceProjectsButton
        }
      />

      {/* Sidfot */}
      <Footer />
    </main>
  );
}
