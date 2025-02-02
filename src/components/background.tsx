"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, SoftShadows } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

interface CubeProps {
  position: [number, number, number];
  velocity: [number, number, number];
  rotationSpeed: [number, number, number];
}

function Cube({ position, velocity, rotationSpeed }: CubeProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += rotationSpeed[0];
      ref.current.rotation.y += rotationSpeed[1];
      ref.current.rotation.z += rotationSpeed[2];

      position[0] += velocity[0];
      position[1] += velocity[1];
      position[2] += velocity[2];

      if (Math.abs(position[0]) > 6) velocity[0] *= -1;
      if (Math.abs(position[1]) > 6) velocity[1] *= -1;
      if (Math.abs(position[2]) > 6) velocity[2] *= -1;

      ref.current.position.set(...position);
    }
  });

  return (
    <mesh ref={ref} position={position} castShadow receiveShadow>
      <boxGeometry args={[1.8, 1.8, 1.8]} />
      <meshPhysicalMaterial
        transparent={false}
        opacity={0.9}
        roughness={0.9}
        metalness={0.9}
        transmission={0.05}
        ior={1.05}
        clearcoat={0.1}
        clearcoatRoughness={0.7}
        reflectivity={0.9}
        thickness={1.0}
        specularIntensity={0.3}
        envMapIntensity={0.6}
        emissive={new THREE.Color(`hsl(${Math.random() * 360}, 60%, 30%)`)}
      />
    </mesh>
  );
}

function RotatingCubes() {
  const cubes = Array.from({ length: 5 }).map((_, i) => (
    <Cube
      key={i}
      position={[
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
      ]}
      velocity={[
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
      ]}
      rotationSpeed={[
        Math.random() * 0.008 + 0.001,
        Math.random() * 0.02 + 0.001,
        Math.random() * 0.01 + 0.001,
      ]}
    />
  ));
  return <>{cubes}</>;
}

export function Background() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} shadows>
        <Suspense fallback={null}>
          <SoftShadows size={20} samples={10} focus={0.8} />
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.5}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <Environment
            files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/autumn_field_puresky_1k.hdr"
            background
          />
          <RotatingCubes />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
