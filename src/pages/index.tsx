import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { Playfair_Display, Montserrat } from "next/font/google";
import Navigation from "@/components/navigation";
const mockUpImage = require("@/assets/app_mockup.png");
const buttonImage = require("@/assets/appImage.svg");

const headerFont = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const secondaryFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  const appStoreLink = "https://apps.apple.com/us/app/guudmind/id6472091590";
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Adjust the delay time as needed

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={`${secondaryFont.className} flex flex-col min-h-screen bg-gradient-to-t from-[#5D5FEF] to-black`}
    >
      <Navigation />

      <div className="flex flex-col md:flex-row items-center justify-center p-8  flex-1">
        <div
          className={` w-full md:w-1/2 md:p-8 flex justify-start flex-col  transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1
            className={`${headerFont.className} md:text-[100px] text-[50px] mb-4  tracking-wider font-bold`}
          >
            GuudMind
          </h1>
          <p
            className={`${headerFont.className}   font-bold  md:text-[50px] text-[40px] mb-4`}
          >
            Your first step to understanding your{" "}
            <span className="italic">mind.</span>
          </p>
          <div className="flex justify-center  p-8  ">
            <a href={appStoreLink} target="_blank" rel="noopener noreferrer">
              <Image src={buttonImage} alt="Screenshot" width={200} />
            </a>
          </div>
        </div>
        <div
          className={` flex justify-center md:w-1/2 p-8  transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <a href={appStoreLink} target="_blank" rel="noopener noreferrer">
            <Image
              src={mockUpImage}
              alt="Screenshot"
              width={500}
              height={300}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
