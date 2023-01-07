import Image from "next/image";
import { type FC } from "react";

const Header: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/icons/myspot.png"
        alt="MySpot logo"
        width={90}
        height={90}
        quality={100}
        priority
      />
      <h1 className="mb-4 mt-2 text-center text-4xl font-bold">MySpot</h1>
      <p className="text-center text-lg font-thin">
        Get up-to-date information, even when there's no connection
      </p>
    </div>
  );
};

export default Header;
