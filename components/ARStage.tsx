
import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { MDRTopic, TopicData } from '../types';
import { 
  BandageModel, 
  HearingAidModel, 
  VentilatorModel, 
  PacemakerModel, 
  HazardIcon, 
  DocumentModel, 
  CEMarkModel 
} from './Models';
import { DEVICE_CLASSES } from '../constants';

interface ARStageProps {
  activeTopic: TopicData | null;
  onClose: () => void;
}

const ARContent: React.FC<{ activeTopic: TopicData | null, onClose: () => void }> = ({ activeTopic, onClose }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [selectedClassIdx, setSelectedClassIdx] = useState(0);
  const { size } = useThree();

  // Responsive scale factor based on screen width
  const responsiveScale = size.width < 600 ? size.width / 500 : 1;

  useEffect(() => {
    if (activeTopic?.id === MDRTopic.CLASSIFICATION) {
      setSelectedClassIdx(0);
    }
  }, [activeTopic]);

  // Make the content follow the camera view smoothly
  useFrame((state) => {
    if (groupRef.current) {
      const targetPos = new THREE.Vector3(0, 0, 0);
      groupRef.current.position.lerp(targetPos, 0.1);
      // We don't rotate the group directly to allow OrbitControls to work,
      // but we ensure components always face the user.
    }
  });

  const renderActiveModel = () => {
    if (!activeTopic) return null;

    switch (activeTopic.id) {
      case MDRTopic.CLASSIFICATION:
        const device = DEVICE_CLASSES[selectedClassIdx];
        return (
          <group position={[0, 0.8 * responsiveScale, 0]}>
            <Float speed={2.5} rotationIntensity={1} floatIntensity={1}>
              <group scale={responsiveScale * 1.2}>
                {device.modelType === 'bandage' && <BandageModel />}
                {device.modelType === 'hearing-aid' && <HearingAidModel />}
                {device.modelType === 'ventilator' && <VentilatorModel />}
                {device.modelType === 'pacemaker' && <PacemakerModel />}
              </group>
            </Float>
            <Html position={[0, -0.8 * responsiveScale, 0]} center>
              <div 
                className="bg-black/90 backdrop-blur-2xl p-4 rounded-[2rem] text-white text-xs border border-white/20 shadow-2xl animate-in fade-in zoom-in duration-500 pointer-events-auto"
                style={{ width: `${Math.min(size.width - 40, 320)}px` }}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/40">
                      <i className={`fas ${device.icon} text-blue-400`}></i>
                    </div>
                    <span className="font-black text-blue-400 uppercase tracking-tighter">{device.label}</span>
                  </div>
                  <div className="flex gap-2">
                    {DEVICE_CLASSES.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setSelectedClassIdx(i)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedClassIdx === i ? 'bg-blue-500 scale-125' : 'bg-white/20'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-bold leading-tight">{device.description}</p>
                  <div className="bg-white/5 p-2 rounded-xl">
                    <p className="text-[10px] text-blue-200/70 italic">{device.examples.join(', ')}</p>
                  </div>
                </div>
              </div>
            </Html>
          </group>
        );

      case MDRTopic.RISK_MANAGEMENT:
        return (
          <group position={[0, 0.8 * responsiveScale, 0]}>
            <group scale={responsiveScale}>
              <HazardIcon position={[-0.8, 0, 0]} />
              <HazardIcon position={[0, 0.4, 0.3]} />
              <HazardIcon position={[0.8, -0.1, 0]} />
            </group>
          </group>
        );

      case MDRTopic.TECHNICAL_DOCS:
        return (
          <group position={[0, 0.8 * responsiveScale, 0]}>
            <Float speed={2} scale={responsiveScale}>
              <DocumentModel />
            </Float>
          </group>
        );

      case MDRTopic.CE_MARKING:
        return (
          <group position={[0, 0.8 * responsiveScale, 0]}>
            <Float speed={4} scale={responsiveScale}>
              <CEMarkModel />
            </Float>
          </group>
        );

      default:
        return (
          <group position={[0, 0.8 * responsiveScale, 0]}>
            <Float speed={3} scale={responsiveScale}>
              <mesh>
                <octahedronGeometry args={[0.5, 2]} />
                <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} wireframe />
              </mesh>
            </Float>
          </group>
        );
    }
  };

  return (
    <group ref={groupRef}>
      {renderActiveModel()}
      
      {activeTopic && (
        <Html position={[0, -0.1, 0]} center transform={false}>
          <div 
            className="bg-white/95 backdrop-blur-3xl p-6 md:p-10 rounded-[3rem] shadow-2xl border border-white pointer-events-auto select-none overflow-hidden"
            style={{ 
              width: `${Math.min(size.width - 40, 480)}px`,
              maxHeight: `${size.height * 0.55}px` 
            }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-700 rounded-2xl flex items-center justify-center text-white shadow-xl flex-shrink-0">
                  <i className={`fas ${activeTopic.icon} text-xl`}></i>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight uppercase tracking-tighter">{activeTopic.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-6 h-0.5 bg-blue-600 rounded-full"></div>
                    <span className="text-[9px] text-blue-600 font-black uppercase tracking-widest">Tutor Module</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-1 text-slate-300 hover:text-red-500 transition-all active:scale-90"
              >
                <i className="fas fa-times-circle text-3xl"></i>
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: `${size.height * 0.35}px` }}>
              {activeTopic.content.map((p, i) => (
                <p key={i} className="text-slate-800 text-sm font-bold leading-relaxed">{p}</p>
              ))}

              {activeTopic.subsections?.map((sub, i) => (
                <div key={i} className="mt-4 bg-blue-50/60 p-5 rounded-[2rem] border border-blue-100/50">
                  <h3 className="font-black text-blue-900 text-[10px] mb-3 uppercase tracking-widest flex items-center gap-2">
                    <i className="fas fa-info-circle text-blue-600"></i>
                    {sub.label}
                  </h3>
                  <ul className="space-y-3">
                    {sub.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-xs text-slate-700">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        <span className="font-bold leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

const ARStage: React.FC<ARStageProps> = ({ activeTopic, onClose }) => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas shadows dpr={[1, 2]} alpha>
        <PerspectiveCamera makeDefault position={[0, 0.5, 4.5]} fov={50} />
        <ambientLight intensity={1.5} />
        <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-5, -5, -5]} color="#3b82f6" intensity={1} />
        <Environment preset="city" />
        
        <Suspense fallback={null}>
          <ARContent activeTopic={activeTopic} onClose={onClose} />
        </Suspense>

        <OrbitControls 
          enablePan={false} 
          minDistance={3} 
          maxDistance={8} 
          rotateSpeed={0.5}
          dampingFactor={0.1}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default ARStage;
