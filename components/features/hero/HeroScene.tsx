import { Canvas } from "@react-three/fiber";
import Graph from "./Graph";

const HeroScene = ({
  progress,
}: {
  progress: React.MutableRefObject<number>;
}) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.75]}
    >
      <ambientLight intensity={0.6} />
      <Graph progress={progress} />
    </Canvas>
  );
};

export default HeroScene;
