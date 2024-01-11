// components/FreelanceSection.tsx
import React from "react";

interface FreelanceSectionProps {
  freelanceTitle: string;
  freelanceDescription: string;
  freelanceContactUrl: string;
  freelanceProjectsButton: string;
}

const FreelanceSection: React.FC<FreelanceSectionProps> = ({
  freelanceTitle,
  freelanceDescription,
  freelanceContactUrl,
  freelanceProjectsButton,
}) => {
  return (
    <div className="mt-4 text-center">
      <p className="text-xs font-semibold">
        {freelanceTitle}
      </p>
      <br />
      <h3 className="text-4xl font-semibold">
        {freelanceDescription}
      </h3>
      
      <a
        href={freelanceContactUrl}
        className="py-2.5 px-6 bg-blue-500 text-white uppercase rounded-full cursor-pointer no-underline text-base transition-colors duration-300 ease inline-block mt-5">
        {freelanceProjectsButton}
      </a>
    </div>
  );
};

export default FreelanceSection;
