"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function RotatingCubes() {
  const cubes = Array.from({ length: 10 }).map((_, i) => {
    const position = useRef([
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    ]);
    const velocity = useRef([
      (Math.random() - 0.5) * 0.05,
      (Math.random() - 0.5) * 0.05,
      (Math.random() - 0.5) * 0.05,
    ]);
    const rotationSpeed = [
      Math.random() * 0.01 + 0.005,
      Math.random() * 0.04 + 0.005,
      Math.random() * 0.025 + 0.005,
    ];
    const ref = useRef();

    useFrame(() => {
      if (ref.current) {
        ref.current.rotation.x += rotationSpeed[0];
        ref.current.rotation.y += rotationSpeed[1];
        ref.current.rotation.z += rotationSpeed[2];

        position.current[0] += velocity.current[0];
        position.current[1] += velocity.current[1];
        position.current[2] += velocity.current[2];

        if (Math.abs(position.current[0]) > 5) velocity.current[0] *= -1;
        if (Math.abs(position.current[1]) > 5) velocity.current[1] *= -1;
        if (Math.abs(position.current[2]) > 5) velocity.current[2] *= -1;

        ref.current.position.set(...position.current);
      }
    });

    return (
      <mesh key={i} ref={ref} position={position.current}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshPhysicalMaterial
          transparent={true}
          opacity={0.6}
          roughness={0.1}
          metalness={0.8}
          transmission={0.9}
          ior={1.3}
          clearcoat={1}
          clearcoatRoughness={0}
          reflectivity={0.8}
          thickness={0.5}
          specularIntensity={1}
          emissive={
            new THREE.Color(
              `hsl(${(i * 36 + performance.now() / 50) % 360}, 80%, 70%)`
            )
          }
        />
      </mesh>
    );
  });

  return <>{cubes}</>;
}

export function Background() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 5, 2]} intensity={1.8} />
          <RotatingCubes />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
