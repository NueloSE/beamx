import React from "react";
import ChatBot from "../components/Chat";
import Header from "@/components/Headers";
import TypeWriterComp from "@/components/TypeWriterComp";
import BrianTesting from "@/components/BrianTesting";

export default function Home() {
  return (
    <div>
      <Header />
{/*       
            <TypeWriterComp />
      <div className="grid grid-cols-2">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quidem
          assumenda pariatur incidunt distinctio facere, modi officia eveniet
          voluptatem possimus eum, dolores nostrum iusto eius sit, illum quam
          eligendi fugit.
        </div>
        <ChatBot />
      </div> */}
      <BrianTesting />

    </div>
  );
}
