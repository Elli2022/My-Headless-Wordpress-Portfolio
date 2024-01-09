// components/ProjectPost.tsx
import React from "react";


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

// Accept the postData prop
const ProjectPost = ({ postData }: ProjectPostProps) => {
  if (!postData) {
    return <div>Loading...</div>;
  }

  const { title, content, featuredImage } = postData;

  return (
    <div className=" shadow-sm">
      {featuredImage?.node?.mediaItemUrl && (
        <img
          src={featuredImage.node.mediaItemUrl}
          alt={featuredImage.node.slug}
          className="w-full h-auto object-cover rounded"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default ProjectPost;
