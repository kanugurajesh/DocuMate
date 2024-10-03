"use client";

import Rive, { useRive } from "@rive-app/react-canvas";
import Link from "next/link";

export default function NotFoundPage() {
  const { rive, RiveComponent } = useRive({
    src: "/rive/404.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  return (
    <div className="h-screen bg-black">
      <Link href="/">Go Back</Link>
      <RiveComponent className="h-full" />
    </div>
  );
}
