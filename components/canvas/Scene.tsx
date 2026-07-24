"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleField from "./ParticleField";
import { scrollStore } from "@/lib/scrollStore";

gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
  const wrapperRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const flowTrigger = ScrollTrigger.create({
      trigger: "#insight-flow",
      start: "top bottom",
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        scrollStore.morphT = self.progress;
      },
    });

    const sigTrigger = ScrollTrigger.create({
      trigger: "#automations",
      start: "top bottom",
      end: "center center",
      scrub: true,
      onUpdate: (self) => {
        scrollStore.networkT = self.progress;
      },
    });

    const canvasEl = wrapperRef.current;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onPointerUp = () => {
      isDragging = false;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      scrollStore.targetRotY += (e.clientX - lastX) * 0.005;
      scrollStore.targetRotX += (e.clientY - lastY) * 0.005;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    canvasEl.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    const dragToggle = ScrollTrigger.create({
      trigger: "#automations",
      start: "top 60%",
      end: "bottom top",
      onToggle: (self) => {
        canvasEl.style.pointerEvents = self.isActive ? "auto" : "none";
        canvasEl.classList.toggle("cursor-grab", self.isActive);
        scrollStore.dragActive = self.isActive;
        window.dispatchEvent(
          new CustomEvent("drag-hint", { detail: self.isActive }),
        );
      },
    });

    return () => {
      flowTrigger.kill();
      sigTrigger.kill();
      dragToggle.kill();
      canvasEl.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
