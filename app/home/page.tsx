"use client";

import { useRive } from "@rive-app/react-canvas";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { RiveComponent } = useRive({
    src: "/rive/man.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  return (
    <div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
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
