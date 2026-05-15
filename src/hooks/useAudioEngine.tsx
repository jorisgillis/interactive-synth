import { useCallback, useContext } from 'react';
import { AudioEngineContext } from './AudioEngineProvider';
import type { WaveformType } from '../types';

// Custom hook to use the audio engine
export const useAudioEngine = () => {
  const context = useContext(AudioEngineContext);
  
  if (!context) {
    throw new Error('useAudioEngine must be used within an AudioEngineProvider');
  }
  
  const { audioContextRef, oscillatorRef, filterRef, gainRef, analyserRef } = context;

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
  }, [audioContextRef, oscillatorRef, filterRef, analyserRef, gainRef]);

  const stop = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
  }, [oscillatorRef]);

  const setWaveform = useCallback((waveform: WaveformType) => {
    if (oscillatorRef.current) {
      oscillatorRef.current.type = waveform;
    }
  }, [oscillatorRef]);

  const setFrequency = useCallback((frequency: number) => {
    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.value = frequency;
    }
  }, [oscillatorRef]);

  const setFilterCutoff = useCallback((cutoff: number) => {
    if (filterRef.current) {
      filterRef.current.frequency.value = cutoff;
    }
  }, [filterRef]);

  const setFilterResonance = useCallback((resonance: number) => {
    if (filterRef.current) {
      filterRef.current.Q.value = resonance;
    }
  }, [filterRef]);

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
  }, [oscillatorRef, filterRef, analyserRef]);

  const setVolume = useCallback((volume: number) => {
    if (gainRef.current) {
      gainRef.current.gain.value = volume;
    }
  }, [gainRef]);

  const getWaveformData = useCallback((): Uint8Array | null => {
    if (analyserRef.current) {
      const data = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteTimeDomainData(data);
      return data;
    }
    return null;
  }, [analyserRef]);

  const getFrequencyData = useCallback((): Uint8Array | null => {
    if (analyserRef.current) {
      const data = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(data);
      return data;
    }
    return null;
  }, [analyserRef]);

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
