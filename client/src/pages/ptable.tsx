import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ptableData from "../data/ptable.json";

const PTable: NextPage = () => {
  const [elements, setElements] = useState(ptableData.elements);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      const filtered = ptableData.elements.filter((i) => {
        return (
          i.name.toLowerCase().includes(query.toLowerCase()) ||
          i.symbol.toLowerCase().includes(query.toLowerCase())
        );
      });

      setElements(filtered);
    } else {
      setElements(ptableData.elements);
    }
  }, [query]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <Link href="/">
          <ChevronLeftIcon className="mt-4 h-10 w-10 cursor-pointer rounded-full border border-gray-300 p-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75" />
        </Link>
      </div>
      <Image src="/assets/icons/ptable.png" alt="Periodic Table Logo" width={50} height={50} />
      <h1 className="mt-2 text-center text-3xl font-bold">Periodic Table</h1>
      <input
        className="mt-4 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75"
        type="text"
        placeholder="Search for an element..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {elements.map((i) => (
        <article
          key={i.name}
          className="mt-4 w-full rounded-lg border border-gray-300 p-2 py-4 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75"
        >
          <h2 className="mb-2 text-2xl font-bold">
            {i.symbol} - {i.name}
          </h2>
          <p className="my-2">
            <span className="font-bold">Atomic Number: </span>
            {i.number}
          </p>
            <p className="my-2">
            <span className="font-bold">Atomic Mass: </span>
            {i.atomic_mass}
            </p>
            <p className="my-2">
            <span className="font-bold">Summary: </span>
            {i.summary}
            </p>
        </article>
      ))}
    </div>
  );
};

export default PTable;
