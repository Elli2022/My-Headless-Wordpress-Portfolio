//src/app/components/NextProjectText.tsx
import React from 'react';

interface NextProjectTextProps {
  text: string;
}

const NextProjectText: React.FC<NextProjectTextProps> = ({ text }) => {
  // Check if text is provided; if not, return null to render nothing
  if (!text) {
    return null;
  }

  return (
    <div className="absolute inset-x-0 top-[calc(50%-1rem)] z-10 text-center">
      <p className="text-xs lg:text-3xl text-white">{text}</p>
    </div>
  );
};

export default NextProjectText;
