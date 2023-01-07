const ask = async (prompt: string) => {
  const request = await fetch(
    "https://api.writesonic.com/v2/business/content/chatsonic?engine=premium",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.WRITESONIC_API_KEY as string,
      },
      body: JSON.stringify({
        enable_google_results: "true",
        enable_memory: false,
        input_text: prompt,
      }),
    }
  );

  const response = await request.json();

  return response;
};

export { ask };
