import React from "react";
import ChatBot from "../components/Chat";
import Header from "@/components/Headers";
import TypeWriterComp from "@/components/TypeWriterComp";

import BrianTesting from "@/components/BrianTesting";

import SimpleImageSlider from "@/components/SimpleImageSlider";

export default function Home() {
  return (
    <div>
      <Header />
      <TypeWriterComp />
      <div className="flex items-center justify-center w-full">
        <div className="grid grid-cols-2 border mt-10 justify-center items-center">
          <div className="">
            <SimpleImageSlider />
          </div>
          <div className="border-2 flex items-center justify-center">
            <ChatBot />
          </div>
        </div>
      </div>
<br />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. In quasi soluta consequatur incidunt. Accusantium distinctio sequi voluptatibus odit quia? Pariatur inventore blanditiis repudiandae dignissimos exercitationem cum dolores placeat neque sint.
    </div>
  );
}
