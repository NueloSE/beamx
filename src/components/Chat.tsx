"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "../../public/logo.webp";
import user from "../../public/user.png";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

const ChatBot: React.FC = () => {
  // Use a hydration check to prevent server-side rendering mismatch
  const [isClient, setIsClient] = useState(false);
  
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>(
    []
  );
  const [inputText, setInputText] = useState("");

  // Add hydration check
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      const newMessage = { text: inputText, isBot: false };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText("");
      
      // Simulate bot response
      const botResponse = "Hello, I am an AI assistant.";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, isBot: true },
      ]);
    }
  };

  // If not client-side, return null or a placeholder
  if (!isClient) {
    return null;
  }

  return (
    <div
      className={`flex ${roboto.className} flex-col h-screen bg-gray-800 text-white`}
    >
      {/* Rest of your existing code remains the same */}
    </div>
  );
};

export default ChatBot;