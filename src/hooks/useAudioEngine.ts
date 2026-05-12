import { useEffect, useRef, useCallback } from 'react';
import type { WaveformType } from '../types';

export const useAudioEngine = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Initialize audio context and nodes
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

  const start = useCallback((frequency: number) => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;
    
    // Resume audio context if suspended (required for some browsers)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    // Stop existing oscillator if playing
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    
    // Create new oscillator
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    
    // Connect nodes: oscillator -> filter -> analyser -> gain -> destination
    oscillator.connect(filterRef.current!);
    filterRef.current!.connect(analyserRef.current!);
    analyserRef.current!.connect(gainRef.current!);
    gainRef.current!.connect(audioContext.destination);
    
    // Start oscillator
    oscillator.start();
    oscillatorRef.current = oscillator;
  }, []);

  const stop = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
  }, []);

  const setWaveform = useCallback((waveform: WaveformType) => {
    if (oscillatorRef.current) {
      oscillatorRef.current.type = waveform;
    }
  }, []);

  const setFrequency = useCallback((frequency: number) => {
    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.value = frequency;
    }
  }, []);

  const setFilterCutoff = useCallback((cutoff: number) => {
    if (filterRef.current) {
      filterRef.current.frequency.value = cutoff;
    }
  }, []);

  const setFilterResonance = useCallback((resonance: number) => {
    if (filterRef.current) {
      filterRef.current.Q.value = resonance;
    }
  }, []);

  const setFilterEnabled = useCallback((enabled: boolean) => {
    const oscillator = oscillatorRef.current;
    const filter = filterRef.current;
    const analyser = analyserRef.current;
    
    if (filter && oscillator) {
      if (enabled) {
        oscillator.connect(filter);
        filter.connect(analyser!);
      } else {
        oscillator.disconnect(filter);
        oscillator.connect(analyser!);
      }
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (gainRef.current) {
      gainRef.current.gain.value = volume;
    }
  }, []);

  const getWaveformData = useCallback((): Uint8Array | null => {
    if (analyserRef.current) {
      const data = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteTimeDomainData(data);
      return data;
    }
    return null;
  }, []);

  const getFrequencyData = useCallback((): Uint8Array | null => {
    if (analyserRef.current) {
      const data = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(data);
      return data;
    }
    return null;
  }, []);

  return {
    start,
    stop,
    setWaveform,
    setFrequency,
    setFilterCutoff,
    setFilterResonance,
    setFilterEnabled,
    setVolume,
    getWaveformData,
    getFrequencyData,
  };
};
