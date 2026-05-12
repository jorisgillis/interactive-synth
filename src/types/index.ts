export type WaveformType = 'sine' | 'square' | 'sawtooth' | 'triangle';

export interface SynthSettings {
  waveform: WaveformType;
  frequency: number;
  filter: {
    cutoff: number;
    resonance: number;
    enabled: boolean;
  };
  volume: number;
  isPlaying: boolean;
}

export interface VisualizationSettings {
  showWaveform: boolean;
  showFrequency: boolean;
  fftSize: number;
}

export interface Tooltip {
  id: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetControl?: string;
  completionCheck?: () => boolean;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  steps: TutorialStep[];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  targetSettings: Partial<SynthSettings>;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SynthState {
  settings: SynthSettings;
  visualization: VisualizationSettings;
  currentTutorial: Tutorial | null;
  currentTutorialStep: number;
  currentExercise: Exercise | null;
  completedTutorials: Set<string>;
  completedExercises: Set<string>;
  showTooltips: boolean;
}
