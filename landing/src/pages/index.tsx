/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Modal from "../components/Modal";

const MODALS = [
  {
    image: "/icons/ask.png",
    name: "ask",
    description: "Ask questions powered by ChatGPT and SMS.",
  },
  {
    image: "/icons/dictionary.png",
    name: "dictionary",
    description: "Offline English dictionary with the 1000 most common words.",
  },
  {
    image: "/icons/ptable.png",
    name: "periodic table",
    description:
      "Offline periodic table with the most important data about every element.",
  },
  {
    image: "/icons/wiki.png",
    name: "wiki",
    description: "Offline wiki with selected articles.",
  },
  {
    image: "/icons/write.png",
    name: "write",
    description:
      "Offline social network avaliable only inside the hotspot network.",
  },
  {
    image: "/icons/downloads.png",
    name: "downloads",
    description: "Offline software downloads for windows",
  },
  {
    image: "/icons/read.png",
    name: "read",
    description: "Offline book reader",
  },
  {
    image: "/icons/games.png",
    name: "tic tac toe",
    description: "Little tic tac toe game",
  },
];

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-8 flex w-full flex-wrap items-center justify-around">
        <div>
          <Image
            src="/web.jpeg"
            alt="MySpot demo screen capture"
            width={400}
            height={800}
            quality={100}
            priority
            className="w-52 rounded-xl shadow-2xl"
          />
          <p className="mt-2 text-center text-lg font-thin">Web</p>
        </div>
        <div>
          <Image
            src="/chat.jpeg"
            alt="MySpot chat screen capture"
            width={400}
            height={800}
            quality={100}
            priority
            className="w-52 rounded-xl shadow-2xl"
          />
          <p className="mt-2 text-center text-lg font-thin">Chat</p>
        </div>
      </div>
      <>
        <p className="mt-4 text-center text-lg font-thin">
          MySpot is a revolutionary solution for getting accurate, up-to-date
          information when the internet is not an option. With MySpot, you can
          connect to the service via chat (SMS / WhatsApp) to ask questions or
          request information and receive an immediate response, even on dumb
          phones and other devices that may not have a connection.
        </p>
        <p className="mt-4 text-center text-lg font-thin">
          And with the power of the chat interface, you can transform any
          device, such as a Raspberry Pi, into a hotspot network that provides
          offline access to a wealth of educational content, including wikis,
          dictionaries, and more. The MySpot hotspot is easily accessible to
          anyone within range of the device, making it an ideal solution for
          libraries, community centers, schools, and other public places.
        </p>
        <p className="mt-4 text-center text-lg font-thin">
          MySpot is especially useful for vulnerable populations who may have
          limited or no internet access, or face slow, expensive connections.
          Simply install MySpot on your device and watch as it becomes a hub of
          knowledge and connection for all those around you. Or use the text
          interface to get access to the information anywhere at a low cost.
        </p>
        <Link
          href="/docs"
          className="my-4 h-10 w-full rounded-lg border border-gray-300 p-2 text-center hover:bg-slate-100"
        >
          Learn more and install
        </Link>
      </>
      <>
        <h2 className="mt-2 text-center text-3xl font-bold">Why?</h2>
        <p className="mt-4 text-center text-lg font-thin">
          The most valuable resource in the world is information, it is the key
          to solve problems, to create new things, to improve the world. But the
          information is not easylly transmitible, that&apos;s why internet
          exists.
        </p>
        <p className="mt-4 text-center text-lg font-thin">
          The internet is a great tool that everyone should be able to use, but
          it is not available everywhere. In some places, it is not even
          available at all, in others, it is expensive and slow. And this is a
          really important problem, if we look at the data, the places with less
          resources are the ones with worse access.
        </p>
        <img
          src="/share-of-individuals-using-the-internet.svg"
          alt="Chart with internet access information"
          className="my-4 w-full max-w-xl rounded-xl shadow-2xl"
        />
        <p className="mt-4 text-center text-lg font-thin">
          Based in the data, the most developed countries are the ones with the
          most stable access (North America, Europe, and Central Asia), and the
          least developed countries are the ones with the worst access (South
          Asia, and Sub-Saharan Africa). But something more interesting is the
          Sub-Saharan Africa, where services that normally requires internet
          like mobile money are very popular.
        </p>
        <img
          src="/registered-mobile-money-accounts.svg"
          alt="Chart with mobile money accounts information"
          className="my-4 w-full max-w-xl rounded-xl shadow-2xl"
        />
        <p className="mt-4 text-center text-lg font-thin">
          Sub-Saharan Africa almost have the half of the world&apos;s mobile
          money accounts, but, these places are the ones with the worst internet
          access, also have the highest rates of mobile money users? The answer
          is M-PESA (M for mobile, PESA for money), a mobile money service that
          works through SMS, and it is available in Kenya, Tanzania, and Uganda.
        </p>
        <Image
          src="/mpesa.webp"
          alt="A user holding a dumb phone with an SMS of a bank transfer"
          className="my-4 w-full max-w-xl rounded-xl shadow-2xl"
          width={600}
          height={400}
        />
        <p className="mt-4 text-center text-lg font-thin">
          This show us that the information can have multiple ways to reach the
          people, and the internet is not the only one. So, why not use the
          alternatives channels to create a tool that can be used offline to use
          the most esentials features of internet like searching? This is the
          idea behind MySpot.
        </p>
      </>
      <>
        <h2 className="mt-6 mb-2 text-center text-3xl font-bold">
          Apps included
        </h2>
        <div className="flex flex-wrap items-center justify-center">
          {MODALS.map((modal) => (
            <Modal
              key={modal.name}
              image={modal.image}
              name={modal.name}
              description={modal.description}
            />
          ))}
        </div>
        <a
          href="https://demo.myspot.asofi.us"
          className="mt-4 h-10 w-full rounded-lg border border-gray-300 p-2 text-center hover:bg-slate-100"
          target="_blank"
          rel="noreferrer"
        >
          Try the demo
        </a>
      </>
    </div>
  );
};

export default Home;
