import React, { useEffect, useRef } from 'react';

// Create a context to share the audio engine state
const AudioEngineContext = React.createContext<{
  audioContextRef: React.RefObject<AudioContext | null>;
  oscillatorRef: React.RefObject<OscillatorNode | null>;
  filterRef: React.RefObject<BiquadFilterNode | null>;
  gainRef: React.RefObject<GainNode | null>;
  analyserRef: React.RefObject<AnalyserNode | null>;
} | null>(null);

// Provider component that initializes the audio engine once
export const AudioEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Initialize audio context and nodes once
  useEffect(() => {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    // Create analyser for visualization
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    
    // Create filter
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 20000;
    filter.Q.value = 0;
    
    // Create gain node
    const gain = audioContext.createGain();
    gain.gain.value = 0.5;
    
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    filterRef.current = filter;
    gainRef.current = gain;
    
    return () => {
      // Cleanup on unmount
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
      }
      audioContext.close();
    };
  }, []);

  const contextValue = {
    audioContextRef,
    oscillatorRef,
    filterRef,
    gainRef,
    analyserRef,
  };

  return (
    <AudioEngineContext.Provider value={contextValue}>
      {children}
    </AudioEngineContext.Provider>
  );
};

export { AudioEngineContext };
