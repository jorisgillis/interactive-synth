import type { Tooltip } from '../types';

export const tooltips: Tooltip[] = [
  {
    id: 'waveform',
    title: 'Waveform',
    content: 'The basic shape of the sound wave. Each waveform has a unique harmonic content that affects the timbre.',
    position: 'top',
  },
  {
    id: 'filter-cutoff',
    title: 'Filter Cutoff',
    content: 'The frequency at which the filter starts to attenuate the signal. Lower values cut off higher frequencies, making the sound more muffled.',
    position: 'top',
  },
  {
    id: 'filter-resonance',
    title: 'Filter Resonance',
    content: 'Emphasizes frequencies near the cutoff point. Higher resonance creates a more pronounced peak at the cutoff frequency.',
    position: 'top',
  },
  {
    id: 'filter-enabled',
    title: 'Filter Enable',
    content: 'Turn the filter on or off. When disabled, the filter has no effect on the sound.',
    position: 'top',
  },
  {
    id: 'volume',
    title: 'Volume',
    content: 'Controls the overall output level of the synthesizer.',
    position: 'top',
  },
  {
    id: 'keyboard',
    title: 'Keyboard',
    content: 'Use your computer keyboard to play notes. Keys A-K correspond to different musical notes.',
    position: 'top',
  },
  {
    id: 'visualizer',
    title: 'Visualizer',
    content: 'Shows the waveform (time domain) and frequency spectrum of the sound in real-time.',
    position: 'top',
  },
];

export const getTooltipById = (id: string): Tooltip | undefined => {
  return tooltips.find((tooltip) => tooltip.id === id);
};
