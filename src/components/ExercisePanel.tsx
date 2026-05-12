import React, { useState } from 'react';
import { useSynthStore } from '../store/useSynthStore';
import { exercises } from '../data/exercises';

const ExercisePanel: React.FC = () => {
  const {
    currentExercise,
    setCurrentExercise,
    completeExercise,
    settings,
  } = useSynthStore((state) => ({
    currentExercise: state.currentExercise,
    setCurrentExercise: state.setCurrentExercise,
    completeExercise: state.completeExercise,
    settings: state.settings,
  }));

  const [attemptResult, setAttemptResult] = useState<'none' | 'success' | 'failure'>('none');

  const handleStartExercise = (exerciseId: string) => {
    const exercise = exercises.find((e) => e.id === exerciseId);
    if (exercise) {
      setCurrentExercise(exercise);
      setAttemptResult('none');
    }
  };

  const checkSolution = () => {
    if (!currentExercise) return;

    const { targetSettings } = currentExercise;
    
    // Check if current settings match target settings
    const waveformMatch = settings.waveform === targetSettings.waveform;
    const filterMatch = (
      settings.filter.cutoff === targetSettings.filter?.cutoff &&
      settings.filter.resonance === targetSettings.filter?.resonance &&
      settings.filter.enabled === targetSettings.filter?.enabled
    );

    if (waveformMatch && filterMatch) {
      setAttemptResult('success');
      completeExercise(currentExercise.id);
    } else {
      setAttemptResult('failure');
    }
  };

  const handleReset = () => {
    setAttemptResult('none');
  };

  if (currentExercise) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">{currentExercise.title}</h3>
          <button
            onClick={() => setCurrentExercise(null)}
            className="text-gray-400 hover:text-white text-xl"
          >
            &times;
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-300 mb-4">{currentExercise.description}</p>
          <div className="text-xs text-gray-500 mb-4">
            Difficulty: {currentExercise.difficulty}
          </div>
        </div>

        <div className="mb-4">
          {attemptResult === 'success' && (
            <div className="p-3 bg-green-900 text-green-200 rounded-lg mb-3">
              ✓ Correct! You matched the target sound.
            </div>
          )}
          {attemptResult === 'failure' && (
            <div className="p-3 bg-red-900 text-red-200 rounded-lg mb-3">
              ✗ Not quite right. Keep trying!
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={checkSolution}
            className="synth-button"
          >
            Check Solution
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-lg font-medium text-white mb-4">Exercises</h3>
      <div className="space-y-3">
        {exercises.map((exercise) => (
          <button
            key={exercise.id}
            onClick={() => handleStartExercise(exercise.id)}
            className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-white">{exercise.title}</div>
                <div className="text-sm text-gray-400">{exercise.description}</div>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  exercise.difficulty === 'easy'
                    ? 'bg-green-900 text-green-200'
                    : exercise.difficulty === 'medium'
                    ? 'bg-yellow-900 text-yellow-200'
                    : 'bg-red-900 text-red-200'
                }`}
              >
                {exercise.difficulty}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExercisePanel;
