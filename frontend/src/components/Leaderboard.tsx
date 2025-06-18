import React from 'react';
import { Trophy, TrendingUp, Zap } from 'lucide-react';
import { GlitchText } from './GlitchText';

interface LeaderboardProps {
  memes: Array<{
    id: string;
    title: string;
    score: number;
    upvotes: number;
    downvotes: number;
    currentBid: number;
    aiVibe: string;
  }>;
}

export const Leaderboard: React.FC<LeaderboardProps> = () => {
  const topMemes = [
    {
      id: '1',
      title: 'Meme 1',
      score: 100,
      upvotes: 100,
      downvotes: 10
    }];

  return (
    <div className="bg-gray-900 border-2 border-pink-500/30 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-pink-900/50 to-purple-900/50 border-b border-pink-500/20">
        <div className="flex items-center gap-2">
          <Trophy size={24} className="text-yellow-400" />
          <h2 className="text-xl font-bold text-white font-mono">
            <GlitchText text="NEURAL_LEADERBOARD" />
          </h2>
        </div>
        <p className="text-sm text-pink-400 font-mono mt-1">TOP MEMES IN THE MATRIX</p>
      </div>

      {/* Leaderboard */}
      <div className="p-4 space-y-3">
        {topMemes.map((meme, index) => (
          <div 
            key={meme.id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
              index === 0 
                ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_15px_rgba(255,255,0,0.2)]'
                : index === 1
                ? 'bg-gray-500/10 border-gray-500/50'
                : index === 2
                ? 'bg-orange-500/10 border-orange-500/50'
                : 'bg-gray-800/50 border-gray-700/50'
            }`}
          >
            {/* Rank */}
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-mono font-bold text-sm ${
              index === 0 
                ? 'bg-yellow-500 text-black'
                : index === 1
                ? 'bg-gray-400 text-black'
                : index === 2
                ? 'bg-orange-500 text-black'
                : 'bg-gray-700 text-white'
            }`}>
              {index + 1}
            </div>

            {/* Meme Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white truncate">{meme.title}</h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded font-mono">
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <TrendingUp size={14} className="text-green-400" />
                <span className={`font-mono font-bold ${
                  meme.score > 0 ? 'text-green-400' : meme.score < 0 ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {meme.score > 0 ? '+' : ''}{meme.score}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <Zap size={14} className="text-yellow-400" />
                <span className="font-mono text-yellow-400 font-bold">
                  0
                </span>
              </div>
            </div>
          </div>
        ))}

        {topMemes.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="font-mono">NO MEMES IN THE MATRIX YET</p>
            <p className="text-sm mt-1">Be the first to upload a meme!</p>
          </div>
        )}
      </div>
    </div>
  );
};