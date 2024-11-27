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
      <div className="grid grid-cols-2 border mt-10 justify-center items-center">
        <div className="">
          <SimpleImageSlider />
        </div>
        <ChatBot />
      </div>
    </div>
  );
}
