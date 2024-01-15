//src/app/components/Header.tsx
import React from "react";

interface HeaderProps {
  titleHtml: string;
  presentingText: string;
}

const Header: React.FC<HeaderProps> = ({ titleHtml, presentingText }) => {
  return (
    <header className="text-center mt-40 ">
      <p className="mt-4">{presentingText}</p>
      <h1
        className="text-5xl font-bold "
        dangerouslySetInnerHTML={{ __html: titleHtml }}
      ></h1>
    </header>
  );
};

export default Header;
