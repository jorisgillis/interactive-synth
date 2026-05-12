import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import WaveformSelector from '../components/WaveformSelector';
import VolumeControl from '../components/VolumeControl';
import FilterControls from '../components/FilterControls';
import TutorialPanel from '../components/TutorialPanel';
import ExercisePanel from '../components/ExercisePanel';
import SettingsPanel from '../components/SettingsPanel';

// Mock the store for each component
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

    // Create mock functions
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

    // If selector is a function, call it with the state and functions
    if (typeof selector === 'function') {
      return selector({ ...mockState, ...mockFunctions });
    }
    return mockState;
  }),
}));

describe('WaveformSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders waveform buttons', () => {
    render(<WaveformSelector />);
    
    expect(screen.getByText('Sine')).toBeInTheDocument();
    expect(screen.getByText('Square')).toBeInTheDocument();
    expect(screen.getByText('Sawtooth')).toBeInTheDocument();
    expect(screen.getByText('Triangle')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(<WaveformSelector />);
    expect(screen.getByText('Waveform')).toBeInTheDocument();
  });
});

describe('VolumeControl', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders volume control', () => {
    render(<VolumeControl />);
    
    expect(screen.getByText('Volume')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('displays volume percentage', () => {
    render(<VolumeControl />);
    expect(screen.getByText('Volume: 50%')).toBeInTheDocument();
  });
});

describe('FilterControls', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders filter controls', () => {
    render(<FilterControls />);
    
    expect(screen.getByText('Filter')).toBeInTheDocument();
    expect(screen.getByText('Cutoff: 20000 Hz')).toBeInTheDocument();
    expect(screen.getByText('Resonance: 0.0')).toBeInTheDocument();
  });

  it('renders filter toggle button', () => {
    render(<FilterControls />);
    expect(screen.getByText('OFF')).toBeInTheDocument();
  });
});

describe('TutorialPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders tutorials list', () => {
    render(<TutorialPanel />);
    
    expect(screen.getByText('Tutorials')).toBeInTheDocument();
  });
});

describe('ExercisePanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders exercises list', () => {
    render(<ExercisePanel />);
    
    expect(screen.getByText('Exercises')).toBeInTheDocument();
  });
});

describe('SettingsPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders settings panel', () => {
    render(<SettingsPanel />);
    
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Show Tooltips')).toBeInTheDocument();
    expect(screen.getByText('Show Waveform')).toBeInTheDocument();
    expect(screen.getByText('Show Frequency')).toBeInTheDocument();
    expect(screen.getByText('Reset All Settings')).toBeInTheDocument();
  });
});
