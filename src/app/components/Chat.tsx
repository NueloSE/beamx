"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../public/logo.webp";
import user from "../../../public/user.png";
import { Roboto } from "next/font/google";

const url = 'https://api.brianknows.org/api/v0/agent/parameters-extraction';
const options = {
  method: 'POST',
  headers: {'X-Brian-Api-Key': '', 'Content-Type': 'application/json'},
  body: '{"prompt":"","messages":[{"sender":"user","content":""}]}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}

const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>(
    []
  );
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      const newMessage = { text: inputText, isBot: false };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText("");
      // Call your AI model here to get the bot's response
      const botResponse = "Hello, I am an AI assistant.";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, isBot: true },
      ]);
    }
  };

  return (
    <div
      className={`flex ${roboto.className} flex-col h-screen bg-gray-800 text-white`}
    >
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => (
          <React.Fragment key={index}>
            <div
              className={`p-2 rounded-lg ${
                message.isBot
                  ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white self-start"
                  : "bg-gradient-to-r from-gray-800 to-gray-700 text-white self-end"
              }`}
            >
              <div className="grid gap-2 justify-center grid-cols-[32px_1fr]">
                <div>
                  {message.isBot ? (
                    <Image
                      src={logo}
                      alt="Bot Avatar"
                      width={40}
                      height={40}
                      className="mr-2 rounded-full"
                    />
                  ) : (
                    <div className="bg-gradient-to-r from-indigo-500 p-1 rounded-full">
                      <Image
                        src={user}
                        alt="Bot Avatar"
                        width={40}
                        height={40}
                        className="mr-2 rounded-full"
                      />
                    </div>
                  )}
                </div>
                <div className="text-xl leading-8">{message.text}</div>
              </div>
            </div>
            <br />
            <hr className="border-gray-600 my-2" />
            <br />
          </React.Fragment>
        ))}
      </div>

      <div className="bg-gray-700 p-4 flex space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          className="flex-grow bg-gray-600 px-4 py-2 rounded-lg focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
