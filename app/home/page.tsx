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
    <div className="relative">
      <div className="absolute top-5 right-5">
        <div className="flex gap-4">
          <Link href={Data.socials.linkedin} target="__blank">
            <Image src="/linkedin.png" alt="linkedin" width={25} height={25} />
          </Link>
          <Link href={Data.socials.github} target="__blank">
            <Image src="/github.png" alt="linkedin" width={25} height={25} />
          </Link>
        </div>
      </div>
      <div className="h-screen flex flex-col items-center justify-center ">
        <RiveComponent
          className="h-48 w-48 cursor-pointer hover:scale-105 transition-all ease-in-out duration-400"
          onClick={() => router.push("/chat")}
        />
      </div>
    </div>
  );
}
