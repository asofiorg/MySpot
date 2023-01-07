import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import wordsData from "../data/words.json";

const Dictionary: NextPage = () => {
  const [words, setWords] = useState(wordsData);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      const filteredWords = wordsData.filter((word) => {
        return word.word.toLowerCase().includes(query.toLowerCase());
      });

      setWords(filteredWords);
    } else {
      setWords(wordsData);
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
        src="/assets/icons/dictionary.png"
        alt="Dictionary logo"
        width={50}
        height={50}
      />
      <h1 className="mt-2 text-center text-3xl font-bold">Dictionary</h1>
      <input
        className="mt-4 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75"
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {words.map((word) => {
        return (
          <article
            key={word.word}
            className="mt-4 py-4 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75"
          >
            <h2 className="font-bold text-2xl mb-2">{word.word}</h2>
            {word.definitions.map((meaning) => {
              return (
                <p key={meaning.definition}>
                  <span className="font-bold my-2">{meaning.partOfSpeech}</span> - {meaning.definition}
                </p>
              );
            })}
          </article>
        );
      })}
    </div>
  );
};

export default Dictionary;
