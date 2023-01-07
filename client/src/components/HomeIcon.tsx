import Image, { type StaticImageData } from "next/image";
import { type FC } from "react";

interface Props {
  text: string;
  icon: string | StaticImageData;
}

const HomeIcon: FC<Props> = ({ text, icon }) => {
  return (
    <div className="h-30 w-30 m-2 flex flex-col items-center justify-center rounded-xl p-2 hover:bg-slate-100">
      <Image src={icon} alt={text} width={75} height={75} />
      <div className="text-sm font-thin text-gray-900">{text}</div>
    </div>
  );
};

export default HomeIcon;
