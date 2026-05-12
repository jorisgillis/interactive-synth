import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Mock Web Audio API
class MockAudioContext {
  state = 'running';
  destination = { connect: (): void => {} };
  
  createOscillator() {
    return {
      type: 'sine' as const,
      frequency: { value: 440 },
      start: (): void => {},
      stop: (): void => {},
      connect: (): void => {},
      disconnect: (): void => {},
    };
  }
  
  createBiquadFilter() {
    return {
      type: 'lowpass' as const,
      frequency: { value: 20000 },
      Q: { value: 0 },
      connect: (): void => {},
      disconnect: (): void => {},
    };
  }
  
  createGain() {
    return {
      gain: { value: 0.5 },
      connect: (): void => {},
      disconnect: (): void => {},
    };
  }
  
  createAnalyser() {
    return {
      fftSize: 2048,
      frequencyBinCount: 1024,
      getByteTimeDomainData: (array: Uint8Array): void => {
        array.fill(128);
      },
      getByteFrequencyData: (array: Uint8Array): void => {
        array.fill(0);
      },
      connect: (): void => {},
      disconnect: (): void => {},
    };
  }
  
  resume(): void {}
  close(): void {}
}

// Assign to global scope for jsdom
if (typeof window !== 'undefined') {
  window.AudioContext = MockAudioContext as unknown as typeof AudioContext;
  window.OfflineAudioContext = MockAudioContext as unknown as typeof OfflineAudioContext;
}

// Cleanup after each test
afterEach(() => {
  cleanup();
});
