"use client";

import Rive, { useRive } from "@rive-app/react-canvas";
import Link from "next/link";
import Lottie from "react-lottie";
import animationArrowWhite from "@/public/lottifiles/arrow-left-white.json";
import animationArrowOrange from "@/public/lottifiles/arrow-left-orange.json";
import { useState } from "react";

export default function NotFoundPage() {
  const [hover, setHover] = useState<boolean>(false);

  const arrowWhiteOptions = {
    loop: true,
    autoplay: true,
    animationData: animationArrowWhite,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const arrowOrangeOptions = {
    loop: true,
    autoplay: true,
    animationData: animationArrowOrange,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { rive, RiveComponent } = useRive({
    src: "/rive/404.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  return (
    <div className="h-screen bg-black relative">
      <Link
        href="/"
        className="absolute left-4 top-4 bg-[#ff725e] border-2 border-[#ff725e] text-white p-2 rounded-md font-semibold hover:bg-white hover:text-[#ff725e] transition-all ease-in-out duration-300 flex items-center gap-[2px]"
        onMouseEnter={() => setHover(!hover)}
        onMouseLeave={() => setHover(!hover)}
      >
        {hover ? (
          <Lottie options={arrowOrangeOptions} height={30} width={30} />
        ) : (
          <Lottie options={arrowWhiteOptions} height={30} width={30} />
        )}
        <span>Go Back</span>
      </Link>
      <RiveComponent className="h-full" />
    </div>
  );
}
