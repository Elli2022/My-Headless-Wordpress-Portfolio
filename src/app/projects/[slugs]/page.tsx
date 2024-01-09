// src/pages/projects/[slugs]/page.tsx

import React from "react";
import getPages from "@/pages/queries/getPages";
import Navigation from "../../components/Navigation";
import WP from "@/pages/api/wp";
import getPost from "../../../pages/queries/getPost";
import ProjectPost from "../../components/ProjectPost";
import Footer from "@/app/components/Footer";

interface Post {
  title: string;
  content: string;
  featuredImage: {
    node: {
      mediaItemUrl: string;
      slug: string;
    };
  };
  slug: string;
}

interface PostNode {
  featuredImage: {
    node: {
      slug: string;
    };
  };
  slug: string;
}

interface ProjectPageProps {
  post: Post;
}

interface FeaturedImageNode {
  mediaItemUrl: string;
  slug: string;
}

const apiKey = process.env.wordpressApiKey;

export async function generateStaticParams() {
  // Fetch all the slugs for the posts
  const posts = await WP(`
  query GetPosts {
    posts {
      edges {
        node {
          slug
        }
      }
    }
  }`);
  const paths: any = [];
  posts?.data?.posts?.edges?.map((post: any) => {
    if (post && post.node && post.node.slug) {
      paths.push({ params: { slug: post.node.slug } });
    }
  });

  return paths;
}

// Define a global variable to store the post data
let globalPostData: {
  [x: string]: any;
  title: string;
};

const ProjectPage = async ({ params }: { params: { slugs: string } }) => {
  console.log("Received slug:", params.slugs); // Logga mottagen slug
  let globalPostData = null;
  let additionalPostInfo = null; // Definiera additionalPostInfo här

  // Hämta data från WP
  const resPost = await WP(
    `
    query GetPostBySlug($slug: String!) {
      postBy(slug: $slug) {
        id
        title
        content
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
        slug
      }
    }`,
    { slug: params.slugs }
  );

  console.log("WP Response:", resPost); // Logga svar från WP

  if (resPost.data) {
    globalPostData = resPost.data.postBy;
    console.log("Global Post Data:", globalPostData); // Logga global post data
  }

  // Hämta ytterligare data med getPost
  const additionalData = await getPost(params.slugs);

  console.log("Additional Data Response:", additionalData); // Logga ytterligare data

  if (additionalData && additionalData.data) {
    additionalPostInfo = additionalData.data.post; // Tilldela data till additionalPostInfo
    console.log("Additional Post Info:", additionalPostInfo); // Logga ytterligare post info
  }

  console.log(additionalData.data.post.PostInfo.branding);

  const navlinks = await getPages();
  const navHits = navlinks.edges.map((edge: any) => edge.node);
  const mainLinks = {
    portfolio: navHits.find((hit: any) => hit.title === "Portfolio."),
    about: navHits.find((hit: any) => hit.title === "about me."),
    contact: navHits.find((hit: any) => hit.title === "contact."),
  };

  if (!globalPostData) {
    return <div>Loading...</div>;
  }

  // Kontrollera om 'blocks' finns och är en array innan du försöker mappa över den
  const keyFindingsBlock = additionalPostInfo?.PostInfo?.blocks?.find(
    (block: { fieldGroupName: string }) =>
      block.fieldGroupName === "Post_Postinfo_Blocks_Keyfindings"
  );

  // Locate the picture block in the additionalPostInfo
  const pictureBlock = additionalPostInfo?.PostInfo?.blocks?.find(
    (block: { fieldGroupName: string }) =>
      block.fieldGroupName === "Post_Postinfo_Blocks_Picture"
  );

  //Destructering- värden för att rendera komponenter
  const {
    branding,
    text = "Default text if null",
    nextprojecttext = "Default next project text if null",
    replaceurl = "#", // Standardvärde om inget finns
    replacetext = "Default replace text if null", // Standardvärde om inget finns
    liveworkbuttonURL = "#",
    liveworkbuttontext = "Default replace text if null",
    tosatisfyourgoaltext = "Default text if null",
    blocks = [],
  } = additionalData?.data?.post?.PostInfo || {};

  const renderImages = (blocks: any[]) => {
    // Extrahera bilder från blocks
    const images = blocks
      .filter(
        (block: { fieldGroupName: string }) =>
          block.fieldGroupName === "Post_Postinfo_Blocks_Images"
      )
      .flatMap((block: { projectimages: any }) => block.projectimages);

    return (
      <div className="grid grid-cols-2 gap-4">
        {images.map(
          (image: { mediaItemUrl: string | undefined }, index: number) => (
            <img
              key={index}
              src={image.mediaItemUrl}
              alt={`Image ${index}`}
              className={`w-full object-cover ${
                index === 0 ? "col-span-2" : "col-span-1"
              }`}
            />
          )
        )}
      </div>
    );
  };
  // När data är hämtad, renderas sidan
  return (
    <>
      <div className="min-h-screen  white text-black p-24">
        <Navigation
          portfolioLink={mainLinks.portfolio}
          aboutLink={mainLinks.about}
          contactLink={mainLinks.contact}
        />

        <ProjectPost postData={globalPostData} />
        <div>
          <h2 className="text-gray-500 uppercase tracking-wide text-xs mt-20 mb-4">
            BRANDING
          </h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mt-5 mb-4">
            {additionalData.data.post.PostInfo.projectintrotext}
          </h1>
          <p className="text-left text-base mt-7 mb-6">
            {tosatisfyourgoaltext}
          </p>

          <div className="flex flex-row items-center space-x-14 mb-10">
            {/* Client heading och client */}
            <div className="flex flex-col space-y-1 items-center mb-4 md:mb-6">
              <h3 className="text-xs md:text-sm lg:text-base text-gray-500 uppercase tracking-wide mb-2">
                {additionalData.data.post.PostInfo.clientheading}
              </h3>
              <p className="text-xs md:text-sm lg:text-base">
                {additionalData.data.post.PostInfo.client}
              </p>
            </div>

            {/* Time och date */}
            <div className="flex flex-col space-y-1 items-center mb-4 md:mb-6">
              <h3 className="text-xs md:text-sm lg:text-base text-gray-500 uppercase tracking-wide mb-2">
                {additionalData.data.post.PostInfo.time}
              </h3>
              <p className="text-xs md:text-sm lg:text-sm">
                {additionalData.data.post.PostInfo.date}
              </p>
            </div>

            {/* Live work knappen */}
            <div className="mb-4 md:mb-6">
              <a
                href={liveworkbuttontext}
                className="py-2 px-8 md:py-2.5 md:px-10 lg:py-3 lg:px-12 text-xs md:text-sm lg:text-base bg-blue-500 text-white uppercase rounded-full cursor-pointer no-underline transition-colors duration-300 ease inline-block mt-5"
              >
                {liveworkbuttontext}
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  &rarr;
                </span>
              </a>
            </div>
          </div>

          <div className="grid-cols-2 mb-20 gap-2 lg:gap-9">
            {renderImages(additionalPostInfo?.PostInfo?.blocks || [])}
          </div>

          <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-4xl 4xl:text-4xl font-semibold mb-4">
            {keyFindingsBlock.keyfindingstitle}
          </h1>

          {keyFindingsBlock && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col p-4 bg-white rounded-lg">
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-xl font-semibold">
                  {keyFindingsBlock.basics}
                </h2>
                <p className="text-left text-sm sm:text-base md:text-lg font-light">
                  {keyFindingsBlock.basicstext}
                </p>
              </div>
              <div className="flex flex-col p-4 bg-white rounded-lg">
                <h2 className="text-sm sm:text-base md:text-lg text-base sm:text-lg md:text-xl font-semibold">
                  {keyFindingsBlock.goals}
                </h2>
                <p className="text-left text-sm sm:text-base md:text-lg font-light">
                  {keyFindingsBlock.goalstext}
                </p>
              </div>
              <div className="flex flex-col p-4 bg-white rounded-lg">
                <h2 className="text-sm sm:text-base md:text-lg text-base sm:text-lg md:text-xl font-semibold">
                  {keyFindingsBlock.problems}
                </h2>
                <p className="text-left text-sm sm:text-base md:text-lg font-light">
                  {keyFindingsBlock.problemstext}
                </p>
              </div>
              <div className="flex flex-col p-4 bg-white rounded-lg">
                <h2 className="text-sm sm:text-base md:text-lg text-base sm:text-lg md:text-xl font-semibold">
                  {keyFindingsBlock.solutions}
                </h2>
                <p className="text-left text-sm sm:text-base md:text-lg font-light">
                  {keyFindingsBlock.solutionstext}
                </p>
              </div>
            </div>
          )}
        </div>

        {pictureBlock && (
          <div className="relative  bg-dark-kobolt-blue mt-24 md:min-h-screen bg-cover bg-no-repeat bg-center ">
            {/* Overlay box */}
            <div className="absolute inset-0 top-1/4 w-screen left-1/2 h-full transform -translate-x-1/2 bg-[#034753] shadow-md"></div>
            {/* Image on top of the overlay box */}
            <img
              src={pictureBlock.picture.mediaItemUrl}
              alt="Block Image"
              className="w-full relative"
              style={{ zIndex: 0 }}
            />
            {/* Next Project Text */}
            <div className="absolute w-full text-center z-10">
              <p className="text-xs lg:text-3xl text-white">
                {nextprojecttext}
              </p>
            </div>
            <div className="text-center mt-10">
              <a
                href={replaceurl}
                className="text-xl lg:text-3xl font-bold text-white inline-block my-4"
                style={{ position: "relative", padding: "10px 40px 10px 25px" }}
              >
                {replacetext}
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "larger",
                  }}
                >
                  &rarr;
                </span>
              </a>
            </div>
          </div>
        )}

        {/* Additional text that should not be covered */}
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl text-center mb-10 font-semibold relative z-10 mt-80">
          {text}
        </h2>

        {/* Contact information and links */}
        <div className="flex justify-center items-center space-x-2 mb-10 relative z-10">
          <a
            href="mailto:contact@folio.design"
            className="text-sm text-blue-500 hover:underline"
          >
            CONTACT@FOLIO.DESIGN
          </a>
          <span>|</span>
          <a
            href="https://www.linkedin.com/company/folio"
            className="mt-30 text-sm text-blue-500 hover:underline"
          >
            LINKEDIN.COM/FOLIO
          </a>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ProjectPage;
