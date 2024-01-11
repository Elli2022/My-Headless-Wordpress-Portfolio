// src/app/page.tsx
import React from "react";
import Link from "next/link";
import PaginationControls from "./components/PaginationControls";
import Footer from "./components/Footer";
import FilterCategory from "./components/FilterCategory";
import getHome from "@/pages/queries/getHome";
import getPages from "@/pages/queries/getPages";
import getPosts from "@/pages/queries/getPosts";




interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  featuredImage?: {
    node: {
      mediaItemUrl: string;
      slug: string;
    };
  };
  slug?: string; 
  PostInfo?: {
    subtitle: string;
  };
  categories: any;
}

interface Category {
  databaseId: number;
  name: string;
  id: string;
}

interface HomeProps {
  posts: Post[];
  categories: Category[];
  data: any; // Ersätt 'any' med en lämplig typ för din data
  mainLinks: { [key: string]: any }; // Ersätt 'any' med en lämplig typ
  otherLinks: any[]; // Ersätt 'any' med en lämplig typ
  filteredPosts: any;
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
    // Hämta kategori-ID från searchParams
  const categoryId = Array.isArray(searchParams["categoryId"])
  ? searchParams["categoryId"][0]
  : searchParams["categoryId"];

  const name =  Array.isArray(searchParams["name"])
  ? searchParams["name"][0]
  : searchParams["name"] ?? "";

  const { posts, categories, pageInfo } = await getPosts(
    Number(searchParams["page"]) || 1,
    Number(searchParams["per_page"]) || 6,
    searchParams["after"] as string,
    searchParams["before"] as string,
    categoryId,
  
    
  );



  // Debugging: Log the posts array
  // console.log("Posts:", posts);

  // Debugging: Log the slug of each post
  console.log(
    "Post slugs:",
    posts.map((post: any) => post.slug)
  );

  console.log("Posts from API:", posts);
console.log("Categories from API:", categories);
  // Hämtar data...
  const data = await getHome("/home");
  // console.log("Home data:", data);

  const navlinks = await getPages();
  // console.log("Navigation links:", navlinks);

  const postsData = await getPosts();
  console.log("PostData:", postsData);

  const navHits = Object.values(navlinks.edges).map((hit: any) => hit.node);
  // console.log("Navhits: ", navHits);

 

  // Identifiera länkar för "Portfolio", "About", och "Contact"
  const mainLinks = {
    portfolio: navHits.find((hit: any) => hit.title === "Portfolio."),
    about: navHits.find((hit: any) => hit.title === "about me."),
    contact: navHits.find((hit: any) => hit.title === "contact."),
  };


  // Debugging: Log the slug of each post
  console.log(
    "Post slugs:",
    posts.map((post: any) => post.slug)
  );


console.log("Categories: ", categories);

// Hämta kategori-ID från searchParams
console.log("CategoryId:", categoryId);


// Filtrera inlägg baserat på kategori
let filteredPosts = posts;
if (categoryId) {
  const categoryMatch = categories.find((category: { databaseId: any; }) => category.databaseId === categoryId);
  if (categoryMatch) {
    // Antag att varje post har ett fält 'categoryDatabaseId'
    filteredPosts = posts.filter((post: { categoryDatabaseId: any; }) => post.categoryDatabaseId === categoryId);
  }
}

console.log(`Filtered Posts for Category ID ${categoryId}:`, filteredPosts);
  console.log(`Number of Posts matching Category ID ${categoryId}:`, filteredPosts.length);


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
      </div>


      <FilterCategory categories={categories} />
      {/* Inläggen */}
      {/* Posts Container */}
      <div className="grid grid-cols-3 gap-4 mb-16">
        
        {filteredPosts.map((post: any) => (
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
