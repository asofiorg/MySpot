import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import readData from "../data/books.json";

const Read: NextPage = () => {
  const [elements, setElements] = useState(readData);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      const filtered = readData.filter((i) => {
        return i.name.toLowerCase().includes(query.toLowerCase());
      });

      setElements(filtered);
    } else {
      setElements(readData);
    }
  }, [query]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <Link href="/">
          <ChevronLeftIcon className="mt-4 h-10 w-10 cursor-pointer rounded-full border border-gray-300 p-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75" />
        </Link>
      </div>
      <Image
        src="/assets/icons/read.png"
        alt="Read logo"
        width={50}
        height={50}
      />
      <h1 className="mt-2 text-center text-3xl font-bold">Read</h1>
      <input
        className="mt-4 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75"
        type="text"
        placeholder="Search for a book..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {elements.map((i) => (
        <a
          href={i.download}
          key={i.name}
          className="mt-4 w-full rounded-lg border border-gray-300 p-2 py-4 hover:bg-slate-200"
        >
          <h2 className="mb-2 text-2xl font-bold">{i.name}</h2>
          <p className="my-2 font-bold text-lg">{i.author}</p>
          <p className="my-2">{i.description}</p>
        </a>
      ))}
    </div>
  );
};

export default Read;
