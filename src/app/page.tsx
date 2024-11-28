import React from "react";
import ChatBot from "../components/Chat";
import Header from "@/components/Headers";
import TypeWriterComp from "@/components/TypeWriterComp";
import SimpleImageSlider from "@/components/SimpleImageSlider";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mt-12">
          <TypeWriterComp />
        </div>

        <div className="mt-8 sm:mt-12 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className=" rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="w-full h-full min-h-[300px] flex items-center justify-center p-4">
                  <SimpleImageSlider />
                </div>

                <div className="w-full h-full min-h-[300px] flex items-center justify-center p-4">
                  <ChatBot />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer spacing if needed */}
      <footer className="py-6">{/* Footer content can go here */}</footer>
    </div>
  );
}
