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
      <div className="h-screen flex flex-col items-center justify-center ">
        <RiveComponent
          className="h-48 w-48 cursor-pointer hover:scale-105 transition-all ease-in-out duration-400"
          onClick={() => router.push("/chat")}
        />
      </div>
    </div>
  );
}
