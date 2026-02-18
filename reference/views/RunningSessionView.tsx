import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RunningSessionView: React.FC = () => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  // Timer effect
  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);
    } else if (!isActive && duration !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F2F5] relative overflow-hidden">
      
      {/* Map Background Layer */}
      <div className="absolute inset-0 z-0">
         {/* Simulated Map */}
         <div className="w-full h-full bg-[#EBF0F8] relative">
            {/* Grid/Streets */}
            <svg className="w-full h-full opacity-30" width="100%" height="100%">
               <defs>
                 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                   <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" strokeWidth="1"/>
                 </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#grid)" />
               
               {/* Mock River/Park */}
               <path d="M-10,300 Q150,250 200,400 T450,500" fill="none" stroke="#BFDBFE" strokeWidth="40" />
            </svg>

            {/* Run Path (The purple line from reference) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
               <path 
                  d="M 100 500 Q 150 450 180 350 T 220 250 T 300 280" 
                  fill="none" 
                  stroke="#8B5CF6" 
                  strokeWidth="6" 
                  strokeLinecap="round"
                  className="drop-shadow-lg"
               />
               {/* Start Point */}
               <circle cx="100" cy="500" r="8" fill="#8B5CF6" className="animate-pulse" />
               {/* Current User Location */}
               <g transform="translate(300, 280)">
                  <circle cx="0" cy="0" r="20" fill="#F59E0B" fillOpacity="0.3" className="animate-ping" />
                  <circle cx="0" cy="0" r="8" fill="#F59E0B" stroke="white" strokeWidth="3" />
               </g>
            </svg>
         </div>
      </div>

      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-12 px-6 flex justify-between items-center pointer-events-none">
         <button 
           onClick={() => navigate('/workouts')}
           className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-gray-700 pointer-events-auto hover:bg-white"
         >
            <span className="material-icons-round">arrow_back</span>
         </button>
         <div className="bg-white/80 backdrop-blur-md px-4 py-1 rounded-full shadow-sm pointer-events-auto">
            <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
               <span className="material-icons-round text-green-500 text-sm">satellite_alt</span> GPS Forte
            </span>
         </div>
         <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-gray-700 pointer-events-auto hover:bg-white">
            <span className="material-icons-round">music_note</span>
         </button>
      </div>

      {/* AI Coach Bubble (Floating) */}
      <div className="absolute top-32 left-6 right-6 z-10">
         <div className="bg-gray-900/90 backdrop-blur-md text-white p-4 rounded-2xl rounded-tl-none shadow-xl border border-gray-700 animate-fade-in flex items-center gap-3 max-w-xs">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0">
               <span className="material-icons-round text-lg animate-pulse">graphic_eq</span>
            </div>
            <div>
               <p className="text-xs font-bold text-purple-300 uppercase mb-0.5">AI Pacer</p>
               <p className="text-sm font-medium">"Diminua um pouco o ritmo, seu BPM subiu rápido. Mantenha 150 BPM."</p>
            </div>
         </div>
      </div>

      {/* Bottom Stats Card (Glassmorphism) */}
      <div className="absolute bottom-8 left-4 right-4 z-20">
         <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 shadow-2xl border border-white/40">
            {/* Main Stats Row */}
            <div className="flex justify-between items-end mb-6">
               <div>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="material-icons-round text-purple-500">directions_run</span>
                     <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Corrida Livre</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                     <span className="text-5xl font-extrabold text-gray-900">3.42</span>
                     <span className="text-lg font-bold text-gray-400">km</span>
                  </div>
               </div>
               <div className="text-right">
                  <div className="text-3xl font-bold text-gray-800 font-mono tracking-tight">
                     {formatTime(isActive ? duration + 350 : 350)} {/* Mock starting time */}
                  </div>
                  <div className="text-sm font-bold text-gray-400 mt-1">Tempo Total</div>
               </div>
            </div>

            {/* Secondary Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
               <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
                  <p className="text-xl font-bold text-gray-800">5'42"</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Pace Médio</p>
               </div>
               <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
                  <p className="text-xl font-bold text-red-500 flex items-center justify-center gap-1">
                     156 <span className="material-icons-round text-xs">favorite</span>
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">BPM</p>
               </div>
               <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
                  <p className="text-xl font-bold text-orange-500">284</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">KCAL</p>
               </div>
            </div>

            {/* Slide to Action */}
            <div className="relative h-16 bg-gray-100 rounded-full overflow-hidden flex items-center px-2">
               {!isActive ? (
                  <button 
                     onClick={() => setIsActive(true)}
                     className="w-full h-full flex items-center justify-center text-primary font-bold text-lg gap-2"
                  >
                     <span className="material-icons-round">play_circle</span> Continuar
                  </button>
               ) : (
                  <>
                     <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-sm pointer-events-none">
                        PAUSAR CORRIDA
                     </div>
                     <button 
                        onClick={() => setIsActive(false)}
                        className="w-12 h-12 bg-white rounded-full shadow-md z-10 flex items-center justify-center text-red-500 hover:scale-110 transition-transform absolute left-2"
                     >
                        <span className="material-icons-round text-2xl">pause</span>
                     </button>
                     <button 
                        onClick={() => { setIsActive(false); navigate('/workouts'); }}
                        className="w-12 h-12 bg-gray-900 rounded-full shadow-md z-10 flex items-center justify-center text-white hover:scale-110 transition-transform absolute right-2"
                     >
                        <span className="material-icons-round text-2xl">stop</span>
                     </button>
                  </>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};