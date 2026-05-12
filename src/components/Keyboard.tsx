import React, { useEffect, useState } from 'react';
import { useSynthStore } from '../store/useSynthStore';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { getFrequencyFromKey } from '../hooks/useKeyboard';

const Keyboard: React.FC = () => {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const { start, stop, setFrequency } = useAudioEngine();
  const { setIsPlaying } = useSynthStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const frequency = getFrequencyFromKey(e.key);
      if (frequency) {
        setActiveKeys((prev) => new Set(prev).add(e.key));
        start(frequency);
        setFrequency(frequency);
        setIsPlaying(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const frequency = getFrequencyFromKey(e.key);
      if (frequency) {
        setActiveKeys((prev) => {
          const newSet = new Set(prev);
          newSet.delete(e.key);
          return newSet;
        });
        
        // Only stop if no keys are pressed
        if (activeKeys.size === 1) {
          stop();
          setIsPlaying(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeKeys, start, stop, setFrequency, setIsPlaying]);

  // Keyboard layout for visualization
  const whiteKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k'];
  const blackKeys = ['w', 'e', 't', 'y', 'u'];
  const blackKeyPositions = [0.5, 1.5, 3.5, 4.5, 5.5]; // Positions between white keys

  return (
    <div className="synth-control relative">
      <h3 className="text-sm font-medium text-gray-400 mb-3">Keyboard</h3>
      <div className="text-xs text-gray-500 mb-2">
        Play notes using your keyboard (A-K keys)
      </div>
      
      <div className="relative h-32 bg-gray-800 rounded-lg overflow-hidden">
        {/* White keys */}
        <div className="absolute bottom-0 left-0 right-0 flex h-full">
        {whiteKeys.map((key) => (
          <div
            key={key}
            className={`flex-1 border-r border-gray-700 last:border-r-0 transition-all ${
              activeKeys.has(key) ? 'bg-synth-purple' : 'bg-white'
            }`}
            style={{ height: '100%' }}
          />
        ))}
        </div>

        {/* Black keys */}
        <div className="absolute bottom-0 left-0 right-0 flex h-2/3">
          {blackKeys.map((key) => (
            <div
              key={key}
              className={`absolute w-8 bg-gray-900 rounded-t-lg transition-all ${
                activeKeys.has(key) ? 'bg-synth-pink' : 'bg-gray-900'
              }`}
              style={{
                left: `calc(${blackKeyPositions[blackKeys.indexOf(key)] * (100 / whiteKeys.length)}% - 1rem)`,
                height: '66%',
              }}
            />
          ))}
        </div>

        {/* Key labels */}
        <div className="absolute bottom-0 left-0 right-0 flex pointer-events-none">
          {whiteKeys.map((key) => (
            <div
              key={key}
              className="flex-1 text-center text-xs text-gray-600 py-1"
            >
              {key.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
