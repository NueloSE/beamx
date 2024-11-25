import React from "react";
import ChatBot from "../components/Chat";
import Header from "@/components/Headers";
import TypeWriterComp from "@/components/TypeWriterComp";

export default function Home() {
  return (
    <div>
      <Header />
      <TypeWriterComp />
      <ChatBot />
    </div>
  );
}
