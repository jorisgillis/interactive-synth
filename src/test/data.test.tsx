import { describe, it, expect } from 'vitest';
import { tooltips, getTooltipById } from '../data/tooltips';
import { tutorials, getTutorialById } from '../data/tutorials';
import { exercises, getExerciseById } from '../data/exercises';

describe('Tooltips Data', () => {
  it('should have tooltips for all controls', () => {
    expect(tooltips.length).toBeGreaterThan(0);
  });

  it('should have waveform tooltip', () => {
    const waveformTooltip = getTooltipById('waveform');
    expect(waveformTooltip).toBeDefined();
    expect(waveformTooltip?.title).toBe('Waveform');
  });

  it('should have filter cutoff tooltip', () => {
    const filterTooltip = getTooltipById('filter-cutoff');
    expect(filterTooltip).toBeDefined();
    expect(filterTooltip?.title).toBe('Filter Cutoff');
  });

  it('should have volume tooltip', () => {
    const volumeTooltip = getTooltipById('volume');
    expect(volumeTooltip).toBeDefined();
    expect(volumeTooltip?.title).toBe('Volume');
  });

  it('should return undefined for non-existent tooltip', () => {
    const nonExistent = getTooltipById('non-existent');
    expect(nonExistent).toBeUndefined();
  });
});

describe('Tutorials Data', () => {
  it('should have tutorials', () => {
    expect(tutorials.length).toBeGreaterThan(0);
  });

  it('should have waveform basics tutorial', () => {
    const tutorial = getTutorialById('waveform-basics');
    expect(tutorial).toBeDefined();
    expect(tutorial?.title).toBe('Waveform Basics');
    expect(tutorial?.steps.length).toBeGreaterThan(0);
  });

  it('should have filter exploration tutorial', () => {
    const tutorial = getTutorialById('filter-exploration');
    expect(tutorial).toBeDefined();
    expect(tutorial?.title).toBe('Filter Exploration');
  });

  it('should return undefined for non-existent tutorial', () => {
    const nonExistent = getTutorialById('non-existent');
    expect(nonExistent).toBeUndefined();
  });

  it('should have steps with proper structure', () => {
    const tutorial = tutorials[0];
    tutorial.steps.forEach((step) => {
      expect(step.id).toBeDefined();
      expect(step.title).toBeDefined();
      expect(step.description).toBeDefined();
    });
  });
});

describe('Exercises Data', () => {
  it('should have exercises', () => {
    expect(exercises.length).toBeGreaterThan(0);
  });

  it('should have sine wave exercise', () => {
    const exercise = getExerciseById('sine-wave');
    expect(exercise).toBeDefined();
    expect(exercise?.title).toBe('Pure Tone');
    expect(exercise?.difficulty).toBe('easy');
  });

  it('should have square wave exercise', () => {
    const exercise = getExerciseById('square-wave');
    expect(exercise).toBeDefined();
    expect(exercise?.title).toBe('Hollow Sound');
  });

  it('should have exercises with different difficulties', () => {
    const difficulties = exercises.map((e) => e.difficulty);
    expect(difficulties).toContain('easy');
    expect(difficulties).toContain('medium');
  });

  it('should return undefined for non-existent exercise', () => {
    const nonExistent = getExerciseById('non-existent');
    expect(nonExistent).toBeUndefined();
  });

  it('should have target settings for each exercise', () => {
    exercises.forEach((exercise) => {
      expect(exercise.targetSettings).toBeDefined();
      expect(Object.keys(exercise.targetSettings).length).toBeGreaterThan(0);
    });
  });
});
