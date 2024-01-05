//src/app/components/Footer.tsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center py-4 mt-4">
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
