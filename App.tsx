
import React, { useState, useEffect } from 'react';
import { MDRTopic, TopicData } from './types';
import { MDR_TOPICS } from './constants';
import CameraFeed from './components/CameraFeed';
import ARStage from './components/ARStage';

const App: React.FC = () => {
  const [activeTopicId, setActiveTopicId] = useState<MDRTopic | null>(null);
  const [cameraStatus, setCameraStatus] = useState<'idle' | 'requesting' | 'active' | 'denied' | 'error'>('idle');

  const activeTopic = MDR_TOPICS.find(t => t.id === activeTopicId) || null;

  // Prevent default scroll behavior on mobile
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('.custom-scrollbar')) return;
      e.preventDefault();
    };
    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => document.removeEventListener('touchmove', preventDefault);
  }, []);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden font-sans select-none touch-none">
      {/* Camera Base Layer */}
      <CameraFeed onStatusChange={setCameraStatus} />

      {/* 3D Content Layer (Canvas) */}
      {cameraStatus === 'active' && (
        <ARStage activeTopic={activeTopic} onClose={() => setActiveTopicId(null)} />
      )}

      {/* UI Navigation Overlay */}
      <div className={`absolute inset-0 pointer-events-none flex flex-col justify-between p-4 safe-area-inset z-20 transition-opacity duration-1000 ${cameraStatus === 'active' ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Top Header - Compact for Mobile */}
        <header className="flex items-center justify-between p-3 bg-black/50 backdrop-blur-2xl rounded-2xl border border-white/10 pointer-events-auto mt-[env(safe-area-inset-top,10px)] shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white shadow-lg">
              <i className="fas fa-shield-halved text-base"></i>
            </div>
            <div>
              <h1 className="text-white font-black text-sm leading-none tracking-tight">EU MDR TUTOR</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-blue-400 text-[7px] font-black uppercase tracking-widest">Compliance AR</span>
                <span className="text-white/20 text-[7px] font-black uppercase tracking-widest">• V1.0.4</span>
              </div>
            </div>
          </div>
          
          <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
          </div>
        </header>

        {/* Interaction Prompt */}
        {!activeTopicId && cameraStatus === 'active' && (
          <div className="flex-grow flex items-center justify-center px-4 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="bg-black/40 backdrop-blur-xl border border-white/5 p-8 rounded-[3rem] pointer-events-auto">
              <div className="relative w-16 h-16 mx-auto mb-6">
                <div className="absolute inset-0 bg-blue-500/10 blur-2xl animate-pulse"></div>
                <div className="relative w-full h-full bg-blue-600/10 rounded-full flex items-center justify-center border border-blue-500/20">
                  <i className="fas fa-hand-pointer text-2xl text-blue-500 animate-bounce"></i>
                </div>
              </div>
              <h2 className="text-white font-black text-lg mb-2 uppercase tracking-tight">Select a Module</h2>
              <p className="text-white/40 text-[10px] max-w-[200px] mx-auto font-medium leading-relaxed uppercase tracking-widest">Project interactive data by tapping a topic below.</p>
            </div>
          </div>
        )}

        {/* Bottom Horizontal Topic Selector - Grid optimized for vertical space */}
        <div className="pointer-events-auto w-full max-w-lg mx-auto pb-[env(safe-area-inset-bottom,10px)]">
          <div className="grid grid-cols-3 gap-2">
            {MDR_TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopicId(topic.id)}
                className={`
                  group relative flex flex-col items-center justify-center p-3 h-20 rounded-[1.8rem] transition-all duration-300
                  border backdrop-blur-3xl overflow-hidden
                  ${activeTopicId === topic.id 
                    ? 'bg-blue-600 border-blue-400 text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)] -translate-y-2 scale-105' 
                    : 'bg-black/60 border-white/5 text-white/40 active:scale-95 hover:border-white/10'}
                `}
              >
                <i className={`fas ${topic.icon} text-base mb-2 transition-transform duration-300 ${activeTopicId === topic.id ? 'scale-110' : ''}`}></i>
                <span className="text-[8px] font-black text-center leading-tight uppercase tracking-widest">
                  {topic.shortTitle}
                </span>
                {activeTopicId === topic.id && (
                  <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]"></div>
                )}
              </button>
            ))}
          </div>
          {/* Mobile UI Handle */}
          <div className="w-12 h-1 bg-white/5 rounded-full mx-auto mt-4 mb-1"></div>
        </div>
      </div>

      {/* Immersive Overlay */}
      <div className="absolute inset-0 pointer-events-none ring-[1px] ring-white/5 ring-inset z-50 rounded-[40px] shadow-[inset_0_0_100px_rgba(0,0,0,0.6)]"></div>
    </div>
  );
};

export default App;
