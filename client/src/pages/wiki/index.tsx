import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { type GetStaticProps, type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

type Props = {
  pages: {
    slug: string;
    frontmatter: {
      title: string;
      description: string;
    };
  }[];
};

const Wiki: NextPage<Props> = ({ pages }) => {
  const [elements, setElements] = useState(pages);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      const filtered = pages.filter((i) =>
        i.frontmatter.title.toLowerCase().includes(query.toLowerCase())
      );

      setElements(filtered);
    } else {
      setElements(pages);
    }
  }, [query]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <Link href="/">
          <ChevronLeftIcon className="mt-4 h-10 w-10 cursor-pointer rounded-full border border-gray-300 p-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75" />
        </Link>
      </div>
      <Image src="/assets/icons/wiki.png" alt="Ask" width={50} height={50} />
      <h1 className="mt-2 text-center text-3xl font-bold">Wiki</h1>
      <input
        className="mt-4 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75"
        type="text"
        placeholder="Search in the wiki"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {elements.map((i) => (
        <Link
          href={`/wiki/${i.slug}`}
          key={i.slug}
          className="mt-4 w-full rounded-lg border border-gray-300 p-2 py-4 hover:bg-gray-200"
        >
          <h2 className="mb-2 text-2xl font-bold">{i.frontmatter.title}</h2>
          <p className="my-2">{i.frontmatter.description}</p>
        </Link>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join("src", "data", "wiki"));

  const pages = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const readFile = fs.readFileSync(
      path.join("src", "data", "wiki", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      pages,
    },
  };
};

export default Wiki;
