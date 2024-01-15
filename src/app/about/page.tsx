import React from "react";
import Link from "next/link";
import Modal from "../components/Modal";

const AboutPage = () => {
  return (
    <Modal>
      <div className="min-h-screen bg-[#1E415B] text-white flex flex-col">
        <div className="container mx-auto px-4">
        <div className="relative"> {/* Förälder som ger en positioneringskontext */}

        <div className="text-left pt-[-15] pb-25 sticky top-0 z-10"> {/* Anpassa pt-* värdet för att flytta upp länken, och se till att elementet är vid toppen av viewporten när det blir sticky */}
            <Link href="/home" className="text-white font-bold text-lg mb-12" >
              Portfolio.
            </Link>
          </div>
          </div>
          <div className="flex flex-wrap justify-center gap-10 sm:gap-10">
            <div className="flex-1 max-w-md">
              <div className="text-center mb-10 sm:text-sm">
                <h1 className="text-4xl font-bold mb-10 text-left sm:text-3xl">
                  Eleonora Nocentini Sköldebrink
                </h1>
                <p className="mb-4 text-left sm:text-sm">
                  Developer based in Malmö, Sweden. I am developing with minimal
                  and beautiful design.
                </p>
                <p className="mb-7 text-left sm:text-sm">
                  I strive for a minimal and beautiful design.
                </p>
                <p className="text-left sm:text-sm">Contact</p>
                <p className="mb-4 text-left sm:text-sm">
                  <a
                    href="mailto:my@gmail.com"
                    className="text-white font-bold"
                  >
                    my@gmail.com
                  </a>
                </p>
              </div>

              <div>
                <p className="font-snirklig text-4xl sm:text-6xl">
                  Eleonora Nocentini Sköldebrink
                </p>
              </div>
              <div>
                <p className="block text-sm font-semibold">
                  Eleonora Nocentini Sköldebrink
                </p>
              </div>
              <div>
                <p className="block mt-auto mb-20  text-sm">Developer</p>
              </div>
              <div></div>
              <div></div>
            </div>

            {/* Photo container */}
            <div className="max-w-md mt-auto mb-auto order-first">
              <div className="rounded-lg shadow-xl flex items-center justify-center">
                <div className="h-80 w-64 sm:h-96 sm:w-80 bg-gray-200 flex items-center justify-center">
                  {/* Placeholder text or icon */}
                  <span className="text-gray-500"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AboutPage;
