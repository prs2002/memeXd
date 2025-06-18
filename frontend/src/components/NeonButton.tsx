import React from 'react';

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

export const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  className = '' 
}) => {
  const baseClasses = "px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-300 border-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_#00ffff] active:scale-95",
    secondary: "border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-black hover:shadow-[0_0_20px_#ff0080] active:scale-95",
    danger: "border-red-500 text-red-500 hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_#ff0000] active:scale-95"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};