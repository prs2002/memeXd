import React, { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchChars?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  className = '', 
  glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?' 
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance to glitch
        setIsGlitching(true);
        const glitchedText = text
          .split('')
          .map(char => 
            Math.random() < 0.3 
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char
          )
          .join('');
        
        setDisplayText(glitchedText);
        
        setTimeout(() => {
          setDisplayText(text);
          setIsGlitching(false);
        }, 100);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [text, glitchChars]);

  return (
    <span 
      className={`font-mono transition-all duration-100 ${
        isGlitching ? 'text-red-500 animate-pulse' : ''
      } ${className}`}
    >
      {displayText}
    </span>
  );
};