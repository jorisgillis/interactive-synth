import React from 'react';
import { useSynthStore } from '../store/useSynthStore';

const FilterControls: React.FC = () => {
  const {
    filterCutoff,
    filterResonance,
    filterEnabled,
    setFilterCutoff,
    setFilterResonance,
    setFilterEnabled,
  } = useSynthStore((state) => ({
    filterCutoff: state.settings.filter.cutoff,
    filterResonance: state.settings.filter.resonance,
    filterEnabled: state.settings.filter.enabled,
    setFilterCutoff: state.setFilterCutoff,
    setFilterResonance: state.setFilterResonance,
    setFilterEnabled: state.setFilterEnabled,
  }));

  const handleCutoffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCutoff(Number(e.target.value));
  };

  const handleResonanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterResonance(Number(e.target.value));
  };

  const handleEnabledToggle = () => {
    setFilterEnabled(!filterEnabled);
  };

  return (
    <div className="synth-control">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-400">Filter</h3>
        <button
          onClick={handleEnabledToggle}
          className={`px-2 py-1 text-xs rounded transition-all ${
            filterEnabled
              ? 'bg-synth-purple text-white'
              : 'bg-gray-700 text-gray-400'
          }`}
        >
          {filterEnabled ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>20Hz</span>
            <span>20kHz</span>
          </div>
          <input
            type="range"
            min="20"
            max="20000"
            step="10"
            value={filterCutoff}
            onChange={handleCutoffChange}
            className="synth-slider"
            disabled={!filterEnabled}
          />
          <div className="text-xs text-gray-400 mt-1">
            Cutoff: {Math.round(filterCutoff)} Hz
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>0</span>
            <span>20</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            step="0.1"
            value={filterResonance}
            onChange={handleResonanceChange}
            className="synth-slider"
            disabled={!filterEnabled}
          />
          <div className="text-xs text-gray-400 mt-1">
            Resonance: {filterResonance.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
