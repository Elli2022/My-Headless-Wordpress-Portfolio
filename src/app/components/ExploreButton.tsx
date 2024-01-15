import React from 'react';

interface ExploreButtonProps {
  buttonText: string;
  buttonUrl: string;
}

const ExploreButton: React.FC<ExploreButtonProps> = ({ buttonText, buttonUrl }) => {
  return (
    <div className="text-center mt-7">
      <a
        href={buttonUrl}
        className="py-5 px-12 bg-blue-500 text-white uppercase rounded-full cursor-pointer no-underline text-base transition-colors duration-300 ease inline-block mt-5 mb-40"
      >
        {buttonText} &#x279C; {/* Pilikon */}
      </a>
    </div>
  ); 
};

export default ExploreButton;
