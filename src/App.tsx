import React, { useEffect } from 'react';
import { useSynthStore } from './store/useSynthStore';
import { useAudioEngine } from './hooks/useAudioEngine';
import WaveformSelector from './components/WaveformSelector';
import FilterControls from './components/FilterControls';
import VolumeControl from './components/VolumeControl';
import Visualizer from './components/Visualizer';
import Keyboard from './components/Keyboard';
import TutorialPanel from './components/TutorialPanel';
import ExercisePanel from './components/ExercisePanel';
import SettingsPanel from './components/SettingsPanel';

const App: React.FC = () => {
  // Use individual selectors to avoid object reference changes
  const waveform = useSynthStore((state) => state.settings.waveform);
  const frequency = useSynthStore((state) => state.settings.frequency);
  const filterCutoff = useSynthStore((state) => state.settings.filter.cutoff);
  const filterResonance = useSynthStore((state) => state.settings.filter.resonance);
  const filterEnabled = useSynthStore((state) => state.settings.filter.enabled);
  const volume = useSynthStore((state) => state.settings.volume);
  const isPlaying = useSynthStore((state) => state.settings.isPlaying);

  const { start, stop, setWaveform, setFrequency, setFilterCutoff, setFilterResonance, setFilterEnabled, setVolume } = useAudioEngine();

  // Sync store with audio engine
  // Note: We omit the setter functions from dependencies as they are stable (useCallback with ref dependencies)
  useEffect(() => {
    setWaveform(waveform);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waveform]);

  useEffect(() => {
    setFrequency(frequency);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frequency]);

  useEffect(() => {
    setFilterCutoff(filterCutoff);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCutoff]);

  useEffect(() => {
    setFilterResonance(filterResonance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterResonance]);

  useEffect(() => {
    setFilterEnabled(filterEnabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterEnabled]);

  useEffect(() => {
    setVolume(volume);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  // Handle playing state
  useEffect(() => {
    if (isPlaying) {
      start(frequency);
    } else {
      stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, frequency]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-synth-purple">SynthTutor</h1>
        <p className="text-gray-400">Interactive Synthesizer Learning Tool</p>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Main Synth Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Controls */}
          <div className="space-y-4">
            <WaveformSelector />
            <FilterControls />
            <VolumeControl />
            <Keyboard />
          </div>

          {/* Center Column - Visualizer */}
          <div className="lg:col-span-1">
            <div className="visualizer h-64 rounded-lg border border-gray-700 bg-gray-800">
              <Visualizer width={400} height={256} />
            </div>
          </div>

          {/* Right Column - Learning */}
          <div className="space-y-4">
            <TutorialPanel />
            <ExercisePanel />
          </div>
        </div>

        {/* Settings */}
        <div className="max-w-md ml-auto">
          <SettingsPanel />
        </div>
      </main>

      <footer className="mt-8 pt-4 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>Use your keyboard (A-K keys) to play notes</p>
        <p className="mt-1">SynthTutor - Learn Synthesis Interactively</p>
      </footer>
    </div>
  );
};

export default App;
