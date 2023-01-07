import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { type GetStaticProps, type GetStaticPaths, type NextPage } from "next";
import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import md from "markdown-it";

type Props = {
  content: string;
};

const Wiki: NextPage<Props> = ({ content }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-6 w-full">
        <Link href="/wiki">
          <ChevronLeftIcon className="mt-4 h-10 w-10 cursor-pointer rounded-full border border-gray-300 p-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75" />
        </Link>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: md().render(content) }}
        className="prose prose-lg"
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const fileName = fs.readFileSync(
    path.join("src", "data", "wiki", `${slug}.md`),
    "utf-8"
  );
  const { content } = matter(fileName);

  return {
    props: {
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join("src", "data", "wiki"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Wiki;
