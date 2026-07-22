import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 90;

type GraphData = {
  positions: THREE.Vector3[];
  adjacency: number[][];
  edges: [number, number][];
  path: number[];
};

function useGraph(): GraphData {
  return useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 6.5,
          (Math.random() - 0.5) * 4.5,
          (Math.random() - 0.5) * 3.5,
        ),
      );
    }

    const adjacency: number[][] = Array.from({ length: NODE_COUNT }, () => []);
    const edgeSet = new Set<string>();
    const edges: [number, number][] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const dists = positions
        .map((p, j) => ({
          j,
          d: i === j ? Infinity : positions[i].distanceTo(p),
        }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);
      for (const { j } of dists) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edges.push([i, j]);
          adjacency[i].push(j);
          adjacency[j].push(i);
        }
      }
    }

    const source = 0;
    let target = 0;
    let maxD = -1;
    positions.forEach((p, i) => {
      const d = p.distanceTo(positions[source]);
      if (d > maxD) {
        maxD = d;
        target = i;
      }
    });

    const prev = new Array(NODE_COUNT).fill(-1);
    const visited = new Array(NODE_COUNT).fill(false);
    const queue = [source];
    visited[source] = true;
    while (queue.length) {
      const cur = queue.shift()!;
      if (cur === target) break;
      for (const n of adjacency[cur]) {
        if (!visited[n]) {
          visited[n] = true;
          prev[n] = cur;
          queue.push(n);
        }
      }
    }
    const path: number[] = [];
    let cur = target;
    while (cur !== -1) {
      path.unshift(cur);
      cur = prev[cur];
    }

    return { positions, adjacency, edges, path };
  }, []);
}

const DataMesh = ({ organized }: { organized: boolean }) => {
  const { positions, edges, path } = useGraph();
  const groupRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<THREE.Mesh[]>([]);
  const highlightProgress = useRef(0);

  const pathNodeSet = useMemo(() => new Set(path), [path]);

  const dimGeom = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(edges.length * 2 * 3);
    edges.forEach(([a, b], i) => {
      arr.set(positions[a].toArray(), i * 6);
      arr.set(positions[b].toArray(), i * 6 + 3);
    });
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [edges, positions]);

  const pathGeom = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array((path.length - 1) * 2 * 3);
    for (let i = 0; i < path.length - 1; i++) {
      arr.set(positions[path[i]].toArray(), i * 6);
      arr.set(positions[path[i + 1]].toArray(), i * 6 + 3);
    }
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [path, positions]);

  const dimMatRef = useRef<THREE.LineBasicMaterial>(null);
  const pathMatRef = useRef<THREE.LineBasicMaterial>(null);
  const pathLineRef = useRef<THREE.LineSegments>(null);

  useFrame((state, delta) => {
    const target = organized ? 1 : 0;
    highlightProgress.current +=
      (target - highlightProgress.current) * Math.min(1, delta * 1.8);
    const p = highlightProgress.current;

    if (dimMatRef.current) dimMatRef.current.opacity = 0.22 - p * 0.14;
    if (pathMatRef.current) pathMatRef.current.opacity = p * 0.95;

    if (pathLineRef.current) {
      const total = path.length - 1;
      const reveal = Math.min(total, Math.floor(p * total * 1.15));
      pathLineRef.current.geometry.setDrawRange(0, reveal * 2);
    }

    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const onPath = pathNodeSet.has(i);
      const scale = onPath ? 1 + p * 0.9 : 1 - p * 0.15;
      mesh.scale.setScalar(scale);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.color.set(onPath ? "#5EEAD4" : "#5B8CFF");
      mat.opacity = onPath ? 0.6 + p * 0.4 : 0.75 - p * 0.35;
    });

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={dimGeom}>
        <lineBasicMaterial
          ref={dimMatRef}
          color="#5B8CFF"
          transparent
          opacity={0.22}
        />
      </lineSegments>
      <lineSegments ref={pathLineRef} geometry={pathGeom}>
        <lineBasicMaterial
          ref={pathMatRef}
          color="#5EEAD4"
          transparent
          opacity={0}
          linewidth={2}
        />
      </lineSegments>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          ref={(el) => {
            if (el) nodeRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color="#5B8CFF" transparent opacity={0.75} />
        </mesh>
      ))}
    </group>
  );
};

export default DataMesh;
