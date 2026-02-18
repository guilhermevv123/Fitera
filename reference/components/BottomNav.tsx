import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const NavItem = ({ to, icon, label }: { to: string; icon: string; label: string }) => {
    const isActive = currentPath.startsWith(to);
    
    return (
      <Link to={to} className={`flex flex-col items-center justify-center w-full h-full pb-2 pt-3 transition-colors ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}>
        <span className={`material-icons-round text-2xl mb-0.5 ${isActive ? 'scale-110' : ''} transition-transform`}>{icon}</span>
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </Link>
    );
  };

  return (
    <nav className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 z-50">
      {/* Background Container */}
      <div className="bg-white border-t border-gray-100 pb-safe-bottom px-1 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] h-[72px] flex items-end justify-between relative">

        {/* Left Side */}
        <div className="flex-1 h-full"><NavItem to="/feed" icon="dynamic_feed" label="Feed" /></div>
        <div className="flex-1 h-full"><NavItem to="/workouts" icon="fitness_center" label="Treino" /></div>

        {/* Center "Desafios" Button (Highlighted) */}
        <div className="w-20 relative flex flex-col items-center justify-end h-full z-10">
           <div className="absolute -top-6">
             <Link
               to="/challenges"
               className={`flex items-center justify-center w-16 h-16 rounded-full border-[5px] border-[#F7F7F8] shadow-glow transform transition-all active:scale-95 bg-primary text-white`}
             >
                <span className="material-icons-round text-3xl">map</span>
             </Link>
           </div>
           <span className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${currentPath.startsWith('/challenges') ? 'text-primary' : 'text-gray-400'}`}>Desafios</span>
        </div>

        {/* Right Side */}
        <div className="flex-1 h-full"><NavItem to="/store" icon="storefront" label="Loja" /></div>
        <div className="flex-1 h-full"><NavItem to="/profile" icon="person" label="Perfil" /></div>

      </div>
    </nav>
  );
};