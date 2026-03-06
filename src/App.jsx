import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, Play, Info, Flame, Trophy, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isEntryComplete, setIsEntryComplete] = useState(false);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(gamesData.map(g => g.category))];
    return cats;
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Splash Screen Entry Point */}
      <AnimatePresence>
        {!isEntryComplete && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                <Gamepad2 className="text-black w-12 h-12" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-display uppercase tracking-tighter mb-2">Nexus Games</h1>
              <p className="text-white/40 tracking-[0.3em] uppercase text-xs font-medium">Unblocked • High Performance • Curated</p>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => setIsEntryComplete(true)}
              className="group relative px-12 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest text-sm">
                Enter Portal <Play className="w-4 h-4 fill-current" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-10 text-[10px] text-white/20 uppercase tracking-[0.5em]"
            >
              System Ready • v1.0.4
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass-panel px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <Gamepad2 className="text-black w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tighter font-display uppercase">Nexus Games</span>
        </div>

        <div className="flex-1 max-w-md mx-8 relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search games..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-white/30 transition-colors text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-medium text-white/60 uppercase tracking-widest">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Trending</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-white/60 uppercase tracking-widest">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span>Top Rated</span>
          </div>
        </div>
      </nav>

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-white text-black' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hero Section */}
        {searchQuery === '' && activeCategory === 'All' && (
          <div className="mb-12 relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer" onClick={() => setSelectedGame(gamesData[0])}>
            <img 
              src="https://picsum.photos/seed/gaming-hero/1200/600" 
              alt="Featured Game" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-orange-500 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase">Featured</span>
                <span className="text-white/60 text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> Just Added</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-display uppercase tracking-tighter mb-4">Slope: Neon Run</h1>
              <p className="text-white/70 max-w-lg mb-6 line-clamp-2">Experience the ultimate high-speed neon challenge. Navigate through a futuristic landscape and test your reflexes in this addictive endless runner.</p>
              <button className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white/90 transition-colors">
                <Play className="w-4 h-4 fill-current" /> Play Now
              </button>
            </div>
          </div>
        )}

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filteredGames.map((game) => (
            <motion.div
              layout
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-white/5">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <Play className="text-black w-6 h-6 fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-black/60 backdrop-blur-md text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-wider">
                    {game.category}
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-sm md:text-base group-hover:text-white/80 transition-colors truncate">{game.title}</h3>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <Info className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">No games found matching your search.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-10 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-3 mb-4 opacity-40">
          <Gamepad2 className="w-5 h-5" />
          <span className="text-sm font-bold tracking-tighter font-display uppercase">Nexus Games</span>
        </div>
        <p className="text-white/20 text-xs">© 2024 Nexus Games. All rights reserved. Unblocked and ready to play.</p>
      </footer>

      {/* Game Player Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl"
          >
            <div className="relative w-full h-full max-w-6xl flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl md:text-2xl font-bold font-display uppercase tracking-tighter">{selectedGame.title}</h2>
                  <span className="bg-white/10 text-white/60 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">{selectedGame.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      const iframe = document.getElementById('game-iframe');
                      if (iframe && iframe.requestFullscreen) iframe.requestFullscreen();
                    }}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    title="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 bg-black rounded-2xl overflow-hidden border border-white/10 relative">
                <iframe
                  id="game-iframe"
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  allowFullScreen
                  title={selectedGame.title}
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-white/40 text-xs">
                <p>Having issues? Try refreshing the page.</p>
                <div className="flex gap-4">
                  <span>Press ESC to exit fullscreen</span>
                  <span>Nexus Games Player v1.0</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
