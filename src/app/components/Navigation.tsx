// components/Navigation.tsx
import React from "react";

interface NavLink {
  id: string;
  title: string;
  uri: string;
}

interface NavigationProps {
  portfolioLink: NavLink;
  aboutLink: NavLink;
  contactLink: NavLink;
}

const Navigation: React.FC<NavigationProps> = ({
  portfolioLink,
  aboutLink,
  contactLink,
}) => {
  return (
    <nav className="flex justify-between items-center">
      {/* Vänster länk */}
      <div className="nav-left font-bold no-underline text-base hover:text-primary ">
        <a key={portfolioLink.id} href={portfolioLink.uri} className="link">
          {portfolioLink.title}
        </a>
      </div>

      {/* Höger länkar */}
      <div className="nav-right font-bold no-underline text-base ml-2.5 hover:text-primary ">
        <a key={aboutLink.id} href={aboutLink.uri}>
          {aboutLink.title}
        </a>
        <a
          href={contactLink.uri}
          className="font-bold no-underline text-base ml-5 md:ml-4 hover:text-primary"
        >
          {contactLink.title}
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
