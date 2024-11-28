import React from "react";
import ChatBot from "../components/Chat";
import Header from "@/components/Headers";
import TypeWriterComp from "@/components/TypeWriterComp";



import SimpleImageSlider from "@/components/SimpleImageSlider";

export default function Home() {
  return (
    <div>
      <Header />
      <TypeWriterComp />
      <div className="flex items-center justify-center w-full">
        <div className="grid grid-cols-2 border mt-10 justify-center items-center">
          {/* <div className="">
            <SimpleImageSlider />
          </div> */}

          <div className=" flex items-center justify-center">
            <ChatBot />
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
