//src/app/components/Footer.tsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center py-4 mt-4">
      {/* Contact information and links */}
      <div className="flex justify-center items-center space-x-2 mb-10 relative z-10">
          <a
            href="mailto:contact@folio.design"
            className="text-sm text-blue-500 hover:underline"
          >
            CONTACT@FOLIO.DESIGN
          </a>
          <span>|</span>
          <a
            href="https://www.linkedin.com/company/folio"
            className="mt-30 text-sm text-blue-500 hover:underline"
          >
            LINKEDIN.COM/FOLIO
          </a>
        </div>
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
