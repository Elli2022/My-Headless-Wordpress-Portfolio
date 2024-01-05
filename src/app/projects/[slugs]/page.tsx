// src/pages/projects/[slugs]/page.tsx


import React from "react";
import getPages from "@/pages/queries/getPages";
import Navigation from "../../components/Navigation";
import WP from "@/pages/api/wp";
import getPost from "../../../pages/queries/getPost";
import ProjectPost from "../../components/ProjectPost";


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
  let additionalPostInfo = null;  // Definiera additionalPostInfo här

  // Hämta data från WP
  const resPost = await WP(`
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
    additionalPostInfo = additionalData.data.post;  // Tilldela data till additionalPostInfo
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
  (block: { fieldGroupName: string; }) => block.fieldGroupName === 'Post_Postinfo_Blocks_Keyfindings'
);

// Locate the picture block in the additionalPostInfo
const pictureBlock = additionalPostInfo?.PostInfo?.blocks?.find(
  (block: { fieldGroupName: string; }) => block.fieldGroupName === 'Post_Postinfo_Blocks_Picture'
);

// Använd dessa värden för att rendera din komponent
  
  const {
    branding,
    text = "Default text if null",
    nextprojecttext = "Default next project text if null",
    replaceurl = "#", // Standardvärde om inget finns
    replacetext = "Default replace text if null", // Standardvärde om inget finns
    liveworkbuttonURL="#",
    liveworkbuttontext = "Default replace text if null",
    tosatisfyourgoaltext = "Default text if null", 
    blocks = [],
  } = additionalData?.data?.post?.PostInfo || {}; // Ge ett tomt objekt som standardvärde

  

// Function to render images from blocks
const renderImages = (blocks: any[]) => {
  // Extrahera bilder från blocks
  const images = blocks
    .filter((block: { fieldGroupName: string; }) => block.fieldGroupName === 'Post_Postinfo_Blocks_Images')
    .flatMap((block: { projectimages: any; }) => block.projectimages);

  // Rendera varje bild med rätt Tailwind CSS-klass
  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((image: { mediaItemUrl: string | undefined; }, index: number) => (
        <img 
          key={index}
          src={image.mediaItemUrl} 
          alt={`Image ${index}`}
          // För den första bilden, använd 'col-span-2' för att ta upp två kolumner
          // För de följande bilderna, använd 'col-span-1' för att ta upp en kolumn
          className={`w-full object-cover ${index === 0 ? 'col-span-2' : 'col-span-1'}`}
        />
      ))}
    </div>
  );
};


  // När data är hämtad, renderas sidan
  return (
    
    <><div className="min-h-screen bg-gradient-to-b from-[#d6dbdc] to-white text-black p-24">
   
      <Navigation 
        portfolioLink={mainLinks.portfolio}
        aboutLink={mainLinks.about}
        contactLink={mainLinks.contact}  />

<ProjectPost postData={globalPostData} />
      <div>
        <h2>{additionalData.data.post.PostInfo.branding}</h2>
        <p>{additionalData.data.post.PostInfo.projectintrotext}</p>
        <p>{tosatisfyourgoaltext}</p>
        
        <p>{additionalData.data.post.PostInfo.projectdescription}</p>
        <p>{additionalData.data.post.PostInfo.clientheading}</p>
        <p>{additionalData.data.post.PostInfo.date}</p>
        <p>{additionalData.data.post.PostInfo.client}</p>

     

        <div className="text-center mt-10">
        <a href={liveworkbuttontext} className="btn inline-block my-4" style={{ position: 'relative', padding: '10px 40px 10px 25px' }}>
          {liveworkbuttontext}
          <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: 'larger' }}>&rarr;</span>
        </a>
      </div>
     
  <div className="grid-cols-2 mb-20 gap-2 lg:gap-9">
  {renderImages(additionalPostInfo?.PostInfo?.blocks || [])}
</div>

        {keyFindingsBlock && (
          <div>
            <h1>{keyFindingsBlock.keyfindingstitle}</h1>
            <h2>{keyFindingsBlock.basics}</h2>
            <p>{keyFindingsBlock.basicstext}</p>
            <h2>{keyFindingsBlock.goals}</h2>
            <p>{keyFindingsBlock.goalstext}</p>
            <h2>{keyFindingsBlock.problems}</h2>
            <p>{keyFindingsBlock.problemstext}</p>
            <h2>{keyFindingsBlock.solutions}</h2>
            <p>{keyFindingsBlock.solutionstext}</p>
          </div>
        )}
      </div>
      {pictureBlock && (
        <div>
          <img src={pictureBlock.picture.mediaItemUrl} alt="Block Image" />
        </div>
      )}

      <div><p>{nextprojecttext}</p></div>
      <div className="text-center mt-10">
        <a href={replaceurl} className="btn inline-block my-4" style={{ position: 'relative', padding: '10px 40px 10px 25px' }}>
          {replacetext}
          <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: 'larger' }}>&rarr;</span>
        </a>
      </div>
      <div><h2>{text}</h2></div>
      <div>

      </div>

      <div>
          <a href="mailto:contact@folio.design" className="text-blue-500 hover:underline">contact@folio.design</a>
          <span> | </span>
          <a href="https://www.linkedin.com/company/folio" className="text-blue-500 hover:underline">LINKEDIN.COM/FOLIO</a>
        </div>
        <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </div>
    </>
  
  );
  
};


export default ProjectPage;
