import React from 'react';
import { useSynthStore } from '../store/useSynthStore';

const SettingsPanel: React.FC = () => {
  const showTooltips = useSynthStore((state) => state.showTooltips);
  const visualization = useSynthStore((state) => state.visualization);
  const setShowTooltips = useSynthStore((state) => state.setShowTooltips);
  const setVisualization = useSynthStore((state) => state.setVisualization);
  const resetSettings = useSynthStore((state) => state.resetSettings);

  const handleToggleTooltips = () => {
    setShowTooltips(!showTooltips);
  };

  const handleToggleWaveform = () => {
    setVisualization({ showWaveform: !visualization.showWaveform });
  };

  const handleToggleFrequency = () => {
    setVisualization({ showFrequency: !visualization.showFrequency });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-lg font-medium text-white mb-4">Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Show Tooltips</span>
          <button
            onClick={handleToggleTooltips}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              showTooltips
                ? 'bg-synth-purple text-white'
                : 'bg-gray-700 text-gray-400'
            }`}
          >
            {showTooltips ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Show Waveform</span>
          <button
            onClick={handleToggleWaveform}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              visualization.showWaveform
                ? 'bg-synth-purple text-white'
                : 'bg-gray-700 text-gray-400'
            }`}
          >
            {visualization.showWaveform ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Show Frequency</span>
          <button
            onClick={handleToggleFrequency}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              visualization.showFrequency
                ? 'bg-synth-purple text-white'
                : 'bg-gray-700 text-gray-400'
            }`}
          >
            {visualization.showFrequency ? 'ON' : 'OFF'}
          </button>
        </div>

        <button
          onClick={resetSettings}
          className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm"
        >
          Reset All Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
