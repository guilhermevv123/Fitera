import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const AuthView: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();
  
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [animateEnter, setAnimateEnter] = useState(false);
  
  // Pre-filled for demo convenience
  const [email, setEmail] = useState('demo@fitera.com');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('');

  useEffect(() => {
    // Trigger entrance animation on mount
    setAnimateEnter(true);
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API processing and transition
    setTimeout(() => {
      setIsLoading(false);
      
      if (mode === 'signup' && name) {
        setUser(prev => ({ ...prev, name: name }));
      }
      
      // If signup, go to onboarding (setup), else go to feed
      navigate(mode === 'signup' ? '/onboarding' : '/feed');
    }, 2000);
  };

  const toggleMode = () => {
    const newMode = mode === 'login' ? 'signup' : 'login';
    setMode(newMode);
    
    // Reset or set fields based on mode for smooth demo
    if (newMode === 'login') {
        setName('');
        setEmail('demo@fitera.com');
        setPassword('123456');
    } else {
        setName('');
        setEmail('');
        setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden flex flex-col justify-end">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-gray-900 transition-opacity duration-1000 ${animateEnter ? 'opacity-40' : 'opacity-100'} z-10`}></div>
        <img 
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop" 
          alt="Fitness Background" 
          className={`w-full h-full object-cover transition-transform duration-[20s] ease-linear ${animateEnter ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent z-0"></div>
      </div>

      {/* Brand Section (Top) */}
      <div className={`absolute top-0 left-0 right-0 p-8 pt-16 flex flex-col items-center z-10 transition-all duration-1000 transform ${animateEnter ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
         <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,106,0,0.5)] mb-4 animate-bounce-slow">
            <span className="material-icons-round text-4xl text-white">bolt</span>
         </div>
         <h1 className="text-4xl font-extrabold text-white tracking-tight mb-1">FITERA</h1>
         <p className="text-gray-300 font-medium tracking-wide text-sm">Evolua seu corpo. Ganhe o jogo.</p>
      </div>

      {/* Auth Card (Bottom Sheet) */}
      <div className={`relative z-20 bg-white rounded-t-[2.5rem] p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] transition-all duration-700 delay-300 transform ${animateEnter ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        
        {/* Decorative Pull Bar */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8"></div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
          </h2>
          <p className="text-gray-500 text-sm">
            {mode === 'login' ? 'Continue sua jornada épica.' : 'Comece sua transformação hoje.'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
           {/* Name Input (Signup Only) - Animate Height */}
           <div className={`overflow-hidden transition-all duration-500 ease-in-out ${mode === 'signup' ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-icons-round text-gray-400 group-focus-within:text-primary transition-colors">person</span>
                 </div>
                 <input 
                    type="text" 
                    placeholder="Seu Nome" 
                    className="w-full bg-gray-50 text-gray-900 pl-12 pr-4 py-4 rounded-xl border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                    required={mode === 'signup'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                 />
              </div>
           </div>

           {/* Email Input */}
           <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <span className="material-icons-round text-gray-400 group-focus-within:text-primary transition-colors">email</span>
              </div>
              <input 
                 type="email" 
                 placeholder="Seu Email" 
                 className="w-full bg-gray-50 text-gray-900 pl-12 pr-4 py-4 rounded-xl border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
              />
           </div>

           {/* Password Input */}
           <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <span className="material-icons-round text-gray-400 group-focus-within:text-primary transition-colors">lock</span>
              </div>
              <input 
                 type="password" 
                 placeholder="Sua Senha" 
                 className="w-full bg-gray-50 text-gray-900 pl-12 pr-4 py-4 rounded-xl border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
              />
           </div>

           {/* Action Button */}
           <button 
             type="submit" 
             disabled={isLoading}
             className="w-full bg-gradient-to-r from-primary to-orange-600 hover:to-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 relative overflow-hidden"
           >
              {isLoading ? (
                 <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                 <>
                   {mode === 'login' ? 'Entrar' : 'Cadastrar Grátis'}
                   <span className="material-icons-round">arrow_forward</span>
                 </>
              )}
           </button>
        </form>

        {/* Social Login */}
        <div className="mt-8">
           <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-x-0 h-px bg-gray-100"></div>
              <span className="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Ou entre com</span>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
                 <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                 <span className="font-bold text-gray-700 text-sm">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
                 <img src="https://www.svgrepo.com/show/475647/apple-color.svg" alt="Apple" className="w-5 h-5" />
                 <span className="font-bold text-gray-700 text-sm">Apple</span>
              </button>
           </div>
        </div>

        {/* Toggle Mode */}
        <div className="mt-8 text-center">
           <p className="text-gray-500 text-sm">
              {mode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'} 
              <button 
                 onClick={toggleMode}
                 className="text-primary font-bold ml-1 hover:underline focus:outline-none"
              >
                 {mode === 'login' ? 'Cadastre-se' : 'Fazer Login'}
              </button>
           </p>
        </div>
      </div>
    </div>
  );
};