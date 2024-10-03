import Rive, { useRive } from "@rive-app/react-canvas";

export default function Home() {
  const { rive, RiveComponent } = useRive({
    src: "https://cdn.rive.app/animations/vehicles.riv",
    stateMachines: "bumpy",
    autoplay: false,
  });

  return (
    <div>
      <RiveComponent />
    </div>
  );
}
