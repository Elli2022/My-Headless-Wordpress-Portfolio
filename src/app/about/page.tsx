import Link from "next/link";
import Modal from "../components/Modal";

const AboutPage = () => {
  return (
    <Modal>
      <div className="min-h-screen bg-[#1E415B] text-white flex flex-col justify-center ">
        {/* Flyttad Portfolio-länk här */}
        <div className="absolute top-8 left-14 text-white text-4xl">
          <Link href="/home" className="text-white font-bold text-lg">
            Portfolio.
          </Link>
        </div>
        <div className="container mx-auto px-4 ml-4">
          <div className="flex flex-wrap justify-center gap-10 sm:gap-10">
          <div className="flex-1 max-w-xs sm:max-w-md">
              <div className="text-center sm:text-sm">
                <h1 className="font-bold mb-5 text-left sm:text-4xl">
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
                <p className="font-snirklig text-2xl sm:text-4xl">
                  Eleonora Nocentini Sköldebrink
                </p>
              </div>
              <div>
                <p className="sm:text-xl font-semibold ">
                  Eleonora Nocentini Sköldebrink
                </p>
              </div>
              <div>
                <p className=" mt-auto mb-12 sm:text-xl">Developer</p>
              </div>
              {/* Social media links container */}
              <div className="mt-12 mb-12 text-left sm:text-l">
                <a
                  href="https://www.linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white "
                >
                  {/*  LinkedIn  */}
                  LINKEDIN
                </a>
                <a
                  href="https://www.instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white mx-2"
                >
                  {/* Instagram  */}
                  INSTAGRAM
                </a>
                <a
                  href="https://www.facebook.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white mx-2"
                >
                  {/*  Facebook*/}
                  FACEBOOK
                </a>
              </div>
            </div>

            {/* Photo container */}
            <div className="max-w-md mt-12  order-first mr-8">
              <div className="rounded-lg shadow-xl flex items-center justify-center">
                <div className="h-80 w-64 sm:h-96 sm:w-80 bg-gray-200 flex items-center justify-center">
                  {/* Placeholder text or icon */}
                  <span className="text-gray-500">
                    <img src="/images/portfolioFoto.jpg" alt="" />
                  </span>
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
