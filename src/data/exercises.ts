import type { Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: 'sine-wave',
    title: 'Pure Tone',
    description: 'Create a pure sine wave sound with no harmonics.',
    targetSettings: {
      waveform: 'sine',
      filter: { cutoff: 20000, resonance: 0, enabled: false },
    },
    difficulty: 'easy',
  },
  {
    id: 'square-wave',
    title: 'Hollow Sound',
    description: 'Create a sound rich in odd harmonics with a hollow character.',
    targetSettings: {
      waveform: 'square',
      filter: { cutoff: 20000, resonance: 0, enabled: false },
    },
    difficulty: 'easy',
  },
  {
    id: 'filtered-sawtooth',
    title: 'Muffled Brightness',
    description: 'Create a bright sawtooth wave and then filter it to make it sound muffled.',
    targetSettings: {
      waveform: 'sawtooth',
      filter: { cutoff: 1000, resonance: 5, enabled: true },
    },
    difficulty: 'medium',
  },
  {
    id: 'resonant-filter',
    title: 'Peaky Sound',
    description: 'Create a sound with a pronounced peak in the frequency response.',
    targetSettings: {
      waveform: 'sawtooth',
      filter: { cutoff: 2000, resonance: 15, enabled: true },
    },
    difficulty: 'medium',
  },
  {
    id: 'triangle-filtered',
    title: 'Soft and Muffled',
    description: 'Create a soft triangle wave with a gentle filter applied.',
    targetSettings: {
      waveform: 'triangle',
      filter: { cutoff: 5000, resonance: 2, enabled: true },
    },
    difficulty: 'medium',
  },
];

export const getExerciseById = (id: string): Exercise | undefined => {
  return exercises.find((exercise) => exercise.id === id);
};
