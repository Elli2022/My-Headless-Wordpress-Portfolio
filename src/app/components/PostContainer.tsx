import React from "react";
import Link from "next/link";

type Post = {
  id: string;
  slug: string;
  title: string;
  featuredImage: {
    node: {
      mediaItemUrl: string;
    };
  };
  PostInfo: {
    subtitle: string;
  };
};

type PostsContainerProps = {
  hasPosts: boolean;
  filteredPosts: Post[];
};

const PostsContainer: React.FC<PostsContainerProps> = ({
  hasPosts,
  filteredPosts,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-12">
      {hasPosts ? (
        filteredPosts.map((post) => (
          <div key={post.id} className="w-full pb-[100%] relative mb-20">
            <Link href={`/projects/${post.slug}`}>
              <img
                src={post.featuredImage.node.mediaItemUrl}
                alt={post.title}
                className="absolute w-full h-full object-cover mb-12"
              />
              <div className="absolute w-full bottom-0 mb-[-5rem] p-4 bg-white flex flex-col items-center justify-center">
                <p className="text-xs md:text-sm lg:text-base text-gray-500 uppercase tracking-wide mb-2">
                  CLIENT
                </p>
                <h2 className="text-lg font text-center">{post.title}</h2>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="col-start-2 col-span-1 flex justify-center items-center">
          <p className="text-center text-md md:text-sm lg:text-xl xl:text-2xl 2xl:text-3xl  uppercase">
            Inga inlägg hittades under den valda kategorin.
          </p>
        </div>
      )}
    </div>
  );
};

export default PostsContainer;
