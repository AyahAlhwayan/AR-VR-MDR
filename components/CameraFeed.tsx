
import React, { useRef, useState, useEffect } from 'react';

interface CameraFeedProps {
  onStatusChange?: (status: 'idle' | 'requesting' | 'active' | 'denied' | 'error') => void;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ onStatusChange }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<'idle' | 'requesting' | 'active' | 'denied' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const updateStatus = (newStatus: typeof status) => {
    setStatus(newStatus);
    onStatusChange?.(newStatus);
  };

  const startCamera = async () => {
    setErrorMessage('');
    updateStatus('requesting');

    if (!window.isSecureContext) {
      setErrorMessage("AR features require a secure (HTTPS) connection.");
      updateStatus('error');
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErrorMessage("Camera API is not supported in this browser.");
      updateStatus('error');
      return;
    }
    
    // Attempt multiple constraint sets for maximum compatibility on iOS/Android
    const constraintVariants = [
      { video: { facingMode: { exact: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } } },
      { video: { facingMode: 'environment' } },
      { video: true }
    ];

    for (const constraints of constraintVariants) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Important for mobile browsers to allow playback
          videoRef.current.setAttribute('playsinline', 'true');
          videoRef.current.setAttribute('muted', 'true');
          
          await new Promise(resolve => setTimeout(resolve, 300));
          await videoRef.current.play();
          updateStatus('active');
          return;
        }
      } catch (err: any) {
        console.warn(`Constraint variant failed:`, err.name);
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          updateStatus('denied');
          return;
        }
      }
    }

    setErrorMessage("Unable to connect to camera. Please check if another app is using it.");
    updateStatus('error');
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black z-0">
      {/* Cinematic Background Gradient (visible until camera starts) */}
      <div className={`absolute inset-0 transition-opacity duration-1000 bg-gradient-to-br from-[#020617] via-[#1e1b4b] to-[#020617] ${status === 'active' ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Camera Video Layer */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-10 ${status === 'active' ? 'opacity-40' : 'opacity-0'}`}
      />

      {/* AR Scanlines Overlay */}
      {status === 'active' && (
        <div className="absolute inset-0 pointer-events-none z-15 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
      )}

      {/* Setup & Permissions Screen */}
      {status !== 'active' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-[100] pointer-events-auto bg-black/60 backdrop-blur-md">
          {status === 'idle' && (
            <div className="animate-in fade-in zoom-in duration-700 flex flex-col items-center gap-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full"></div>
                <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-2">
                  <i className="fas fa-camera-rotate text-4xl text-blue-400"></i>
                </div>
              </div>
              <div>
                <h2 className="text-white text-3xl font-black tracking-tight mb-2 uppercase">MDR AR EXPERIENCE</h2>
                <p className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase mb-8">Ready to project training modules</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); startCamera(); }}
                  className="group relative bg-blue-600 hover:bg-blue-500 text-white px-14 py-6 rounded-full font-black text-xl shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-all flex items-center gap-4 border-2 border-white/20 active:scale-95"
                >
                  <i className="fas fa-play text-lg group-hover:translate-x-1 transition-transform"></i>
                  START TUTORIAL
                </button>
              </div>
            </div>
          )}

          {status === 'requesting' && (
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-blue-400 font-black tracking-[0.2em] text-sm">INITIALIZING AR SENSORS...</p>
            </div>
          )}

          {status === 'denied' && (
            <div className="bg-white/5 border border-red-500/30 p-12 rounded-[3rem] max-w-sm animate-in fade-in slide-in-from-bottom-8">
              <i className="fas fa-lock text-4xl text-red-500 mb-6"></i>
              <h3 className="text-white font-black text-xl mb-4 uppercase tracking-tight">Camera Restricted</h3>
              <p className="text-white/60 text-sm mb-8 leading-relaxed">Please enable camera access in your system settings to use the Augmented Reality features of this app.</p>
              <button onClick={() => window.location.reload()} className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black shadow-xl active:scale-95 transition-all">REFRESH PERMISSIONS</button>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] max-w-sm">
              <i className="fas fa-triangle-exclamation text-4xl text-amber-500 mb-6"></i>
              <h3 className="text-white font-black text-xl mb-3 uppercase">Device Conflict</h3>
              <div className="bg-black/50 p-4 rounded-2xl mb-8">
                <p className="text-amber-500/80 text-[10px] font-mono leading-tight uppercase tracking-widest">{errorMessage}</p>
              </div>
              <div className="flex flex-col gap-4">
                <button onClick={startCamera} className="w-full bg-white text-black py-4 rounded-3xl font-black">TRY AGAIN</button>
                <button onClick={() => updateStatus('active')} className="text-blue-400 text-[10px] font-black tracking-widest uppercase py-2">Continue in Desktop Mode</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CameraFeed;
