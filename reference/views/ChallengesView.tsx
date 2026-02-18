import React, { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { ChallengeNode } from '../components/ChallengeNode';
import { useApp } from '../context/AppContext';
import { Challenge } from '../types';

export const ChallengesView: React.FC = () => {
  const { challenges, completeChallenge } = useApp();
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const handleNodeClick = (challenge: Challenge) => {
    if (challenge.state === 'locked') return;
    setSelectedChallenge(challenge);
  };

  const handleComplete = () => {
    if (selectedChallenge) {
      completeChallenge(selectedChallenge.id);
      setSelectedChallenge(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface pb-24 relative overflow-hidden">
      <TopBar />
      
      {/* Daily Goal Card */}
      <div className="px-4 py-4 relative z-20">
        <div className="bg-white rounded-2xl p-5 shadow-card border border-primary/10 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full -mr-10 -mt-10 group-hover:bg-primary/20 transition-colors"></div>
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="inline-flex items-center space-x-1 bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 uppercase tracking-wider">
                <span className="material-icons-round text-[12px]">bolt</span>
                <span>Meta Diária</span>
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-1">20 Agachamentos com Salto</h3>
              <p className="text-sm text-gray-500 mb-4">Complete em uma sessão</p>
              <button className="bg-primary hover:bg-primary-dark text-white font-bold text-sm py-2 px-6 rounded-xl shadow-md active:translate-y-0.5 transition-all">
                Começar
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-1">
                <span className="material-icons-round text-3xl text-primary">fitness_center</span>
              </div>
              <span className="text-xs font-bold text-primary">+50 XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-6 relative z-20">
        <div className="inline-block bg-primary text-white text-sm font-bold px-5 py-1.5 rounded-full shadow-lg border-2 border-white">
          Seção 1: O Despertar
        </div>
      </div>

      {/* Map Area */}
      <div className="relative flex-1 px-4 min-h-[600px]">
        {/* SVG Path Background */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
           <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 800">
             {/* Base path gray */}
             <path 
                d="M200 40 L200 120 C200 180 320 180 320 260 L320 340 C320 420 80 420 80 500 L80 580 C80 660 200 660 200 740" 
                stroke="#E5E7EB" 
                strokeWidth="12" 
                fill="none" 
                strokeLinecap="round"
             />
             {/* Progress path orange (static approximation based on completed nodes) */}
             <path 
                d="M200 40 L200 120 C200 180 320 180 320 260 L320 340 C320 400 240 405 200 430" 
                stroke="#FF6A00" 
                strokeWidth="12" 
                fill="none" 
                strokeLinecap="round"
                strokeDasharray="12 0"
             />
           </svg>
        </div>

        {/* Nodes */}
        <div className="relative z-10 flex flex-col space-y-8 pb-10">
            {/* Hardcoded layout mapping to mock data for visual fidelity to the zigzag */}
            
            {/* Node 1: Center */}
            <div className="flex justify-center pt-2">
                <ChallengeNode challenge={challenges[0]} onClick={handleNodeClick} />
            </div>

            {/* Node 2: Right */}
            <div className="flex justify-end pr-[15%]">
                <ChallengeNode challenge={challenges[1]} onClick={handleNodeClick} />
            </div>

            {/* Node 3: Right (Current) */}
            <div className="flex justify-end pr-[15%] pt-4">
                <ChallengeNode challenge={challenges[2]} onClick={handleNodeClick} />
            </div>

            {/* Node 4: Bonus (Centerish) */}
             <div className="flex justify-center pl-8 pt-2">
                <ChallengeNode challenge={challenges[3]} onClick={handleNodeClick} />
            </div>

            {/* Node 5: Left */}
            <div className="flex justify-start pl-[15%]">
                <ChallengeNode challenge={challenges[4]} onClick={handleNodeClick} />
            </div>

            {/* Node 6: Center */}
            <div className="flex justify-center pt-2">
                <ChallengeNode challenge={challenges[5]} onClick={handleNodeClick} />
            </div>
        </div>

        {/* Next Section Teaser */}
        <div className="flex justify-center mt-4 opacity-50 grayscale pb-12">
            <div className="bg-gray-100 rounded-2xl p-4 w-48 text-center border-2 border-dashed border-gray-300">
                <span className="material-icons-round text-3xl text-gray-400 mb-2">emoji_events</span>
                <div className="text-xs font-bold text-gray-500">Seção 2<br/>O Esforço</div>
            </div>
        </div>
      </div>

      {/* Modal for Challenge */}
      {selectedChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl transform transition-all scale-100">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                 <span className="material-icons-round text-5xl">{selectedChallenge.icon}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedChallenge.title}</h2>
              <div className="flex justify-center items-center gap-3 mb-6 text-sm text-gray-500">
                <span className="flex items-center"><span className="material-icons-round text-base mr-1">timer</span> {selectedChallenge.duration} min</span>
                <span>•</span>
                <span className="flex items-center"><span className="material-icons-round text-base mr-1">bolt</span> {selectedChallenge.xp} XP</span>
              </div>
              
              <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                Prepare-se para suar! Esta sessão foca em intervalos de alta intensidade para acelerar seu metabolismo.
              </p>

              <button 
                onClick={handleComplete}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-95 mb-3"
              >
                Concluir Desafio
              </button>
              <button 
                onClick={() => setSelectedChallenge(null)}
                className="w-full bg-transparent text-gray-400 font-bold py-2 hover:text-gray-600"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};