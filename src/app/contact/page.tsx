// src/pages/contact.tsx
import React from "react";
import Link from "next/link";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="text-left py-5">
          <Link href="/home" className="text-white font-bold text-l">
            Portfolio.
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          <div className="flex-1 max-w-md">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold mb-4 text-left">Contact now</h1>
              <p>
                Have a project or question? Send me a message. I will reply within 48 hours.
              </p>
            </div>

            <form className="space-y-6">
              <div>
              <label htmlFor="name" className="block text-sm ">
                  Your name
                </label>
                <input type="text" id="name" className="w-full bg-transparent border-grey border-b border-gray-600 focus:ring-0 text-white" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm ">
                  Email address
                </label>
                <input type="email" id="email" className="w-full bg-transparent border-grey border-b border-gray-600 focus:ring-0 text-white" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm ">
                  Subject
                </label>
                <input type="text" id="subject" className="w-full bg-transparent border-grey border-b border-gray-600 focus:ring-0 text-white" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm ">
                  Write your message
                </label>
                <textarea id="message" rows="4" className="w-full bg-transparent border-grey border-b border-gray-600 focus:ring-0 text-white"></textarea>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="mt-4 px-6 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 font-bold uppercase tracking-wide">
                  Send
                </button>
              </div>
            </form>
          </div>

          {/* Vit container för kontaktinformation */}
          <div className="flex-1 max-w-md">
            <div className="bg-white text-gray-900 p-10 rounded-lg shadow-xl">
              <div className="text-center">
                <p className="mb-2">
                  Email me at <a href="mailto:my@gmail.com" className="text-indigo-600 hover:text-indigo-800">my@gmail.com</a>
                </p>
                <p>
                  Call me at <a href="tel:+1-402-4983" className="text-indigo-600 hover:text-indigo-800">+1-402-4983</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
