"use client";
import logo from "../../public/logo.webp";
import Image from "next/image";
import React, { useState } from "react";
import { Righteous, Inter, Pacifico } from "next/font/google";

const righteous = Righteous({ weight: ["400"], subsets: ["latin"] });
const inter = Inter({ weight: ["400"], subsets: ["latin"] });
const pacifico = Pacifico({ weight: ["400"], subsets: ["latin"] });

interface ChatMessage {
  id: number;
  sender: 'bot' | 'user';
  content: string;
}

const ChatBot = () => {
  const [prompt, setPrompt] = useState("");
  const api_key = process.env.NEXT_PUBLIC_BRIAN_API_KEY;

  const url = "https://api.brianknows.org/api/v0/agent/parameters-extraction";
  const options = {
    method: "POST",
    headers: {
      "X-Brian-Api-Key": api_key as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      messages: [{ sender: "user", content: "" }],
    }),
  };

  async function callBrian() {
    if (!options) return;

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data.result.completion[0]);
    } catch (error) {
      console.error(error);
    }
  }




  const submitPrompt = () => {
    console.log("lorem ipsum", prompt);
    callBrian();
  };

  return (
    <div className="bg-white relative rounded shadow-lg w-[640px] grid grid-rows-[89px_auto_100px] h-[802px] overflow-hidden">
      <div className="w-full flex items-center justify-between px-5 h-[89px] bg-[#CDCDCD]">
        <div className="flex items-center justify-center gap-2">
          <div className="rounded-full border-[2px] border-white overflow-hidden">
            <Image src={logo} alt="beamx logo" width="60" height="60" />
          </div>
          <div className={` ${righteous.className} flex flex-col items-start`}>
            <div>BEAMX BOT</div>
            <div className="flex gap-1 items-center justify-center">
              <ActiveButton /> Active
            </div>
          </div>
        </div>

        <div className="font-bold text-2xl">...</div>
      </div>


      <div
        className={`mt-2 overflow-x-auto scrollbar-hide px-6 ${inter.className}`}
      >
        <div className="grid mb-2 grid-cols-[30px_auto] items-start gap-2">
          <div className="rounded-full mt-1 border-[2px] border-blue-300 overflow-hidden self-start">
            <Image src={logo} alt="beamx logo" width="28" height="28" />
          </div>
          <div className="border px-4 py-2 bg-blue-200 rounded-3xl w-fit max-w-[80%]">
            Hey, What would you like to do today ?
          </div>
        </div>

        <div
          className="border mb-2  bg-blue-300 justify-end flex items-end ml-auto *:
        px-4 py-2  rounded-3xl w-fit max-w-[80%]
        "
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod magni
          commodi nesciunt deleniti tempore. Nemo nisi quaerat optio quibusdam
          molestiae repudiandae error iusto sapiente autem repellendus earum
          alias distinctio ipsa magnam esse eos est aliquid, assumenda hic
          doloribus vero quia?
        </div>

        <div className="grid grid-cols-[30px_auto] items-start gap-2">
          <div className="rounded-full mt-1 border-[2px] border-blue-300 overflow-hidden self-start">
            <Image src={logo} alt="beamx logo" width="28" height="28" />
          </div>
          <div className="border px-4 py-2 bg-blue-200 rounded-3xl w-fit max-w-[80%]">
            You are preparing to deploy a memecoin on the Starknet blockchain
            named <b>Shola</b> , with the symbol <b>SH</b> and an initial supply
            of <b>1,000 </b>
            tokens, owned by wallet address <b>0x0000</b>. It will be launched
            on the Ekubo protocol, and its design ensures that it is unruggable
            for investor security.
          </div>
        </div>
        <div className="ml-[40px] mt-3 p-2 grid grid-cols-2 w-[75%] gap-2">
          <button className="bg-blue-200 py-3 rounded-3xl hover:shadow-lg">
            Proceed
          </button>
          <button className="bg-blue-200 py-3 rounded-3xl hover:shadow-lg">
            Cancel
          </button>
        </div>
      </div>


      <form
        onSubmit={(e) => e.preventDefault()}
        className={`bg-[#CDCDCD] ${inter.className} w-full  absolute bottom-0 p-2 `}
        action=""
      >
        <div className="p-1 flex items-center justify-center gap-2  ">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="border-none rounded w-[500px] px-4 py-2  focus:outline-none focus:border-none focus:no-underline"
            type="text"
            placeholder="Prompt Launch with name, symbol, and initial supply...."
          />
          <button
            onClick={submitPrompt}
            className="px-4 py-2 bg-blue-200 rounded-lg"
            type="submit"
          >
            send
          </button>
        </div>
        <div className="flex mb items-center justify-center">
          <hr className="border border-black w-[450px] " />
          <p className={`text-base ${pacifico.className} text-black`}>
            powered by brian ai
          </p>
        </div>
      </form>
    </div>
  );
};

export const ActiveButton = () => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="5" cy="5" r="5" fill="#03FF7D" />
    </svg>
  );
};
export default ChatBot;
