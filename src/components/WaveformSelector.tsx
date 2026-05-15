import React, { useCallback } from 'react';
import { useSynthStore } from '../store/useSynthStore';
import type { WaveformType } from '../types';

const WAVEFORMS: { id: WaveformType; name: string; description: string }[] = [
  { id: 'sine', name: 'Sine', description: 'Pure, smooth waveform with no harmonics' },
  { id: 'square', name: 'Square', description: 'Rich in odd harmonics, hollow sound' },
  { id: 'sawtooth', name: 'Sawtooth', description: 'Rich in both odd and even harmonics, bright sound' },
  { id: 'triangle', name: 'Triangle', description: 'Similar to sine but with some harmonics, softer than square' },
];

const WaveformSelector: React.FC = () => {
  const waveform = useSynthStore((state) => state.settings.waveform);
  const setWaveform = useSynthStore((state) => state.setWaveform);

  const handleWaveformChange = useCallback((waveform: WaveformType) => {
    setWaveform(waveform);
  }, [setWaveform]);

  return (
    <div className="synth-control">
      <h3 className="text-sm font-medium text-gray-400 mb-3">Waveform</h3>
      <div className="grid grid-cols-2 gap-2">
        {WAVEFORMS.map((wave) => (
          <button
            key={wave.id}
            onClick={() => handleWaveformChange(wave.id)}
            className={`px-3 py-2 rounded-lg text-sm transition-all ${
              waveform === wave.id
                ? 'bg-synth-purple text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            title={wave.description}
          >
            {wave.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WaveformSelector;
