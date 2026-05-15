import React from 'react';
import { useSynthStore } from '../store/useSynthStore';

const VolumeControl: React.FC = () => {
  const volume = useSynthStore((state) => state.settings.volume);
  const setVolume = useSynthStore((state) => state.setVolume);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className="synth-control">
      <h3 className="text-sm font-medium text-gray-400 mb-3">Volume</h3>
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>0%</span>
          <span>100%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="synth-slider"
        />
        <div className="text-xs text-gray-400 mt-1">
          Volume: {Math.round(volume * 100)}%
        </div>
      </div>
    </div>
  );
};

export default VolumeControl;
