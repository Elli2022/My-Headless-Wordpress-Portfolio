//src/app/components/ProjectPost.tsx

// Importerar React för att kunna använda JSX-syntax
import React from "react";

// Definierar TypeScript-interface för att strukturera och typsäkra props
interface ProjectPostProps {
  postData: {
    title: string;
    content: string;
    featuredImage: {
      node: {
        mediaItemUrl: string;
        slug: string;
      };
    };
  };
}

// Komponenten ProjectPost tar emot postData som prop
const ProjectPost = ({ postData }: ProjectPostProps) => {
  // Returnerar en laddningsskärm om postData inte är laddat än
  if (!postData) {
    return <div>Loading...</div>;
  }

  // Använder object destructuring för att hämta ut värden från postData
  const { title, content, featuredImage } = postData;

  // Renderar komponenten med tillhörande featuredImage och innehåll
  return (
    <div className=" shadow-sm">
      {/* Renderar en bild om det finns en featuredImage */}
      {featuredImage?.node?.mediaItemUrl && (
        <img
          src={featuredImage.node.mediaItemUrl}
          alt={featuredImage.node.slug}
          className="w-full h-auto object-cover rounded"
        />
      )}
      {/* Sätter HTML-innehållet säkert med dangerouslySetInnerHTML */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

// Exporterar komponenten för användning i andra delar av applikationen
export default ProjectPost;
