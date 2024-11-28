const api_key = process.env.NEXT_PUBLIC_BRIAN_API_KEY;
export const callBrianAPI = async (prompt: string) => {

  if (!api_key) {
    console.error("API key is missing");
    return null; // or throw new Error("API key is missing");
  }

  const url = "https://api.brianknows.org/api/v0/agent/parameters-extraction";
  const options = {
    method: "POST",
    headers: {
      "X-Brian-Api-Key": api_key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      messages: [{ sender: "user", content: "" }],
    }),
  };

  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    return null;
  }
};
