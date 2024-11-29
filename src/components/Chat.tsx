"use client";
import logo from "../../public/logo.webp";
import Image from "next/image";
import React, { useState, useReducer } from "react";
import { Righteous, Inter, Pacifico } from "next/font/google";
import { callBrianAPI } from "@/app/api/brian";
interface ChatMessage {
  id: number;
  sender: "bot" | "user" | "proceedDeploy";
  content: string;
}


const righteous = Righteous({ weight: ["400"], subsets: ["latin"] });
const inter = Inter({ weight: ["400"], subsets: ["latin"] });
const pacifico = Pacifico({ weight: ["400"], subsets: ["latin"] });

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: 0, sender: "bot", content: "Hey, What would you like to do today?" },
];

const messagesReducer = (state: ChatMessage[], action: any) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return [...state, action.payload];
    default:
      return state;
  }
};

const ChatBot = () => {
  const [messages, dispatch] = useReducer(messagesReducer, INITIAL_MESSAGES);
  const [prompt, setPrompt] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  const handleProceed = () => {
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        id: messages.length,
        sender: "bot",
        content: "Proceeding with deployment. Please wait...",
      },
    });
    
    setShowButtons(false); // Hide buttons
  };

  const handleCancel = () => {
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        id: messages.length,
        sender: "bot",
        content: "Deployment cancelled. Let us know if you need anything else.",
      },
    });
    setShowButtons(false); // Hide buttons
  };

  const submitPrompt = () => {
    // setShowButtons(false);
    console.log("lorem ipsum", prompt);
    if (!prompt.trim()) return;

    dispatch({
      type: "ADD_MESSAGE",
      payload: { id: messages.length, sender: "user", content: prompt },
    });

    callBrianAPI(prompt)
      .then((res: any) => {
        if (!res) {
          console.error("Failed to fetch response");
          return;
        }

        const { name, symbol, supply, owner } = res.result.completion[0];
        const brianPrompt = `You are preparing to deploy a memecoin on the Starknet blockchain named <b>${name}</b>, with the symbol <b>${symbol}</b> and a supply of <b>${supply}</b> tokens, owned by wallet address <b>${owner}</b>. It will be launched on the Ekubo protocol, and its design ensures that it is unruggable for investor security.`;

        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            id: messages.length + 1,
            sender: "bot",
            content: brianPrompt,
          },
        });

        setShowButtons(true);
      })
      .catch((err) => {
        console.log("the error is ", err);
      });

    setPrompt("");
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
        {/* chat bot div */}
        {messages.map((message) => (
          <div className={`${inter.className}`} key={message.id}>
            {message.sender == "bot" ? (
              <div className="grid mb-2 grid-cols-[30px_auto_auto] items-start gap-2">
                <div className="rounded-full mt-1 border-[2px] border-blue-300 overflow-hidden self-start">
                  <Image src={logo} alt="beamx logo" width="28" height="28" />
                </div>
                <div className="border px-4 py-2 bg-blue-200 rounded-3xl w-fit max-w-[80%]">
                  <div dangerouslySetInnerHTML={{ __html: message.content }} />
                </div>
              </div>
            ) : (
              <div className="border mb-2 bg-blue-300 justify-end flex items-end ml-auto px-4 py-2 rounded-3xl w-fit max-w-[80%]">
                {message.content}
              </div>
            )}
          </div>
        ))}

        {showButtons && (
          <div className="ml-[40px] mt-3 p-2 grid grid-cols-2 w-[75%] gap-2">
            <button onClick={() => handleProceed()} className="bg-blue-200 py-3 rounded-3xl hover:shadow-lg">
              Proceed
            </button>
            <button onClick={handleCancel} className="bg-blue-200 py-3 rounded-3xl hover:shadow-lg">
              Cancel
            </button>
          </div>
        )}
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
