"use client";
import { TypeAnimation } from "react-type-animation";
import { Righteous } from "next/font/google";

const righteous = Righteous({ weight: ["400"], subsets: ["latin"] });

const TypeWriterComp = () => {
  const baseText = "AI-Powered Memecoin:";

  return (
    <div
      className={`text-4xl ${righteous.className} my-16 flex justify-center items-center w-full mx-auto font-semibold`}
    >
      <div>
        {baseText}{" "}
        <TypeAnimation
          sequence={[
            "Unruggable on Starknet",
            1000,
            "Instant Deployment Framework",
            1000,
            "Brain AI Powered Launch",
            1000,
            "Crypto Innovation Unleashed",
            1000,
          ]}
          wrapper="span"
          speed={50}
          className="text-blue-500"
          repeat={Infinity}
          cursor={true}
        />
      </div>
    </div>
  );
};

export default TypeWriterComp;
