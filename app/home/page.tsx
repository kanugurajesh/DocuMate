"use client";

import { useRive } from "@rive-app/react-canvas";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Data from "@/data/data";

export default function Home() {
  const router = useRouter();

  const { RiveComponent } = useRive({
    src: "/rive/man.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  return (
    <div className="relative xl:max-w-7xl mx-auto">
      <div className="absolute top-8 right-6">
        <div className="flex gap-4">
          <Link
            href={Data.socials.linkedin}
            target="__blank"
            className="hover:scale-105"
          >
            <Image src="/linkedin.png" alt="linkedin" width={26} height={26} />
          </Link>
          <Link
            href={Data.socials.github}
            target="__blank"
            className="hover:scale-105"
          >
            <Image src="/github.png" alt="linkedin" width={26} height={26} />
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center pt-28 gap-5 max-w-2xl mx-auto">
        <RiveComponent
          className="h-48 w-48 cursor-pointer hover:scale-105 transition-all ease-in-out duration-400"
          onClick={() => router.push("/chat")}
        />
        <h1 className="text-center text-gray-900 font-medium tracking-wider text-3xl sm:text-6xl animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
          Seamlessly interact with any PDF using AI.
        </h1>
        <p className="w-11/12 leading-6 text-lg text-center text-gray-600 mt-6">
          Upload your PDF and instantly receive answers to all your questions
          related to its content 🚀.
        </p>
        <div className="flex gap-4 items-center mt-6">
          <Link
            href={Data.socials.github}
            className="bg-black text-white rounded-md text-lg p-3 px-5 border-2 border-black font-semibold tracking-wider hover:text-black hover:bg-white transition-all ease-in-out duration-300"
          >
            Github ➡
          </Link>
          <Link
            href="/chat"
            className="bg-white p-3 px-5 rounded-md text-lg border-2 border-black font-semibold tracking-wider hover:text-white hover:bg-black transition-all ease-in-out duration-300"
          >
            To App ➡
          </Link>
        </div>
      </div>
    </div>
  );
}
