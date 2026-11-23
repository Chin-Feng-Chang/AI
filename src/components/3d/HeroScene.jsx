import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function OutlinedMesh({ geometry, material, outlineScale = 1.05, children, position, rotation }) {
  const outlineMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.BackSide,
      }),
    []
  );

  return (
    <mesh geometry={geometry} material={material} position={position} rotation={rotation}>
      <mesh
        geometry={geometry}
        material={outlineMat}
        scale={[outlineScale, outlineScale, outlineScale]}
      />
      {children}
    </mesh>
  );
}

export default function HeroScene({ burstTrigger = 0 }) {
  const heroGroupRef = useRef();
  const innerReactorRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const podRefs = useRef([]);
  const burstEnergyRef = useRef(0);
  const [hovered, setHovered] = useState(false);

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const halfX = window.innerWidth / 2;
      const halfY = window.innerHeight / 2;
      mouseRef.current.x = (e.clientX - halfX) * 0.0008;
      mouseRef.current.y = (e.clientY - halfY) * 0.0008;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Materials matching Stitch hero_3d_1/code.html
  const materials = useMemo(() => {
    return {
      toonCyan: new THREE.MeshToonMaterial({
        color: 0x00f0ff,
        emissive: 0x004455,
      }),
      toonPink: new THREE.MeshToonMaterial({
        color: 0xff2a85,
        emissive: 0x440022,
      }),
      toonGold: new THREE.MeshToonMaterial({
        color: 0xffe600,
        emissive: 0x332a00,
      }),
      reactorWire: new THREE.MeshBasicMaterial({
        color: 0xffe600,
        wireframe: true,
      }),
    };
  }, []);

  const geometries = useMemo(() => {
    return {
      core: new THREE.IcosahedronGeometry(1.2, 1),
      innerReactor: new THREE.OctahedronGeometry(0.7, 0),
      ring1: new THREE.TorusGeometry(2.0, 0.08, 8, 32),
      ring2: new THREE.TorusGeometry(2.4, 0.06, 8, 32),
      pod: new THREE.ConeGeometry(0.25, 0.7, 5),
    };
  }, []);

  const podConfigs = useMemo(() => {
    return [0, 1, 2, 3].map((i) => {
      const angle = (i / 4) * Math.PI * 2;
      return {
        angle,
        speed: 0.015 + i * 0.005,
        radius: 2.8 + i * 0.2,
        yOffset: (i % 2 === 0 ? 0.45 : -0.45),
      };
    });
  }, []);

  const particlePositions = useMemo(() => {
    const count = 60;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 16;
      arr[i + 1] = (Math.random() - 0.5) * 12;
      arr[i + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, []);

  const triggerBurst = () => {
    burstEnergyRef.current = 1.0;
    materials.toonPink.emissive.setHex(0xffffff);
    materials.toonCyan.emissive.setHex(0x00eefc);
    setTimeout(() => {
      materials.toonPink.emissive.setHex(0x440022);
      materials.toonCyan.emissive.setHex(0x004455);
    }, 300);
  };

  useEffect(() => {
    if (burstTrigger > 0) {
      triggerBurst();
    }
  }, [burstTrigger]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const m = mouseRef.current;
    m.targetX += (m.x - m.targetX) * 0.05;
    m.targetY += (m.y - m.targetY) * 0.05;

    if (heroGroupRef.current) {
      heroGroupRef.current.rotation.y = elapsedTime * 0.35 + m.targetX * 1.5;
      heroGroupRef.current.rotation.x = Math.sin(elapsedTime * 0.5) * 0.15 + m.targetY * 1.5;
      heroGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.2;
    }

    if (innerReactorRef.current) {
      innerReactorRef.current.rotation.x = -elapsedTime * 1.2;
      innerReactorRef.current.rotation.y = elapsedTime * 1.8;
      const pulseScale =
        1.0 + Math.sin(elapsedTime * 4.0) * 0.15 + burstEnergyRef.current * 0.55;
      innerReactorRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = elapsedTime * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = elapsedTime * 0.3;
    }

    podConfigs.forEach((pod, idx) => {
      pod.angle += pod.speed;
      const mesh = podRefs.current[idx];
      if (mesh) {
        mesh.position.x = Math.cos(pod.angle) * pod.radius;
        mesh.position.z = Math.sin(pod.angle) * pod.radius;
        mesh.position.y = pod.yOffset + Math.sin(elapsedTime * 2.0 + pod.angle) * 0.35;
        mesh.rotation.y = pod.angle + Math.PI / 2;
      }
    });

    if (burstEnergyRef.current > 0.001) {
      burstEnergyRef.current *= 0.92;
    } else {
      burstEnergyRef.current = 0;
    }
  });

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(Math.PI * 3) / 4}
      />

      <group
        ref={heroGroupRef}
        onClick={(e) => {
          e.stopPropagation();
          triggerBurst();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.04 : 1}
      >
        {/* 1. Central Levitating Cyber Core */}
        <OutlinedMesh
          geometry={geometries.core}
          material={materials.toonCyan}
          outlineScale={1.04}
        >
          <mesh
            ref={innerReactorRef}
            geometry={geometries.innerReactor}
            material={materials.reactorWire}
          />
        </OutlinedMesh>

        {/* 2. Dual Orbiting Manga Rings */}
        <group ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
          <OutlinedMesh
            geometry={geometries.ring1}
            material={materials.toonPink}
            outlineScale={1.15}
          />
        </group>

        <group ref={ring2Ref} rotation={[0, Math.PI / 4, 0]}>
          <OutlinedMesh
            geometry={geometries.ring2}
            material={materials.toonCyan}
            outlineScale={1.15}
          />
        </group>

        {/* 3. Floating Tech Bits Pods */}
        {podConfigs.map((pod, idx) => (
          <group
            key={idx}
            ref={(el) => (podRefs.current[idx] = el)}
            position={[
              Math.cos(pod.angle) * pod.radius,
              pod.yOffset,
              Math.sin(pod.angle) * pod.radius,
            ]}
            rotation={[0, 0, Math.PI]}
          >
            <OutlinedMesh
              geometry={geometries.pod}
              material={materials.toonGold}
              outlineScale={1.1}
            />
          </group>
        ))}
      </group>

      {/* Background Floating Manga Speed Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#00f0ff" size={0.06} transparent opacity={0.75} />
      </points>
    </>
  );
}
