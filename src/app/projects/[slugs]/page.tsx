// src/pages/projects/[slugs]/page.tsx

import React from "react";
import getPages from "@/lib/queries/getPages";
import Navigation from "../../components/Navigation";
import WP from "@/lib/api/wp";
import getPost from "../../../lib/queries/getPost";
import ProjectPost from "../../components/ProjectPost";
import Footer from "@/app/components/Footer";
import KeyFindings from '../../components/KeyFindings';
import PictureBlock from "@/app/components/PictureBlock";
import LiveWorkButton from "@/app/components/LiveWorkButton";



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

  // Assuming these are the correct properties you want to pass to LiveWorkButton
  const liveWorkButtonText = additionalData?.data?.post?.PostInfo?.liveworkbuttontext || "Default Button Text";
  const liveWorkButtonUrl = additionalData?.data?.post?.PostInfo?.liveWorkButtonUrl || "#";
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
    text = "Default text if null",
    nextprojecttext = "Default next project text if null",
    replaceurl = "#", // Standardvärde om inget finns
    replacetext = "Default replace text if null", // Standardvärde om inget finns
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
        {LiveWorkButton && (
          <LiveWorkButton 
            buttonText={liveWorkButtonText}
            buttonUrl={liveWorkButtonUrl}
          />
        )}
          </div>

          <div className="grid-cols-2 mb-20 gap-2 lg:gap-9">
            {renderImages(additionalPostInfo?.PostInfo?.blocks || [])}
          </div>

          {keyFindingsBlock && <KeyFindings keyFindingsBlock={keyFindingsBlock} />}
        </div>

        {pictureBlock && <PictureBlock pictureBlock={pictureBlock} />}


        {/* Additional text that should not be covered */}
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl text-center mb-10 font-semibold relative z-10 mt-80">
          {text}
        </h2>
        <Footer />
      </div>
    </>
  );
};

export default ProjectPage;
