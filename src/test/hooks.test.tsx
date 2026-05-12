import { describe, it, expect } from 'vitest';
import { getFrequencyFromKey } from '../hooks/useKeyboard';

describe('getFrequencyFromKey', () => {
  it('should return correct frequency for valid keys', () => {
    expect(getFrequencyFromKey('a')).toBe(261.63); // C4
    expect(getFrequencyFromKey('A')).toBe(261.63); // Case insensitive
    expect(getFrequencyFromKey('s')).toBe(293.66); // D4
    expect(getFrequencyFromKey('d')).toBe(329.63); // E4
    expect(getFrequencyFromKey('f')).toBe(349.23); // F4
    expect(getFrequencyFromKey('g')).toBe(392.00); // G4
    expect(getFrequencyFromKey('h')).toBe(440.00); // A4
    expect(getFrequencyFromKey('j')).toBe(493.88); // B4
    expect(getFrequencyFromKey('k')).toBe(523.25); // C5
  });

  it('should return null for invalid keys', () => {
    expect(getFrequencyFromKey('q')).toBeNull();
    expect(getFrequencyFromKey('z')).toBeNull();
    expect(getFrequencyFromKey('1')).toBeNull();
    expect(getFrequencyFromKey('')).toBeNull();
  });

  it('should handle sharp notes', () => {
    expect(getFrequencyFromKey('w')).toBe(277.18); // C#4
    expect(getFrequencyFromKey('e')).toBe(311.13); // D#4
    expect(getFrequencyFromKey('t')).toBe(369.99); // F#4
    expect(getFrequencyFromKey('y')).toBe(415.30); // G#4
    expect(getFrequencyFromKey('u')).toBe(466.16); // A#4
  });
});
