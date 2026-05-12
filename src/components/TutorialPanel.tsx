import React from 'react';
import { useSynthStore } from '../store/useSynthStore';
import { tutorials } from '../data/tutorials';

const TutorialPanel: React.FC = () => {
  const {
    currentTutorial,
    currentTutorialStep,
    setCurrentTutorial,
    nextTutorialStep,
    prevTutorialStep,
    completeTutorial,
  } = useSynthStore((state) => ({
    currentTutorial: state.currentTutorial,
    currentTutorialStep: state.currentTutorialStep,
    setCurrentTutorial: state.setCurrentTutorial,
    nextTutorialStep: state.nextTutorialStep,
    prevTutorialStep: state.prevTutorialStep,
    completeTutorial: state.completeTutorial,
  }));

  const handleStartTutorial = (tutorialId: string) => {
    const tutorial = tutorials.find((t) => t.id === tutorialId);
    if (tutorial) {
      setCurrentTutorial(tutorial);
    }
  };

  const handleComplete = () => {
    if (currentTutorial) {
      completeTutorial(currentTutorial.id);
      setCurrentTutorial(null);
    }
  };

  if (currentTutorial) {
    const currentStep = currentTutorial.steps[currentTutorialStep];
    const isFirstStep = currentTutorialStep === 0;
    const isLastStep = currentTutorialStep >= currentTutorial.steps.length - 1;

    return (
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">{currentTutorial.title}</h3>
          <button
            onClick={() => setCurrentTutorial(null)}
            className="text-gray-400 hover:text-white text-xl"
          >
            &times;
          </button>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-2">
            Step {currentTutorialStep + 1} of {currentTutorial.steps.length}
          </div>
          <h4 className="text-md font-medium text-white mb-2">{currentStep.title}</h4>
          <p className="text-sm text-gray-300">{currentStep.description}</p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevTutorialStep}
            disabled={isFirstStep}
            className="synth-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {isLastStep ? (
            <button onClick={handleComplete} className="synth-button bg-synth-pink">
              Complete Tutorial
            </button>
          ) : (
            <button onClick={nextTutorialStep} className="synth-button">
              Next
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-lg font-medium text-white mb-4">Tutorials</h3>
      <div className="space-y-3">
        {tutorials.map((tutorial) => (
          <button
            key={tutorial.id}
            onClick={() => handleStartTutorial(tutorial.id)}
            className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <div className="font-medium text-white">{tutorial.title}</div>
            <div className="text-sm text-gray-400">{tutorial.description}</div>
            <div className="text-xs text-gray-500 mt-1">
              {tutorial.steps.length} steps
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TutorialPanel;
