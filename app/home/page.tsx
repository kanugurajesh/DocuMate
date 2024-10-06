"use client";

import { useRive } from "@rive-app/react-canvas";

export default function Home() {
  const { RiveComponent } = useRive({
    src: "/rive/man.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <RiveComponent className="h-48 w-48" />
    </div>
  );
}
