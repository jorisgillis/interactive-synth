import type { Tutorial } from '../types';

export const tutorials: Tutorial[] = [
  {
    id: 'waveform-basics',
    title: 'Waveform Basics',
    description: 'Learn about the different basic waveforms and their characteristics.',
    steps: [
      {
        id: 'sine-wave',
        title: 'Sine Wave',
        description: 'Start by selecting the sine waveform. The sine wave is the purest waveform with no harmonics, producing a smooth, simple sound.',
        targetControl: 'waveform',
      },
      {
        id: 'square-wave',
        title: 'Square Wave',
        description: 'Now try the square waveform. Notice how it sounds richer and more complex than the sine wave. This is because it contains odd harmonics.',
        targetControl: 'waveform',
      },
      {
        id: 'sawtooth-wave',
        title: 'Sawtooth Wave',
        description: 'Select the sawtooth waveform. This waveform contains both odd and even harmonics, giving it a very bright and rich sound.',
        targetControl: 'waveform',
      },
      {
        id: 'triangle-wave',
        title: 'Triangle Wave',
        description: 'Finally, try the triangle waveform. It sounds similar to the sine wave but with a bit more complexity due to its harmonic content.',
        targetControl: 'waveform',
      },
    ],
  },
  {
    id: 'filter-exploration',
    title: 'Filter Exploration',
    description: 'Learn how filters shape the sound by removing certain frequencies.',
    steps: [
      {
        id: 'enable-filter',
        title: 'Enable Filter',
        description: 'First, enable the filter by turning it ON. This will allow you to shape the sound.',
        targetControl: 'filter-enabled',
      },
      {
        id: 'cutoff-high',
        title: 'High Cutoff',
        description: 'Set the cutoff frequency to a high value (around 20kHz). At this setting, most frequencies pass through unaffected.',
        targetControl: 'filter-cutoff',
      },
      {
        id: 'cutoff-low',
        title: 'Low Cutoff',
        description: 'Now lower the cutoff to around 500Hz. Notice how the sound becomes more muffled as higher frequencies are filtered out.',
        targetControl: 'filter-cutoff',
      },
      {
        id: 'resonance',
        title: 'Add Resonance',
        description: 'Increase the resonance to around 10. This emphasizes frequencies near the cutoff point, creating a more pronounced effect.',
        targetControl: 'filter-resonance',
      },
    ],
  },
];

export const getTutorialById = (id: string): Tutorial | undefined => {
  return tutorials.find((tutorial) => tutorial.id === id);
};
