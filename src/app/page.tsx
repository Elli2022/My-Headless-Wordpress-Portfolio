// src/app/page.tsx
import React from "react";
import Link from "next/link";
import getHome from "@/pages/queries/getHome";
import getPages from "@/pages/queries/getPages";
import getPosts from "@/pages/queries/getPosts";
import PaginationControls from "./components/PaginationControls";
import Footer from "./components/Footer";
import getCategories from "@/pages/queries/getCategories";
import FilterCategory from "./components/FilterCategory";

interface Post {
  id: string;
  title: string;
  content: string;
  featuredImage?: {
    node: {
      mediaItemUrl: string;
      slug: string;
    };
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Om 'page' och 'per_page' är arrays, använd första värdet. Annars, använd värdet direkt.
  const page = Array.isArray(searchParams["page"])
    ? searchParams["page"][0]
    : searchParams["page"] ?? "1";
  const perPage = Array.isArray(searchParams["per_page"])
    ? searchParams["per_page"][0]
    : searchParams["per_page"] ?? "6";

  // Hantera 'after' på samma sätt
  const endCursor = Array.isArray(searchParams["after"])
    ? searchParams["after"][0]
    : searchParams["after"] ?? "";
  const beforeCursor = Array.isArray(searchParams["before"])
    ? searchParams["before"][0]
    : searchParams["before"] ?? "";
  const { posts, pageInfo } = await getPosts(
    Number(page),
    Number(perPage),
    endCursor,
    beforeCursor

    
  );



  // Debugging: Log the posts array
  console.log("Posts:", posts);

  // Debugging: Log the slug of each post
  console.log(
    "Post slugs:",
    posts.map((post: any) => post.slug)
  );

  // Hämtar data...
  const data = await getHome("/home");
  console.log("Home data:", data);

  const navlinks = await getPages();
  console.log("Navigation links:", navlinks);

  const postsData = await getPosts();
  console.log("PostData:", postsData);

  const navHits = Object.values(navlinks.edges).map((hit: any) => hit.node);
  console.log("Navhits: ", navHits);

 const categories = await getCategories();
  console.log("Categories: ", categories);

  // Identifiera länkar för "Portfolio", "About", och "Contact"
  const mainLinks = {
    portfolio: navHits.find((hit: any) => hit.title === "Portfolio."),
    about: navHits.find((hit: any) => hit.title === "about me."),
    contact: navHits.find((hit: any) => hit.title === "contact."),
  };

  // Filtrera ut dessa specifika länkar så att de inte renderas igen senare
  const otherLinks = navHits.filter(
    (hit: any) => !["Portfolio.", "about me.", "contact."].includes(hit.title)
  );

  // Debugging: Log the slug of each post
  console.log(
    "Post slugs:",
    posts.map((post: any) => post.slug)
  );

  
  

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d6dbdc] to-white text-black p-4 md:p-15">
      {/* Navigationsmenyn */}
      <nav className="flex justify-between items-center">
        {/* Vänster länk */}
        <div className="nav-left font-bold">
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

        {/* Höger länkar */}
        <div className="nav-right flex">
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

      {/* Header-sektionen */}
      <header className="text-center mt-40">
        <p className="mt-4">{data?.homePage.presentingText}</p>
        <h1
          className="text-5xl font-bold"
          dangerouslySetInnerHTML={{
            __html: data?.homePage.homePageTitle.replace(
              "fueled",
              "fueled<br>"
            ),
          }}
        ></h1>
      </header>

      {/* "Explore Works"-knappen och andra länkar */}
      <div className="text-center mt-7">
        <a
          href={data?.homePage.buttonUrl}
          className="py-2.5 px-6 bg-blue-500 text-white uppercase rounded-full cursor-pointer no-underline text-base transition-colors duration-300 ease inline-block mt-5 mb-40"
        >
          {data?.homePage.buttonText}
        </a>
        <div className="other-links-container">
          {otherLinks.map((link: any) => (
            <a
              key={link.id}
              href={link.uri}
              className="link inline-block mx-2 my-2 font-bold mb-10"
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>

      <FilterCategory categories={categories} />
      {/* Inläggen */}
      {/* Posts Container */}
      <div className="grid grid-cols-3 gap-4 mb-16">
        {posts.map((post: any) => (
          <div key={post.id} className="w-full pb-[100%] relative mb-16">
            <Link href={`/projects/${post.slug}`}>
              <img
                src={post.featuredImage.node.mediaItemUrl}
                alt={post.title}
                className="absolute w-full h-full object-cover mb-40"
              />
              <div className="absolute w-full bottom-0 mb-[-5rem] p-4 bg-white flex flex-col items-center justify-center">
                <h2 className="text-lg font-bold text-center">{post.title}</h2>
                <p>{post.PostInfo.subtitle}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <PaginationControls
        hasNextPage={pageInfo.hasNextPage}
        hasPrevPage={Number(page) > 1}
        endCursor={pageInfo.endCursor}
        startCursor={pageInfo.startCursor}
        data={undefined}
        beforeCursor={""}
        posts={""} 
      />

      {/* Freelance-projektsektionen */}
      <div className="mt-4 text-center">
        <p className="text-xs font-semibold">
          {data?.homePage.freelanceProjects.freelanceTitle}
        </p>
        <br />
        <h3 className="text-4xl font-semibold">
          {data?.homePage.freelanceProjects.freelanceDescription}
        </h3>
        
        <a
          href={data?.homePage.freelanceProjects.freelanceContactUrl}
          className="py-2.5 px-6 bg-blue-500 text-white uppercase rounded-full cursor-pointer no-underline text-base transition-colors duration-300 ease inline-block mt-5">
          {data?.homePage.freelanceProjects.freelanceProjectsButton}
        </a>
      </div>
      <Footer />
    </main>
  );
}
