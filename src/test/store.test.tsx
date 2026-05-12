import { describe, it, expect, beforeEach } from 'vitest';
import { act } from '@testing-library/react';
import { useSynthStore } from '../store/useSynthStore';

describe('useSynthStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    act(() => {
      useSynthStore.getState().resetSettings();
    });
  });

  it('should initialize with default settings', () => {
    const state = useSynthStore.getState();
    
    expect(state.settings.waveform).toBe('sine');
    expect(state.settings.frequency).toBe(440);
    expect(state.settings.filter.cutoff).toBe(20000);
    expect(state.settings.filter.resonance).toBe(0);
    expect(state.settings.filter.enabled).toBe(false);
    expect(state.settings.volume).toBe(0.5);
    expect(state.settings.isPlaying).toBe(false);
  });

  it('should update waveform', () => {
    act(() => {
      useSynthStore.getState().setWaveform('square');
    });
    
    const state = useSynthStore.getState();
    expect(state.settings.waveform).toBe('square');
  });

  it('should update frequency', () => {
    act(() => {
      useSynthStore.getState().setFrequency(880);
    });
    
    const state = useSynthStore.getState();
    expect(state.settings.frequency).toBe(880);
  });

  it('should update filter cutoff', () => {
    act(() => {
      useSynthStore.getState().setFilterCutoff(1000);
    });
    
    const state = useSynthStore.getState();
    expect(state.settings.filter.cutoff).toBe(1000);
  });

  it('should update filter resonance', () => {
    act(() => {
      useSynthStore.getState().setFilterResonance(10);
    });
    
    const state = useSynthStore.getState();
    expect(state.settings.filter.resonance).toBe(10);
  });

  it('should update filter enabled state', () => {
    act(() => {
      useSynthStore.getState().setFilterEnabled(true);
    });
    
    const state = useSynthStore.getState();
    expect(state.settings.filter.enabled).toBe(true);
  });

  it('should update volume', () => {
    act(() => {
      useSynthStore.getState().setVolume(0.8);
    });
    
    const state = useSynthStore.getState();
    expect(state.settings.volume).toBe(0.8);
  });

  it('should update playing state', () => {
    act(() => {
      useSynthStore.getState().setIsPlaying(true);
    });
    
    const state = useSynthStore.getState();
    expect(state.settings.isPlaying).toBe(true);
  });

  it('should reset settings to defaults', () => {
    act(() => {
      useSynthStore.getState().setWaveform('sawtooth');
      useSynthStore.getState().setFrequency(220);
      useSynthStore.getState().setVolume(0.2);
      useSynthStore.getState().resetSettings();
    });
    
    const state = useSynthStore.getState();
    expect(state.settings.waveform).toBe('sine');
    expect(state.settings.frequency).toBe(440);
    expect(state.settings.volume).toBe(0.5);
  });

  it('should update visualization settings', () => {
    act(() => {
      useSynthStore.getState().setVisualization({ showWaveform: false });
    });
    
    const state = useSynthStore.getState();
    expect(state.visualization.showWaveform).toBe(false);
    expect(state.visualization.showFrequency).toBe(true);
  });

  it('should manage tutorial state', () => {
    const tutorial = {
      id: 'test-tutorial',
      title: 'Test Tutorial',
      description: 'A test tutorial',
      steps: [{ id: 'step1', title: 'Step 1', description: 'First step' }],
    };

    act(() => {
      useSynthStore.getState().setCurrentTutorial(tutorial);
    });
    
    let state = useSynthStore.getState();
    expect(state.currentTutorial).toEqual(tutorial);
    expect(state.currentTutorialStep).toBe(0);

    act(() => {
      useSynthStore.getState().nextTutorialStep();
    });
    
    state = useSynthStore.getState();
    expect(state.currentTutorialStep).toBe(1);

    act(() => {
      useSynthStore.getState().prevTutorialStep();
    });
    
    state = useSynthStore.getState();
    expect(state.currentTutorialStep).toBe(0);
  });

  it('should manage exercise state', () => {
    const exercise = {
      id: 'test-exercise',
      title: 'Test Exercise',
      description: 'A test exercise',
      targetSettings: { waveform: 'square' as const },
      difficulty: 'easy' as const,
    };

    act(() => {
      useSynthStore.getState().setCurrentExercise(exercise);
    });
    
    const state = useSynthStore.getState();
    expect(state.currentExercise).toEqual(exercise);
  });

  it('should track completed tutorials and exercises', () => {
    act(() => {
      useSynthStore.getState().completeTutorial('tutorial-1');
      useSynthStore.getState().completeExercise('exercise-1');
    });
    
    const state = useSynthStore.getState();
    expect(state.completedTutorials.has('tutorial-1')).toBe(true);
    expect(state.completedExercises.has('exercise-1')).toBe(true);
  });

  it('should toggle tooltip visibility', () => {
    act(() => {
      useSynthStore.getState().setShowTooltips(false);
    });
    
    const state = useSynthStore.getState();
    expect(state.showTooltips).toBe(false);

    act(() => {
      useSynthStore.getState().setShowTooltips(true);
    });
    
    const newState = useSynthStore.getState();
    expect(newState.showTooltips).toBe(true);
  });
});
