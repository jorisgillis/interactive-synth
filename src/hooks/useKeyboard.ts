import { useEffect } from 'react';

export const useKeyboard = (
  onKeyDown: (key: string) => void,
  onKeyUp: (key: string) => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      onKeyDown(e.key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      onKeyUp(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onKeyDown, onKeyUp]);
};

// Note frequencies for keyboard mapping (C4 to B4)
const NOTE_FREQUENCIES: Record<string, number> = {
  'a': 261.63, // C4
  'w': 277.18, // C#4
  's': 293.66, // D4
  'e': 311.13, // D#4
  'd': 329.63, // E4
  'f': 349.23, // F4
  't': 369.99, // F#4
  'g': 392.00, // G4
  'y': 415.30, // G#4
  'h': 440.00, // A4
  'u': 466.16, // A#4
  'j': 493.88, // B4
  'k': 523.25, // C5
};

export const getFrequencyFromKey = (key: string): number | null => {
  const lowerKey = key.toLowerCase();
  return NOTE_FREQUENCIES[lowerKey] ?? null;
};

export const useNoteKeyboard = (
  onNoteOn: (frequency: number) => void,
  onNoteOff: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const frequency = getFrequencyFromKey(e.key);
      if (frequency) {
        onNoteOn(frequency);
      }
    };

    const handleKeyUp = () => {
      onNoteOff();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onNoteOn, onNoteOff]);
};
