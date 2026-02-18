import React from 'react';
import { Challenge } from '../types';

interface Props {
  challenge: Challenge;
  onClick: (challenge: Challenge) => void;
}

export const ChallengeNode: React.FC<Props> = ({ challenge, onClick }) => {
  const isCompleted = challenge.state === 'completed';
  const isCurrent = challenge.state === 'current';
  const isLocked = challenge.state === 'locked';
  const isBonus = challenge.icon === 'inventory_2';

  // Styles based on state
  let containerClasses = "flex flex-col items-center group cursor-pointer transition-transform duration-200 active:scale-95";
  
  if (isCurrent) containerClasses += " floating-node";

  // Visuals for the circle
  let circleClasses = "w-20 h-20 rounded-full flex items-center justify-center border-4 relative z-10 transition-all shadow-button ";
  
  if (isCompleted) {
    circleClasses += "bg-primary border-white text-white";
  } else if (isCurrent) {
    circleClasses += "bg-primary border-white text-white shadow-glow pulse-ring";
  } else if (isBonus) {
    circleClasses = "w-16 h-16 rounded-xl flex items-center justify-center border-2 bg-gray-100 border-white text-yellow-500 shadow-sm mb-2"; // Special shape for bonus
  } else {
    // Locked
    circleClasses += "bg-gray-200 border-white text-gray-400 shadow-inner";
  }

  return (
    <div className={containerClasses} onClick={() => onClick(challenge)}>
      {/* Current Node Tooltip */}
      {isCurrent && (
        <div className="absolute -top-12 bg-white px-3 py-1.5 rounded-lg shadow-lg border border-primary/20 text-sm font-bold text-primary mb-2 whitespace-nowrap z-20 animate-bounce">
          Comece Aqui!
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-primary/20 rotate-45"></div>
        </div>
      )}

      {/* The Circle/Node */}
      <div className={isCurrent ? "relative w-24 h-24 flex items-center justify-center" : ""}>
         {isCurrent && <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping opacity-20"></div>}
         
         <div className={circleClasses}>
           <span className={`material-icons-round ${isBonus ? 'text-3xl' : 'text-4xl'}`}>
             {challenge.icon}
           </span>
           
           {/* Stars for completed */}
           {isCompleted && (
             <>
                <div className="absolute -top-1 -right-1 text-yellow-400"><span className="material-icons-round text-lg">star</span></div>
                <div className="absolute -top-1 -left-1 text-yellow-400"><span className="material-icons-round text-lg">star</span></div>
                <div className="absolute -bottom-2 text-yellow-400"><span className="material-icons-round text-lg">star</span></div>
             </>
           )}
         </div>
      </div>

      {/* Label */}
      <span className={`mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded ${isLocked ? 'text-gray-400' : 'text-primary bg-white/80'}`}>
        {challenge.title}
      </span>
    </div>
  );
};