import { create } from 'zustand';
import type { SynthState, SynthSettings, VisualizationSettings, WaveformType, Tutorial, Exercise } from '../types';

const defaultSettings: SynthSettings = {
  waveform: 'sine',
  frequency: 440,
  filter: {
    cutoff: 20000,
    resonance: 0,
    enabled: false,
  },
  volume: 0.5,
  isPlaying: false,
};

const defaultVisualization: VisualizationSettings = {
  showWaveform: true,
  showFrequency: true,
  fftSize: 2048,
};

const initialState: SynthState = {
  settings: defaultSettings,
  visualization: defaultVisualization,
  currentTutorial: null,
  currentTutorialStep: 0,
  currentExercise: null,
  completedTutorials: new Set(),
  completedExercises: new Set(),
  showTooltips: true,
};

export const useSynthStore = create<SynthState & {
  setSettings: (settings: Partial<SynthSettings>) => void;
  setWaveform: (waveform: WaveformType) => void;
  setFrequency: (frequency: number) => void;
  setFilterCutoff: (cutoff: number) => void;
  setFilterResonance: (resonance: number) => void;
  setFilterEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVisualization: (visualization: Partial<VisualizationSettings>) => void;
  resetSettings: () => void;
  setCurrentTutorial: (tutorial: Tutorial | null) => void;
  setCurrentTutorialStep: (step: number) => void;
  nextTutorialStep: () => void;
  prevTutorialStep: () => void;
  setCurrentExercise: (exercise: Exercise | null) => void;
  completeTutorial: (tutorialId: string) => void;
  completeExercise: (exerciseId: string) => void;
  setShowTooltips: (show: boolean) => void;
}>((set) => ({
  ...initialState,
  
  setSettings: (settings) =>
    set((state) => ({
      settings: { ...state.settings, ...settings },
    })),
  
  setWaveform: (waveform) =>
    set((state) => ({
      settings: { ...state.settings, waveform },
    })),
  
  setFrequency: (frequency) =>
    set((state) => ({
      settings: { ...state.settings, frequency },
    })),
  
  setFilterCutoff: (cutoff) =>
    set((state) => ({
      settings: {
        ...state.settings,
        filter: { ...state.settings.filter, cutoff },
      },
    })),
  
  setFilterResonance: (resonance) =>
    set((state) => ({
      settings: {
        ...state.settings,
        filter: { ...state.settings.filter, resonance },
      },
    })),
  
  setFilterEnabled: (enabled) =>
    set((state) => ({
      settings: {
        ...state.settings,
        filter: { ...state.settings.filter, enabled },
      },
    })),
  
  setVolume: (volume) =>
    set((state) => ({
      settings: { ...state.settings, volume },
    })),
  
  setIsPlaying: (isPlaying) =>
    set((state) => ({
      settings: { ...state.settings, isPlaying },
    })),
  
  setVisualization: (visualization) =>
    set((state) => ({
      visualization: { ...state.visualization, ...visualization },
    })),
  
  resetSettings: () =>
    set({ settings: defaultSettings }),
  
  setCurrentTutorial: (tutorial) =>
    set({ currentTutorial: tutorial, currentTutorialStep: 0 }),
  
  setCurrentTutorialStep: (step) =>
    set({ currentTutorialStep: step }),
  
  nextTutorialStep: () =>
    set((state) => ({
      currentTutorialStep: Math.min(
        state.currentTutorialStep + 1,
        state.currentTutorial?.steps.length ?? 1
      ),
    })),
  
  prevTutorialStep: () =>
    set((state) => ({
      currentTutorialStep: Math.max(state.currentTutorialStep - 1, 0),
    })),
  
  setCurrentExercise: (exercise) =>
    set({ currentExercise: exercise }),
  
  completeTutorial: (tutorialId) =>
    set((state) => ({
      completedTutorials: new Set(state.completedTutorials).add(tutorialId),
    })),
  
  completeExercise: (exerciseId) =>
    set((state) => ({
      completedExercises: new Set(state.completedExercises).add(exerciseId),
    })),
  
  setShowTooltips: (show) =>
    set({ showTooltips: show }),
}));
