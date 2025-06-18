import React from 'react';
import { Bot, Plus, Coins } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { NeonButton } from './NeonButton';

interface HeaderProps {
  currentUser: {
    id: string;
    username: string;
    credits: number;
    avatar: string;
  };
  onCreateMeme: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="bg-black/90 backdrop-blur-sm border-b-2 border-cyan-500/30 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-lg border border-cyan-500/50 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
              <Bot size={32} className="text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-mono">
                <GlitchText text="CYBERMEME.EXE" />
              </h1>
              <p className="text-xs text-cyan-400 font-mono">v2.077 // MATRIX MARKETPLACE</p>
            </div>
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center gap-4">
            {/* User Credits */}
            <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
              <Coins size={18} className="text-yellow-400" />
              <span className="font-mono text-yellow-400 font-bold">
                
              </span>
              <span className="text-xs text-yellow-300">CREDITS</span>
            </div>

            {/* Create Meme Button */}
            <NeonButton variant="primary">
              <Plus size={16} className="inline mr-1" />
              CREATE MEME
            </NeonButton>

            {/* User Avatar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg">
              <span className="text-xl"></span>
              <div>
                <div className="text-sm font-mono text-white font-bold">
                  prs
                </div>
                <div className="text-xs text-gray-400">ONLINE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};