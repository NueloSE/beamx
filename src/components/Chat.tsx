"use client";
import logo from "../../public/logo.webp";
import Image from "next/image";
import React, { useState, useReducer } from "react";
import { Righteous, Inter, Pacifico } from "next/font/google";
import { callBrianAPI } from "@/app/api/brian";
import Loading from "./ui/loading";
import { useAccount } from "@starknet-react/core";
import toastr from "toastr";

// Configure toastr
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 3000,
  preventDuplicates: true,
};

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

const DEFAULT_SUPPLY = 10000;

const ChatBot = () => {
  const [messages, dispatch] = useReducer(messagesReducer, INITIAL_MESSAGES);
  const [prompt, setPrompt] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected, address } = useAccount();

  // Helper function to validate Starknet address
  const validateStarknetAddress = (addr: string): boolean => {
    // Check if the address starts with '0x'
    if (!addr.startsWith("0x")) return false;

    // Remove '0x' prefix for length check
    const addressWithoutPrefix = addr.slice(2);

    // Starknet addresses must be exactly 64 characters after '0x'
    if (addressWithoutPrefix.length !== 64) return false;

    // Check if the remaining string is a valid hex string
    const hexRegex = /^[0-9a-fA-F]{64}$/;
    return hexRegex.test(addressWithoutPrefix);
  };

  // Helper function to truncate address
  const truncateAddress = (addr: string): string => {
    if (!addr) return "";
    if (addr.length < 10) return addr;
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const validateAndProcessTokenData = (data: any) => {
    if (!data?.result?.completion?.[0]) {
      toastr.error("Invalid response format from API");
      return null;
    }

    const { name, symbol, supply, owner, action } = data.result.completion[0];

    if (!action || action !== "deploytoken") {
      toastr.error(
        "<a className='text-blue-600' target='_blank' href='https://github.com/'>Action not available right now please checkout the how to use page</a> "
      );
      return null;
    }

    // Check if name is empty
    if (!name || name.trim() === "") {
      toastr.error(
        "Token name is required. Please specify a name for your token"
      );
      return null;
    }

    // Use connected wallet address if no owner specified or invalid address
    let processedOwner = address; // Default to connected wallet
    if (owner) {
      if (validateStarknetAddress(owner)) {
        processedOwner = owner;
      } else {
        toastr.error(
          "Invalid Starknet address format. Address must be 66 characters (including '0x' prefix)."
        );
        return null;
      }
    }

    if (!processedOwner) {
      toastr.error(
        "No valid owner address available. Please connect your wallet."
      );
      return null;
    }

    // Validate the processed owner address as well
    if (!validateStarknetAddress(processedOwner)) {
      toastr.error("Connected wallet address is not in valid Starknet format.");
      return null;
    }

    // Process the token data with defaults
    const processedName = name.trim();
    const processedData = {
      name: processedName,
      symbol: symbol?.trim() || processedName.substring(0, 2).toUpperCase(),
      supply: supply || DEFAULT_SUPPLY,
      owner: processedOwner,
      truncatedOwner: truncateAddress(processedOwner),
    };

    return processedData;
  };

  const handleProceed = () => {
    if (!isConnected) {
      toastr.warning("Please connect your wallet first");
      return;
    }

    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        id: messages.length,
        sender: "bot",
        content: "Proceeding with deployment. Please wait...",
      },
    });

    setShowButtons(false);
    toastr.success("Deployment initiated");
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
    setShowButtons(false);
    toastr.info("Deployment cancelled");
  };

  const submitPrompt = () => {
    if (!isConnected) {
      toastr.warning("Please connect your wallet first");
      return;
    }

    if (!prompt.trim()) {
      toastr.warning("Please enter your token details");
      return;
    }

    setIsLoading(true);

    dispatch({
      type: "ADD_MESSAGE",
      payload: { id: messages.length, sender: "user", content: prompt },
    });

    callBrianAPI(prompt)
      .then((res: any) => {
        if (!res) {
          toastr.error("Failed to fetch response");
          return;
        }

        const processedData = validateAndProcessTokenData(res);

        if (!processedData) {
          return; // Validation failed, don't proceed
        }

        const { name, symbol, supply, truncatedOwner } = processedData;

        const brianPrompt = `You are preparing to deploy a memecoin on the Starknet blockchain named <b>${name}</b>, with the symbol <b>${symbol}</b> and a supply of <b>${supply}</b> tokens, owned by wallet address <b>${truncatedOwner}</b>. It will be launched on the Ekubo protocol, and its design ensures that it is unruggable for investor security.`;

        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            id: messages.length + 1,
            sender: "bot",
            content: brianPrompt,
          },
        });

        setShowButtons(true);
        toastr.success("Token configuration ready. Please proceed or cancel.");
      })
      .catch((err) => {
        console.error("Error:", err);
        toastr.error("An error occurred while processing your request");
      })
      .finally(() => {
        setIsLoading(false);
        setPrompt("");
      });
  };

  return (
    <div className="bg-white dark:bg-gray-800 relative rounded shadow-lg w-full max-w-[640px] min-h-[600px] h-[calc(100vh-2rem)] mx-auto grid grid-rows-[auto_1fr_auto] overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between p-3 sm:p-5 bg-gray-200 dark:bg-gray-700">
        <div className="flex items-center gap-2">
          <div className="rounded-full border-[2px] border-white dark:border-gray-600 overflow-hidden hidden sm:block">
            <Image src={logo} alt="beamx logo" width="60" height="60" />
          </div>
          {/* Mobile logo */}
          <div className="rounded-full border-[2px] border-white dark:border-gray-600 overflow-hidden sm:hidden">
            <Image src={logo} alt="beamx logo" width="40" height="40" />
          </div>
          <div
            className={`${righteous.className} flex flex-col items-start text-gray-800 dark:text-white`}
          >
            <div className="text-base sm:text-lg">BEAMX BOT</div>
            <div className="flex gap-1 items-center justify-center text-sm">
              <ActiveButton /> Active
            </div>
          </div>
        </div>

        <div className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-white">
          ...
        </div>
      </div>

      {/* Messages Container */}
      <div
        className={`overflow-y-auto overflow-x-hidden px-3 sm:px-6 py-4 ${inter.className} scrollbar-hide`}
      >
        {messages.map((message) => (
          <div className={`${inter.className} mb-4`} key={message.id}>
            {message.sender === "bot" ? (
              <div className="grid grid-cols-[24px_1fr] sm:grid-cols-[30px_1fr] items-start gap-2">
                <div className="rounded-full mt-1 border-[2px] border-blue-300 dark:border-blue-500 overflow-hidden self-start">
                  <Image
                    src={logo}
                    alt="beamx logo"
                    width="24"
                    height="24"
                    className="sm:w-[28px] sm:h-[28px]"
                  />
                </div>
                <div className="border px-3 py-2 sm:px-4 sm:py-2 bg-blue-100 dark:bg-blue-800 text-gray-800 dark:text-white rounded-3xl w-fit max-w-[90%] sm:max-w-[85%]">
                  <div
                    className="break-words whitespace-pre-wrap text-sm sm:text-base"
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                    }}
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <div className="border bg-blue-200 dark:bg-blue-700 text-gray-800 dark:text-white px-3 py-2 sm:px-4 sm:py-2 rounded-3xl max-w-[90%] sm:max-w-[85%]">
                  <div
                    className="break-words whitespace-pre-wrap text-sm sm:text-base"
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading ? (
          <Loading />
        ) : (
          showButtons && (
            <div className="mt-3 mb-4 grid grid-cols-2 w-full sm:w-[75%] gap-2 px-2">
              <button
                onClick={handleProceed}
                className="bg-blue-100 dark:bg-blue-500 text-gray-800 dark:text-white py-2 sm:py-3 rounded-3xl hover:shadow-lg transition-all text-sm sm:text-base"
              >
                Proceed
              </button>
              <button
                onClick={handleCancel}
                className="bg-blue-100 dark:bg-blue-500 text-gray-800 dark:text-white py-2 sm:py-3 rounded-3xl hover:shadow-lg transition-all text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          )
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`bg-gray-200 dark:bg-gray-700 ${inter.className} w-full p-2 sm:p-3`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="border-none rounded w-full max-w-[500px] px-3 py-2 sm:px-4 sm:py-2 bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:outline-none text-sm sm:text-base"
              type="text"
              placeholder="Prompt Launch with name, symbol, and initial supply..."
              disabled={!isConnected}
            />
            <button
              onClick={submitPrompt}
              className={`px-3 py-2 sm:px-4 sm:py-2 bg-purple-600 ${
                isConnected ? "cursor-pointer" : "cursor-not-allowed"
              } dark:bg-purple-600 text-white rounded hover:opacity-90 transition-opacity text-sm sm:text-base min-w-[60px]`}
              type="submit"
              disabled={!isConnected}
            >
              send
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <hr className="border border-gray-400 dark:border-gray-500 w-full max-w-[450px]" />
            <p
              className={`text-xs sm:text-sm ${pacifico.className} text-black whitespace-nowrap`}
            >
              powered by brian ai
            </p>
          </div>
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
