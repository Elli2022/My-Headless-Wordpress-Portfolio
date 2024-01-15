// src/pages/contact.tsx
"use client"

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Modal from "../components/Modal";



const ContactPage = () => {
  return (
    <Modal>
<div className="min-h-screen bg-[#1E415B] text-white flex flex-col justify-center">
      <div className="container mx-auto px-4">
        {/* Flyttad Portfolio-länk här */}
        <div className="absolute top-10 left-14 text-white text-4xl">
            <Link href="/home" className="text-white font-bold text-lg">
               Portfolio.
            </Link>
          </div>

        <div className="flex flex-wrap justify-center gap-10">
          <div className="flex-1 max-w-md">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold mb-4 text-left">Contact now</h1>
              <p className="mb-4 text-left">
                Have a project or question? Send me a message. I will reply within 48 hours.
              </p>
            </div>

          {/* Kontaktformulär*/}
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
                <textarea id="message" rows={4} className="w-full bg-transparent border-grey border-b border-gray-600 focus:ring-0 text-white"></textarea>
              </div>
              <div className="flex-left justify-center mb-4 md:mb-6">
                <button type="submit" className="py-2 px-8 md:py-2.5 md:px-10 lg:py-3 lg:px-12 text-xs md:text-sm lg:text-base bg-blue-500 text-white uppercase rounded-full cursor-pointer no-underline transition-colors duration-300 ease inline-block mt-5">
                  Send
                </button>
              </div>
            </form>
          </div>

          {/* Vit container för kontaktinformation */}
          <div className=" max-w-md mt-auto mb-auto">
            <div className="bg-white text-gray-900 p-10 rounded-lg shadow-xl">
              <div className="text-center">
                <p className="mb-2">
                  Email me at <a href="mailto:my@gmail.com" className="text-[#1E415B] font-bold">my@gmail.com</a>
                </p>
                <p>
                  Call me at <a href="tel:+1-402-4983" className="text-[#1E415B] font-bold">+1-402-4983</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Modal>
  );
};

export default ContactPage;
