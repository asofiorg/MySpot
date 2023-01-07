import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Ask: NextPage = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [apiResponse, setApiResponse] = useState<null | string>(null);

  const askQuestion = async () => {
    try {
      setStatus("loading");

      const request = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message }),
      });

      const response = await request.json();

      setApiResponse(response.response.message);
      setStatus("done");
    } catch (error) {
      setStatus("idle");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <Link href="/">
          <ChevronLeftIcon className="mt-4 h-10 w-10 cursor-pointer rounded-full border border-gray-300 p-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75" />
        </Link>
      </div>
      <Image src="/assets/icons/ask.png" alt="Ask" width={50} height={50} />
      <h1 className="mt-2 text-center text-3xl font-bold">Ask</h1>
      {status == "done" ? (
        <>
          <p className="mt-4 w-full rounded-lg border border-gray-300 p-2 focus:outline-none">
            {apiResponse}
          </p>
          <button
            className="mt-4 h-10 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75"
            onClick={() => {
              setStatus("idle");
              setApiResponse(null);
              setMessage("");
            }}
          >
            Ask another question
          </button>
        </>
      ) : (
        <>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-4 h-40 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75"
            placeholder="Ask a question..."
          />
          <button
            onClick={() => status == "idle" && askQuestion()}
            className="mt-4 h-10 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75"
          >
            {status == "idle"
              ? "Ask"
              : status == "loading"
              ? "Loading..."
              : "Done"}
          </button>
        </>
      )}
    </div>
  );
};

export default Ask;
