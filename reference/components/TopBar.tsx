import React from 'react';
import { useApp } from '../context/AppContext';

export const TopBar: React.FC = () => {
  const { user } = useApp();
  const progressPercent = (user.xp / user.maxLevelXp) * 100;

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 pt-6 pb-2 sticky top-0 z-40 border-b border-gray-100">
      <div className="flex justify-between items-center mb-3">
        {/* XP Progress */}
        <div className="flex-1 mr-6">
          <div className="flex justify-between items-end mb-1">
            <span className="text-[10px] sm:text-xs font-bold text-primary tracking-wide uppercase">
              Nível {user.level}: {user.levelName}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-gray-400">
              {user.xp}/{user.maxLevelXp} XP
            </span>
          </div>
          <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Currency & Streak */}
        <div className="flex space-x-2 sm:space-x-3 items-center shrink-0">
          <div className="flex items-center space-x-1 bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm">
            <span className="material-icons-round text-primary text-base sm:text-lg">local_fire_department</span>
            <span className="font-bold text-xs sm:text-sm text-primary">{user.streak}</span>
          </div>
          <div className="flex items-center space-x-1 bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm">
            <span className="material-icons-round text-blue-400 text-base sm:text-lg">diamond</span>
            <span className="font-bold text-xs sm:text-sm text-blue-500">{user.coins}</span>
          </div>
        </div>
      </div>
    </header>
  );
};