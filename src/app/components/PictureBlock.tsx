import React from "react";
import NextProjectText from "./NextProjectText";

interface PictureBlockProps {
  pictureBlock: {
    picture: {
      mediaItemUrl: string;
      altText?: string;
    };
    nextprojecttext?: string; // Optional if used
    replaceurl: string;
    replacetext?: string; // Optional if used
  };
}

const PictureBlock: React.FC<PictureBlockProps> = ({
  pictureBlock: {
    picture: { mediaItemUrl, altText = "Informative Alt Text" },
    replaceurl,
  },
}) => {
  return (
    <div className="relative mt-24 md:min-h-screen bg-cover bg-no-repeat bg-center">
      <div className="absolute inset-0 top-1/4 w-screen left-1/2 h-full transform -translate-x-1/2 bg-[#1E415B] shadow-md"></div>
      <img
        src={mediaItemUrl}
        alt={altText}
        className="w-full relative z-0"
      />
      {/* If nextprojecttext is used, uncomment and use it here */}
      {/* <NextProjectText text={nextprojecttext} /> */}
      <div className="text-center mt-10">
        <a
          href={replaceurl}
          className="text-xl lg:text-3xl font-bold text-white inline-block my-4 relative px-10 py-2"
        >
          Replace
          <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-lg">
            &rarr;
          </span>
        </a>
      </div>
    </div>
  );
};

export default PictureBlock;
