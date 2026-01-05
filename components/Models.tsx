
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import { Text, Float } from '@react-three/drei';

export const BandageModel: React.FC = () => {
  const groupRef = useRef<Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1, 0.4, 0.1]} />
        <meshStandardMaterial color="#f5e6ca" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[0.3, 0.35, 0.02]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
    </group>
  );
};

export const HearingAidModel: React.FC = () => {
  const meshRef = useRef<Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
    }
  });
  return (
    <group ref={meshRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.25, 0.08, 16, 100]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0.2, 0.1, 0]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  );
};

export const VentilatorModel: React.FC = () => {
  const groupRef = useRef<Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[0.8, 1.2, 0.6]} />
        <meshStandardMaterial color="#f9fafb" />
      </mesh>
      <mesh position={[0, 0.3, 0.31]}>
        <planeGeometry args={[0.6, 0.4]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.3]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
    </group>
  );
};

export const PacemakerModel: React.FC = () => {
  const groupRef = useRef<Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.01;
      groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.05);
    }
  });
  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.08, 0.5, 0.08]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
};

export const HazardIcon: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <Float speed={2} rotationIntensity={1.5} position={position}>
      <mesh>
        <coneGeometry args={[0.4, 0.7, 3]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.2} />
      </mesh>
      <Text position={[0, -0.1, 0.25]} fontSize={0.3} color="#000" font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxK.woff">
        !
      </Text>
    </Float>
  );
};

export const DocumentModel: React.FC = () => {
  const groupRef = useRef<Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });
  return (
    <group ref={groupRef}>
      {[0, 0.05, 0.1].map((z, i) => (
        <mesh key={i} position={[i * 0.05, i * 0.05, z]}>
          <boxGeometry args={[0.7, 0.9, 0.02]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
      ))}
      <mesh position={[0.1, 0.3, 0.12]}>
        <planeGeometry args={[0.4, 0.02]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[0.1, 0.2, 0.12]}>
        <planeGeometry args={[0.4, 0.02]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
    </group>
  );
};

export const CEMarkModel: React.FC = () => {
  const groupRef = useRef<Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.02;
    }
  });
  return (
    <group ref={groupRef}>
      {/* "C" */}
      <mesh position={[-0.25, 0, 0]}>
        <torusGeometry args={[0.4, 0.08, 16, 32, Math.PI]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* "E" */}
      <group position={[0.25, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.4, 0.08, 16, 32, Math.PI]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.1, 0, 0]}>
          <boxGeometry args={[0.3, 0.08, 0.08]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
};
