/* eslint-disable @next/next/no-img-element */
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState, useReducer, type ChangeEvent } from "react";
import { toBase64 } from "../lib/base64";
import useSWR from "swr";

type Post = {
  name: string;
  content: string;
  image?: string | null;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Write: NextPage = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useReducer(
    (state: Post, newState: Post) => ({ ...state, ...newState }),
    {
      name: "",
      content: "",
      image: null,
    }
  );

  const submit = async () => {
    try {
      setStatus("loading");

      const request = await fetch("/api/write/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (request.status == 200) {
        setStatus("done");
      }
    } catch (error) {
      setStatus("idle");
    }
  };

  const [page, setPage] = useState(1);

  const { data } = useSWR(`/api/write?page=${page}`, fetcher);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <Link href="/">
          <ChevronLeftIcon className="mt-4 h-10 w-10 cursor-pointer rounded-full border border-gray-300 p-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75" />
        </Link>
      </div>
      <Image
        src="/assets/icons/write.png"
        alt="Write logo"
        width={50}
        height={50}
      />
      <h1 className="mt-2 text-center text-3xl font-bold">Write</h1>
      {isSubmitting ? (
        <div>
          <input
            type="text"
            value={post.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPost({
                name: e.target.value,
                content: post.content,
              })
            }
            className="mt-4 h-12 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75"
            placeholder="Your name"
          />
          <textarea
            value={post.content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setPost({
                name: post.name,
                content: e.target.value,
              })
            }
            className="mt-4 h-40 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75"
            placeholder="Your entry"
          />
          {!post.image ? (
            <input
              type="file"
              onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                  setPost({
                    name: post.name,
                    content: post.content,
                    image: await toBase64(file),
                  });
                }
              }}
              accept="image/*"
              className="mt-4 h-12 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75"
            />
          ) : (
            <div className="mt-4 flex w-full flex-col items-center justify-center rounded-lg border border-gray-300 p-2">
              <img src={post.image} alt="Your image" className="rounded-xl" />
              <button
                onClick={() =>
                  setPost({
                    name: post.name,
                    content: post.content,
                    image: null,
                  })
                }
                className="mt-4 h-10 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75"
              >
                Change image
              </button>
            </div>
          )}
          <button
            onClick={() => status == "idle" && submit()}
            className="mt-4 h-10 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75"
          >
            {status == "idle"
              ? "Write new entry"
              : status == "loading"
              ? "Loading..."
              : "Done"}
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsSubmitting(true)}
          className="mt-4 h-10 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-75"
        >
          Write new entry
        </button>
      )}
      {data &&
        data.posts &&
        data.posts.map((entry: Post) => (
          <div
            key={entry.name}
            className="mt-4 flex w-full flex-col justify-center rounded-lg border border-gray-300 p-2"
          >
            <h2 className="text-2xl font-bold">{entry.name}</h2>
            <p className="mt-2 text-lg my-2">{entry.content}</p>
            {entry.image && (
              <img src={entry.image} alt="Your image" className="rounded-xl mt-4" />
            )}
          </div>
        ))}
    </div>
  );
};

export default Write;
