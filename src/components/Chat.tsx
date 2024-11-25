"use client"
import React, { useState } from 'react';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = { text: inputText, isBot: false };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');
      // Call your AI model here to get the bot's response
      const botResponse = 'Hello, I am an AI assistant.';
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, isBot: true }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white">
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              message.isBot ? 'bg-gray-700 self-start' : 'bg-blue-500 self-end'
            }`}
          >
            {message.text}
          </div>
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