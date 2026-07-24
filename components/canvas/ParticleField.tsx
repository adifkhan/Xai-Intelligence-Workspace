"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scrollStore";

const COUNT = 2200;
const HUBS = 10;
const GCOLS = 15;
const GROWS = 10;
const NGRAPH = GCOLS * GROWS;

function randInSphere(radius: number): THREE.Vector3 {
  const u = Math.random();
  const v = Math.random();
  const theta = u * 2 * Math.PI;
  const phi = Math.acos(2 * v - 1);
  const r = radius * Math.cbrt(Math.random());
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  );
}

function smoothstep(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const gridLinesRef = useRef<THREE.LineSegments>(null!);
  const networkLinesRef = useRef<THREE.LineSegments>(null!);
  const hubGroupRef = useRef<THREE.Group>(null!);
  const rigRef = useRef<THREE.Group>(null!);

  const dragRot = useRef({ x: 0, y: 0 });

  const data = useMemo(() => {
    const chaotic = new Float32Array(COUNT * 3);
    const grid = new Float32Array(COUNT * 3);
    const network = new Float32Array(COUNT * 3);
    const colorBase = new Float32Array(COUNT * 3);
    const isInsight = new Uint8Array(COUNT);

    const dimX = 30;
    const dimY = 20;
    const dimZ = Math.ceil(COUNT / (dimX * dimY));
    let gi = 0;
    for (let gx = 0; gx < dimX && gi < COUNT; gx++) {
      for (let gy = 0; gy < dimY && gi < COUNT; gy++) {
        for (let gz = 0; gz < dimZ && gi < COUNT; gz++) {
          grid[gi * 3] = (gx - dimX / 2) * 0.34;
          grid[gi * 3 + 1] = (gy - dimY / 2) * 0.34;
          grid[gi * 3 + 2] = (gz - dimZ / 2) * 0.34;
          gi++;
        }
      }
    }

    const hubPositions: THREE.Vector3[] = [];
    for (let h = 0; h < HUBS; h++) hubPositions.push(randInSphere(4.4));

    for (let i = 0; i < COUNT; i++) {
      const c = randInSphere(6.5);
      chaotic[i * 3] = c.x;
      chaotic[i * 3 + 1] = c.y;
      chaotic[i * 3 + 2] = c.z;

      const hub = hubPositions[i % HUBS];
      const off = randInSphere(1.1);
      network[i * 3] = hub.x + off.x;
      network[i * 3 + 1] = hub.y + off.y;
      network[i * 3 + 2] = hub.z + off.z;

      const insight = i % 9 === 0 ? 1 : 0;
      isInsight[i] = insight;
      colorBase[i * 3] = insight ? 1.0 : 0.357;
      colorBase[i * 3 + 1] = insight ? 0.706 : 0.518;
      colorBase[i * 3 + 2] = insight ? 0.329 : 1.0;
    }

    const graphGrid: THREE.Vector3[] = [];
    const graphChaotic: THREE.Vector3[] = [];
    const graphNetwork: THREE.Vector3[] = [];
    const dx = 0.62;
    const dy = 0.62;
    for (let row = 0; row < GROWS; row++) {
      for (let col = 0; col < GCOLS; col++) {
        graphGrid.push(
          new THREE.Vector3((col - GCOLS / 2) * dx, (row - GROWS / 2) * dy, 0),
        );
      }
    }
    const gHubs: THREE.Vector3[] = [];
    for (let h = 0; h < HUBS; h++) gHubs.push(randInSphere(4.2));
    for (let n = 0; n < NGRAPH; n++) {
      graphChaotic.push(randInSphere(6));
      const hub = gHubs[n % HUBS];
      const off = randInSphere(1.0);
      graphNetwork.push(
        new THREE.Vector3(hub.x + off.x, hub.y + off.y, hub.z + off.z),
      );
    }

    const gridEdges: [number, number][] = [];
    for (let r = 0; r < GROWS; r++) {
      for (let c = 0; c < GCOLS; c++) {
        const idx = r * GCOLS + c;
        if (c < GCOLS - 1) gridEdges.push([idx, idx + 1]);
        if (r < GROWS - 1) gridEdges.push([idx, idx + GCOLS]);
      }
    }

    return {
      chaotic,
      grid,
      network,
      colorBase,
      isInsight,
      graphGrid,
      graphChaotic,
      graphNetwork,
      gHubs,
      gridEdges,
    };
  }, []);

  const livePositions = useMemo(() => data.chaotic.slice(), [data]);
  const liveColors = useMemo(() => data.colorBase.slice(), [data]);
  const graphCurrent = useMemo(() => {
    const arr = new Float32Array(NGRAPH * 3);
    data.graphChaotic.forEach((v, i) => {
      arr[i * 3] = v.x;
      arr[i * 3 + 1] = v.y;
      arr[i * 3 + 2] = v.z;
    });
    return arr;
  }, [data]);

  const gridLinePositions = useMemo(
    () => new Float32Array(data.gridEdges.length * 2 * 3),
    [data],
  );
  const networkLinePositions = useMemo(
    () => new Float32Array(NGRAPH * 2 * 3),
    [],
  );

  useFrame((state) => {
    dragRot.current.y += (scrollStore.targetRotY - dragRot.current.y) * 0.08;
    dragRot.current.x += (scrollStore.targetRotX - dragRot.current.x) * 0.08;

    if (rigRef.current) {
      rigRef.current.rotation.y =
        dragRot.current.y + state.clock.elapsedTime * 0.03;
      rigRef.current.rotation.x = dragRot.current.x * 0.6;
    }

    const morphT = smoothstep(scrollStore.morphT);
    const networkT = smoothstep(scrollStore.networkT);

    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const colorAttr = pointsRef.current.geometry.attributes
      .color as THREE.BufferAttribute;

    for (let i = 0; i < COUNT; i++) {
      const mx = lerp(data.chaotic[i * 3], data.grid[i * 3], morphT);
      const my = lerp(data.chaotic[i * 3 + 1], data.grid[i * 3 + 1], morphT);
      const mz = lerp(data.chaotic[i * 3 + 2], data.grid[i * 3 + 2], morphT);
      livePositions[i * 3] = lerp(mx, data.network[i * 3], networkT);
      livePositions[i * 3 + 1] = lerp(my, data.network[i * 3 + 1], networkT);
      livePositions[i * 3 + 2] = lerp(mz, data.network[i * 3 + 2], networkT);

      if (data.isInsight[i]) {
        const glow = Math.min(1, morphT * 0.6 + networkT * 0.4);
        liveColors[i * 3] = lerp(0.357, 1.0, glow);
        liveColors[i * 3 + 1] = lerp(0.518, 0.706, glow);
        liveColors[i * 3 + 2] = lerp(1.0, 0.329, glow);
      }
    }
    posAttr.array = livePositions;
    posAttr.needsUpdate = true;
    colorAttr.array = liveColors;
    colorAttr.needsUpdate = true;

    for (let n = 0; n < NGRAPH; n++) {
      const gm = data.graphGrid[n];
      const gc = data.graphChaotic[n];
      const gn = data.graphNetwork[n];
      const mx = lerp(gc.x, gm.x, morphT);
      const my = lerp(gc.y, gm.y, morphT);
      const mz = lerp(gc.z, gm.z, morphT);
      graphCurrent[n * 3] = lerp(mx, gn.x, networkT);
      graphCurrent[n * 3 + 1] = lerp(my, gn.y, networkT);
      graphCurrent[n * 3 + 2] = lerp(mz, gn.z, networkT);
    }

    const gridPosAttr = gridLinesRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    data.gridEdges.forEach(([a, b], i) => {
      gridLinePositions[i * 6] = graphCurrent[a * 3];
      gridLinePositions[i * 6 + 1] = graphCurrent[a * 3 + 1];
      gridLinePositions[i * 6 + 2] = graphCurrent[a * 3 + 2];
      gridLinePositions[i * 6 + 3] = graphCurrent[b * 3];
      gridLinePositions[i * 6 + 4] = graphCurrent[b * 3 + 1];
      gridLinePositions[i * 6 + 5] = graphCurrent[b * 3 + 2];
    });
    gridPosAttr.array = gridLinePositions;
    gridPosAttr.needsUpdate = true;

    const netPosAttr = networkLinesRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    for (let n = 0; n < NGRAPH; n++) {
      const hub = data.gHubs[n % HUBS];
      networkLinePositions[n * 6] = graphCurrent[n * 3];
      networkLinePositions[n * 6 + 1] = graphCurrent[n * 3 + 1];
      networkLinePositions[n * 6 + 2] = graphCurrent[n * 3 + 2];
      networkLinePositions[n * 6 + 3] = hub.x;
      networkLinePositions[n * 6 + 4] = hub.y;
      networkLinePositions[n * 6 + 5] = hub.z;
    }
    netPosAttr.array = networkLinePositions;
    netPosAttr.needsUpdate = true;

    const gridMat = gridLinesRef.current.material as THREE.LineBasicMaterial;
    gridMat.opacity = Math.max(0, morphT * (1 - networkT * 1.3)) * 0.5;
    const netMat = networkLinesRef.current.material as THREE.LineBasicMaterial;
    netMat.opacity = networkT * 0.65;

    hubGroupRef.current.children.forEach((child) => {
      const mesh = child as THREE.Mesh;
      (mesh.material as THREE.MeshBasicMaterial).opacity = networkT * 0.9;
    });
  });

  return (
    <group ref={rigRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[livePositions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[liveColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>

      <lineSegments ref={gridLinesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[gridLinePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#5B84FF" transparent opacity={0} />
      </lineSegments>

      <lineSegments ref={networkLinesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[networkLinePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#FFB454" transparent opacity={0} />
      </lineSegments>

      <group ref={hubGroupRef}>
        {data.gHubs.map((hub, i) => (
          <mesh key={i} position={hub}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshBasicMaterial color="#FFB454" transparent opacity={0} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
