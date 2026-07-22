"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 420;
const CONNECT_RADIUS = 1.15;
const MAX_EDGES = 900;

function useGraphLayout() {
  return useMemo(() => {
    const raw = new Float32Array(COUNT * 3);
    const structured = new Float32Array(COUNT * 3);

    const CLUSTERS = 6;
    const centers = Array.from({ length: CLUSTERS }, (_, i) => {
      const a = (i / CLUSTERS) * Math.PI * 2;
      const r = 2.6;
      return new THREE.Vector3(
        Math.cos(a) * r,
        Math.sin(a) * r * 0.62,
        Math.sin(a * 2.0) * 0.6,
      );
    });

    for (let i = 0; i < COUNT; i++) {
      const r = 3.4 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      raw[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      raw[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      raw[i * 3 + 2] = r * Math.cos(phi);

      const c = centers[i % CLUSTERS];
      const localR = Math.pow(Math.random(), 0.5) * 0.85;
      const localA = Math.random() * Math.PI * 2;
      const localP = Math.random() * Math.PI;
      structured[i * 3 + 0] =
        c.x + Math.cos(localA) * Math.sin(localP) * localR;
      structured[i * 3 + 1] =
        c.y + Math.sin(localA) * Math.sin(localP) * localR * 0.8;
      structured[i * 3 + 2] = c.z + Math.cos(localP) * localR * 0.5;
    }

    const edges: [number, number][] = [];
    outer: for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = structured[i * 3] - structured[j * 3];
        const dy = structured[i * 3 + 1] - structured[j * 3 + 1];
        const dz = structured[i * 3 + 2] - structured[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < CONNECT_RADIUS) {
          edges.push([i, j]);
          if (edges.length >= MAX_EDGES) break outer;
        }
      }
    }

    return { raw, structured, edges };
  }, []);
}

function Graph({ progress }: { progress: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { raw, structured, edges } = useGraphLayout();
  const { pointer } = useThree();

  const nodePositions = useMemo(() => new Float32Array(COUNT * 3), []);
  const nodeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    return geo;
  }, [nodePositions]);

  const edgePositions = useMemo(
    () => new Float32Array(edges.length * 2 * 3),
    [edges],
  );
  const edgeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));
    return geo;
  }, [edgePositions]);

  useFrame((state) => {
    const t = progress.current;
    const time = state.clock.getElapsedTime();
    const nodeArr = nodeGeometry.attributes.position.array as Float32Array;

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      const drift = Math.sin(time * 0.4 + i * 0.2) * 0.04 * (1 - t);
      const dx = structured[ix] - pointer.x * 3.5;
      const dy = structured[ix + 1] - pointer.y * 2.2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ripple = Math.sin(dist * 1.6 - time * 1.3) * 0.05 * t;

      nodeArr[ix] = THREE.MathUtils.lerp(raw[ix], structured[ix], t) + drift;
      nodeArr[ix + 1] =
        THREE.MathUtils.lerp(raw[ix + 1], structured[ix + 1], t) + ripple;
      nodeArr[ix + 2] = THREE.MathUtils.lerp(
        raw[ix + 2],
        structured[ix + 2],
        t,
      );
    }
    nodeGeometry.attributes.position.needsUpdate = true;

    const edgeArr = edgeGeometry.attributes.position.array as Float32Array;
    for (let e = 0; e < edges.length; e++) {
      const [a, b] = edges[e];
      for (let k = 0; k < 3; k++) {
        edgeArr[e * 6 + k] = nodeArr[a * 3 + k];
        edgeArr[e * 6 + 3 + k] = nodeArr[b * 3 + k];
      }
    }
    edgeGeometry.attributes.position.needsUpdate = true;

    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = Math.max(0, (t - 0.45) / 0.55) * 0.5;
    }
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.55 + t * 0.4;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (1 - t) * 0.4 + pointer.x * 0.06,
        0.05,
      );
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments ref={linesRef} geometry={edgeGeometry}>
        <lineBasicMaterial color="#9B7BFF" transparent opacity={0} />
      </lineSegments>
      <points ref={pointsRef} geometry={nodeGeometry}>
        <pointsMaterial
          size={0.05}
          color="#7FA3FF"
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

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
