import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const OnboardingView: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Automatic progression system
    const timer = setInterval(() => {
      setProgress(old => {
        const newProgress = old + 1.5; // Speed of loading
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate('/feed'), 500); // Small delay at 100% before nav
          return 100;
        }
        return newProgress;
      });
    }, 50); // Updates every 50ms

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Animated Icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
           <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
           <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
           <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-icons-round text-4xl text-primary animate-pulse">fingerprint</span>
           </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2 animate-fade-in-up">Criando seu Perfil</h2>
        <p className="text-gray-500 mb-8 animate-fade-in-up delay-100">
           A inteligência artificial está ajustando suas metas e calibrando os desafios iniciais.
        </p>
        
        {/* Step Indicators */}
        <div className="space-y-4 text-left bg-white p-6 rounded-2xl shadow-card border border-gray-100/50 backdrop-blur-sm">
           <StepItem 
             label="Verificando credenciais" 
             done={progress > 20} 
             current={progress <= 20} 
           />
           <StepItem 
             label="Sincronizando dados locais" 
             done={progress > 50} 
             current={progress > 20 && progress <= 50} 
           />
           <StepItem 
             label="Gerando plano de treino inicial" 
             done={progress > 80} 
             current={progress > 50 && progress <= 80} 
           />
           <StepItem 
             label="Finalizando setup" 
             done={progress >= 100} 
             current={progress > 80} 
           />
        </div>

        {/* Progress Bar */}
        <div className="mt-8 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
           <div 
             className="h-full bg-primary transition-all duration-100 ease-out"
             style={{ width: `${progress}%` }}
           ></div>
        </div>
        <p className="text-xs font-bold text-gray-400 mt-2 text-right">{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

const StepItem = ({ label, done, current }: { label: string, done: boolean, current: boolean }) => (
  <div className={`flex items-center gap-3 transition-all duration-300 ${done || current ? 'opacity-100' : 'opacity-40'}`}>
     <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${done ? 'bg-green-500 border-green-500 text-white' : current ? 'border-primary text-primary' : 'border-gray-300 text-transparent'}`}>
        {done ? (
           <span className="material-icons-round text-sm font-bold">check</span>
        ) : current ? (
           <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
        ) : null}
     </div>
     <span className={`text-sm font-medium ${done ? 'text-gray-800' : current ? 'text-primary font-bold' : 'text-gray-500'}`}>
        {label}
     </span>
  </div>
);