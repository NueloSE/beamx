"use client";
import { useState } from "react";
import React from "react";
import Loading from "./ui/loading";
const brian_api_key = process.env.NEXT_PUBLIC_BRIAN_API_KEY;

const url = "https://api.brianknows.org/api/v0/agent/parameters-extraction";
// endpoints to use - agent/parameters-extraction

// launch a memecoin with the name urjung and the symbol should be ugn with an initials supply of 2000
const BrianTesting = () => {
  const [prompt, setPrompt] = useState("");
  const [Object, setObject] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const options = {
    method: "POST",
    body: JSON.stringify({
      headers: {
        "X-Brian-Api-Key": brian_api_key,
        "Content-Type": "application/json",
      },

      prompt: prompt,
      messages: [
        {
          sender: "user",
          content: "",
        },
      ],
    }),
  };

  async function brianAiMemecoinLaunch() {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("error data is ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6">
      {/* <form action=""> */}
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        type="text"
        placeholder="write a prompt to launch a memecoin"
      />
      <button onClick={brianAiMemecoinLaunch}>launch memecoin</button>
      {/* </form> */}
      <br />
      {isLoading && <Loading />}
    </div>
  );
};

export default BrianTesting;
