import React, { useState, useRef, useEffect } from 'react';
import { useSynthStore } from '../store/useSynthStore';

interface TooltipProps {
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  content,
  position = 'top',
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { showTooltips } = useSynthStore();

  useEffect(() => {
    if (!isVisible || !controlRef.current || !tooltipRef.current) return;

    const controlRect = controlRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let top: number;
    let left: number;

    switch (position) {
      case 'top':
        top = controlRect.top - tooltipRect.height - 8;
        left = controlRect.left + (controlRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = controlRect.bottom + 8;
        left = controlRect.left + (controlRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = controlRect.top + (controlRect.height - tooltipRect.height) / 2;
        left = controlRect.left - tooltipRect.width - 8;
        break;
      case 'right':
        top = controlRect.top + (controlRect.height - tooltipRect.height) / 2;
        left = controlRect.right + 8;
        break;
      default:
        top = controlRect.top - tooltipRect.height - 8;
        left = controlRect.left + (controlRect.width - tooltipRect.width) / 2;
    }

    // Keep tooltip within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) left = 4;
    if (left + tooltipRect.width > viewportWidth) left = viewportWidth - tooltipRect.width - 4;
    if (top < 0) top = 4;
    if (top + tooltipRect.height > viewportHeight) top = viewportHeight - tooltipRect.height - 4;

    setTooltipPosition({ top, left });
  }, [isVisible, position]);

  const handleMouseEnter = () => {
    if (showTooltips) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  if (!showTooltips) {
    return <div ref={controlRef}>{children}</div>;
  }

  return (
    <div ref={controlRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {isVisible && tooltipPosition && (
        <div
          ref={tooltipRef}
          className="fixed z-50 bg-gray-800 text-white p-3 rounded-lg shadow-lg max-w-xs border border-gray-700"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          <div className="font-bold text-synth-purple mb-1">{title}</div>
          <div className="text-sm text-gray-300">{content}</div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
