import { type NextPage } from "next";
import Link from "next/link";
import HomeIcon from "../components/HomeIcon";
import InfoModal from "../components/InfoModal";

const Home: NextPage = () => {
  return (
    <div className="flex flex-wrap items-center justify-center">
      <Link href="/ask">
        <HomeIcon icon="/assets/icons/ask.png" text="ask" />
      </Link>
      <Link href="/dictionary">
        <HomeIcon icon="/assets/icons/dictionary.png" text="dictionary" />
      </Link>
      <Link href="/ptable">
        <HomeIcon icon="/assets/icons/ptable.png" text="periodic table" />
      </Link>
      <Link href="/wiki">
        <HomeIcon icon="/assets/icons/wiki.png" text="wiki" />
      </Link>
      <Link href="/write">
        <HomeIcon icon="/assets/icons/write.png" text="write" />
      </Link>
      <Link href="/downloads">
        <HomeIcon icon="/assets/icons/downloads.png" text="downloads" />
      </Link>
      <Link href="/read">
        <HomeIcon icon="/assets/icons/read.png" text="read" />
      </Link>
      <Link href="/game">
        <HomeIcon icon="/assets/icons/games.png" text="tic tac toe" />
      </Link>
      <InfoModal />
    </div>
  );
};

export default Home;
