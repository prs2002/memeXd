import { useState, useEffect } from 'react';
import { Header } from './components/Header';

import { Leaderboard } from './components/Leaderboard';
import { GlitchText } from './components/GlitchText';
import { TerminalEffect } from './components/TerminalEffect';

import { Wifi, WifiOff } from 'lucide-react';

function App() {
  const [currentUser, setCurrentUser] = useState< null>(null);

  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      {/* Matrix Grid Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* <Header currentUser={null} onCreateMeme={() => {}} /> */}

      {/* Connection Status & Notifications */}
      <div className="fixed top-20 right-4 z-30 space-y-2">
        {/* Connection Status */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
          isConnected 
            ? 'bg-green-500/20 border-green-500/50 text-green-400' 
            : 'bg-red-500/20 border-red-500/50 text-red-400'
        }`}>
          {isConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
          <span className="font-mono text-xs">
            {isConnected ? 'MATRIX CONNECTED' : 'MATRIX OFFLINE'}
          </span>
        </div>

      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Meme Gallery */}
          <div className="lg:col-span-3">
            {/* Terminal Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white font-mono mb-2">
                <GlitchText text="MEME_GALLERY.EXE" />
              </h2>
              <p className="text-cyan-400 font-mono">
                <TerminalEffect text={` MEMES LOADED // READY FOR TRADING`} speed={20} />
              </p>
            </div>

            {/* Meme Grid */}
            <div className="grid md:grid-cols-2 gap-6">
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Leaderboard memes={[]}/>
            
            {/* Quick Stats */}
            <div className="bg-gray-900 border-2 border-cyan-500/30 rounded-lg p-4">
              <h3 className="text-lg font-bold text-white font-mono mb-3">
                <GlitchText text="MATRIX_STATS" />
              </h3>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">TOTAL_MEMES:</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ACTIVE_TRADERS:</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">CONNECTION:</span>
                  <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
                    {isConnected ? 'ONLINE' : 'OFFLINE'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;