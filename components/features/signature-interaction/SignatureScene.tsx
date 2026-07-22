import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import DataMesh from "./DataMesh";

function ParallaxRig({ children }: { children: React.ReactNode }) {
  const rig = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!rig.current) return;
    const { pointer } = state;
    rig.current.rotation.x = THREE.MathUtils.lerp(
      rig.current.rotation.x,
      pointer.y * 0.22,
      0.04,
    );
    rig.current.rotation.y = THREE.MathUtils.lerp(
      rig.current.rotation.y,
      pointer.x * 0.3,
      0.04,
    );
  });
  return <group ref={rig}>{children}</group>;
}

const SignatureScene = ({ organized }: { organized: boolean }) => {
  return (
    <Canvas camera={{ position: [0, 0, 7.5], fov: 42 }} dpr={[1, 1.75]}>
      <ambientLight intensity={0.8} />
      <ParallaxRig>
        <DataMesh organized={organized} />
      </ParallaxRig>
    </Canvas>
  );
};

export default SignatureScene;
