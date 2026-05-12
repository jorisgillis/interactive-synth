import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the store
vi.mock('../store/useSynthStore', () => ({
  useSynthStore: vi.fn((selector) => {
    const mockState = {
      settings: {
        waveform: 'sine',
        frequency: 440,
        filter: { cutoff: 20000, resonance: 0, enabled: false },
        volume: 0.5,
        isPlaying: false,
      },
      visualization: {
        showWaveform: true,
        showFrequency: true,
        fftSize: 2048,
      },
      currentTutorial: null,
      currentTutorialStep: 0,
      currentExercise: null,
      completedTutorials: new Set(),
      completedExercises: new Set(),
      showTooltips: true,
    };

    const mockFunctions = {
      setWaveform: vi.fn(),
      setFrequency: vi.fn(),
      setFilterCutoff: vi.fn(),
      setFilterResonance: vi.fn(),
      setFilterEnabled: vi.fn(),
      setVolume: vi.fn(),
      setIsPlaying: vi.fn(),
      setVisualization: vi.fn(),
      resetSettings: vi.fn(),
      setCurrentTutorial: vi.fn(),
      setCurrentTutorialStep: vi.fn(),
      nextTutorialStep: vi.fn(),
      prevTutorialStep: vi.fn(),
      setCurrentExercise: vi.fn(),
      completeTutorial: vi.fn(),
      completeExercise: vi.fn(),
      setShowTooltips: vi.fn(),
    };

    if (typeof selector === 'function') {
      return selector({ ...mockState, ...mockFunctions });
    }
    return { ...mockState, ...mockFunctions };
  }),
}));

// Mock the audio engine hook
vi.mock('../hooks/useAudioEngine', () => ({
  useAudioEngine: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    setWaveform: vi.fn(),
    setFrequency: vi.fn(),
    setFilterCutoff: vi.fn(),
    setFilterResonance: vi.fn(),
    setFilterEnabled: vi.fn(),
    setVolume: vi.fn(),
    getWaveformData: () => {
      const data = new Uint8Array(1024);
      data.fill(128);
      return data;
    },
    getFrequencyData: () => {
      const data = new Uint8Array(1024);
      data.fill(0);
      return data;
    },
  }),
}));

describe('App', () => {
  it('renders main heading', () => {
    render(<App />);
    
    expect(screen.getByText('SynthTutor')).toBeInTheDocument();
    expect(screen.getByText(/Interactive Synthesizer Learning Tool/)).toBeInTheDocument();
  });

  it('renders waveform selector', () => {
    render(<App />);
    
    expect(screen.getByText('Waveform')).toBeInTheDocument();
  });

  it('renders filter controls', () => {
    render(<App />);
    
    expect(screen.getByText('Filter')).toBeInTheDocument();
  });

  it('renders volume control', () => {
    render(<App />);
    
    expect(screen.getByText('Volume')).toBeInTheDocument();
  });

  it('renders keyboard', () => {
    render(<App />);
    
    expect(screen.getByText('Keyboard')).toBeInTheDocument();
  });

  it('renders tutorials panel', () => {
    render(<App />);
    
    expect(screen.getByText('Tutorials')).toBeInTheDocument();
  });

  it('renders exercises panel', () => {
    render(<App />);
    
    expect(screen.getByText('Exercises')).toBeInTheDocument();
  });

  it('renders settings panel', () => {
    render(<App />);
    
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<App />);
    
    expect(screen.getByText(/Use your keyboard/)).toBeInTheDocument();
    expect(screen.getByText(/SynthTutor - Learn Synthesis Interactively/)).toBeInTheDocument();
  });
});
