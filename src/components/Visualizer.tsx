import React, { useEffect, useRef, useCallback } from 'react';
import { useSynthStore } from '../store/useSynthStore';
import { useAudioEngine } from '../hooks/useAudioEngine';

interface VisualizerProps {
  width?: number;
  height?: number;
}

const Visualizer: React.FC<VisualizerProps> = ({
  width = 400,
  height = 200,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const { showWaveform, showFrequency } = useSynthStore((state) => state.visualization);
  const { getWaveformData, getFrequencyData } = useAudioEngine();

  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, width, height);

    if (showWaveform) {
      const waveformData = getWaveformData();
      if (waveformData) {
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2;
        ctx.beginPath();

        const sliceWidth = width / waveformData.length;
        for (let i = 0; i < waveformData.length; i++) {
          const v = waveformData[i] / 128.0;
          const y = (v * height) / 2 + height / 2;

          if (i === 0) {
            ctx.moveTo(i * sliceWidth, y);
          } else {
            ctx.lineTo(i * sliceWidth, y);
          }
        }

        ctx.stroke();
      }
    }

    if (showFrequency) {
      const frequencyData = getFrequencyData();
      if (frequencyData) {
        const barWidth = width / frequencyData.length;
        
        for (let i = 0; i < frequencyData.length; i++) {
          const barHeight = (frequencyData[i] / 255.0) * (height / 2);
          const hue = i / frequencyData.length * 360;
          
          ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
          ctx.fillRect(
            i * barWidth,
            height - barHeight,
            barWidth - 1,
            barHeight
          );
        }
      }
    }
  }, [width, height, showWaveform, showFrequency, getWaveformData, getFrequencyData]);

  useEffect(() => {
    const draw = () => {
      renderFrame();
      animationFrameRef.current = requestAnimationFrame(draw);
    };
    
    animationFrameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [renderFrame]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="visualizer w-full h-full"
      data-testid="visualizer-canvas"
    />
  );
};

export default Visualizer;
