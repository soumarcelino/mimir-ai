"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, SoftShadows } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

interface CubeProps {
  position: [number, number, number];
  velocity: [number, number, number];
  rotationSpeed: [number, number, number];
}

function Cube({ position, velocity, rotationSpeed }: CubeProps) {
  const ref = useRef<THREE.Mesh>(null);
  const acceleration = 1.1; // Aceleração ao colidir com as bordas

  useFrame(({ size }) => {
    if (ref.current) {
      ref.current.rotation.x += rotationSpeed[0];
      ref.current.rotation.y += rotationSpeed[1];
      ref.current.rotation.z += rotationSpeed[2];

      position[0] += velocity[0];
      position[1] += velocity[1];
      position[2] += velocity[2];

      const boundsX = size.width / 100;
      const boundsY = size.height / 100;
      const boundsZ = 6; // Ajuste de profundidade

      if (Math.abs(position[0]) > boundsX) {
        velocity[0] *= -acceleration;
        position[0] = Math.sign(position[0]) * boundsX;
      }
      if (Math.abs(position[1]) > boundsY) {
        velocity[1] *= -acceleration;
        position[1] = Math.sign(position[1]) * boundsY;
      }
      if (Math.abs(position[2]) > boundsZ) {
        velocity[2] *= -acceleration;
        position[2] = Math.sign(position[2]) * boundsZ;
      }

      ref.current.position.set(...position);
    }
  });

  return (
    <mesh ref={ref} position={position} castShadow receiveShadow>
      <boxGeometry args={[1.8, 1.8, 1.8]} />
      <meshPhysicalMaterial
        roughness={0.05}
        metalness={1.0}
        reflectivity={1.0}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        thickness={2.0}
        specularIntensity={0.9}
        envMapIntensity={1.2}
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
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ]}
      velocity={[
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
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

function CinematicCamera() {
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.1) * 15;
    camera.position.z = Math.cos(t * 0.1) * 15;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function Background() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} shadows>
        <Suspense fallback={null}>
          <SoftShadows size={20} samples={10} focus={0.8} />
          <ambientLight intensity={1.0} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={2.0}
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
          <pointLight position={[-5, 5, 5]} intensity={0.8} color="white" />
          <spotLight
            position={[10, -5, -10]}
            intensity={1.2}
            angle={0.3}
            penumbra={0.5}
          />
          <Environment files="/field.hdr" background />
          <CinematicCamera />
          <RotatingCubes />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
