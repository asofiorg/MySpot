import { type FC, Fragment, useState } from "react";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import HomeIcon from "./HomeIcon";

import { Transition } from "@headlessui/react";
import { Cross1Icon } from "@radix-ui/react-icons";
import Image from "next/image";

type Props = {
  name: string;
  image: string;
  description: string;
};

const Modal: FC<Props> = ({ name, image, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger>
        <HomeIcon icon={image} text={name} />
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className="fixed top-[50%] left-[50%] z-50 w-[95vw] max-w-md -translate-x-[50%] -translate-y-[50%] rounded-lg bg-white p-4 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 md:w-full"
            >
              <DialogPrimitive.Close className="absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <Cross1Icon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
              </DialogPrimitive.Close>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={image}
                  alt="MySpot"
                  width={75}
                  height={75}
                  quality={100}
                />
                <DialogPrimitive.Title className="text-center text-2xl font-medium">
                  {name}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-2 text-center text-lg font-thin">
                  {description}
                </DialogPrimitive.Description>
              </div>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Modal;
