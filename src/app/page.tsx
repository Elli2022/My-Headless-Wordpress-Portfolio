//src/app/page.tsx
import React from "react";
import Link from "next/link";
import PaginationControls from "./components/PaginationControls";
import FilterCategory from "./components/FilterCategory";
import FreelanceSection from "./components/FreelanceSection";
import Header from "./components/Header";
import PostContainer from "./components/PostContainer"; 
import ExploreButton from "./components/ExploreButton";
import Footer from "./components/Footer";
import getHome from "@/lib/queries/getHome";
import getPages from "@/lib/queries/getPages";
import getPosts from "@/lib/queries/getPosts";


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
    <main className="min-h-screen bg-gradient-to-b text-black p-4 md:p-15 mr-4 ">
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
      
      {/* ExploreButton med länk till Github */}
      <ExploreButton 
      buttonUrl={data?.homePage.buttonUrl} 
      buttonText={data?.homePage.buttonText} 
    />

      {/* Kategorifilter */}
      <FilterCategory categories={categories} />

      {/* Inläggskontainer */}
      <PostContainer hasPosts={hasPosts} filteredPosts={filteredPosts} />

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
      <Footer/>
    </main>
  );
}
