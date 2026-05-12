import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Visualizer from '../components/Visualizer';

// Mock the audio engine hook
vi.mock('../hooks/useAudioEngine', () => ({
  useAudioEngine: () => ({
    getWaveformData: () => {
      const data = new Uint8Array(1024);
      data.fill(128);
      return data;
    },
    getFrequencyData: () => {
      const data = new Uint8Array(1024);
      data.fill(0);
      return data;
    },
  }),
}));

// Mock the store
vi.mock('../store/useSynthStore', () => ({
  useSynthStore: vi.fn((selector) => {
    const mockState = {
      visualization: {
        showWaveform: true,
        showFrequency: true,
        fftSize: 2048,
      },
    };

    if (typeof selector === 'function') {
      return selector(mockState);
    }
    return mockState;
  }),
}));

describe('Visualizer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders canvas element', () => {
    render(<Visualizer width={400} height={200} />);
    
    const canvas = screen.getByTestId('visualizer-canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas.tagName).toBe('CANVAS');
  });

  it('renders with default dimensions', () => {
    render(<Visualizer />);
    
    const canvas = screen.getByTestId('visualizer-canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('renders with custom dimensions', () => {
    render(<Visualizer width={600} height={300} />);
    
    const canvas = screen.getByTestId('visualizer-canvas');
    expect(canvas).toBeInTheDocument();
  });
});
