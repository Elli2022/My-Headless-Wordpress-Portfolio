//src/app/components/LiveWorkButton.tsx
import React from 'react';

interface LiveWorkButtonProps {
  buttonText: string;
  buttonUrl: any;
}

const LiveWorkButton: React.FC<LiveWorkButtonProps> = ({ buttonText, buttonUrl }) => {
  return (
    <div className="mb-4 md:mb-6">
      <a
        href={buttonUrl}
        className="py-2 px-8 md:py-2.5 md:px-10 lg:py-3 lg:px-12 text-xs md:text-sm lg:text-base bg-blue-500 text-white uppercase rounded-full cursor-pointer no-underline transition-colors duration-300 ease inline-block mt-5" 
      >
        {buttonText}
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          &rarr;
        </span>
      </a>
    </div>
  );
};

export default LiveWorkButton;
