import React, { useEffect, useState } from 'react';

interface TerminalEffectProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export const TerminalEffect: React.FC<TerminalEffectProps> = ({ 
  text, 
  speed = 50, 
  className = '',
  onComplete 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={`font-mono ${className}`}>
      {displayText}
      <span className="animate-pulse text-cyan-400">|</span>
    </span>
  );
};