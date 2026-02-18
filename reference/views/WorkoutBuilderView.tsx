import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const WorkoutBuilderView: React.FC = () => {
  const navigate = useNavigate();
  const [routineName, setRoutineName] = useState("Treino de Domingo");

  return (
    <div className="flex flex-col min-h-screen bg-surface relative overflow-hidden">
      {/* Header */}
      <header className="bg-surface/95 backdrop-blur-md px-4 pt-6 pb-4 z-50 border-b border-primary/5 sticky top-0">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigate('/workouts')}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm text-gray-400 hover:text-primary transition-colors border border-gray-100"
          >
            <span className="material-icons-round">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-gray-800">Criar Treino</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm text-gray-400 hover:text-primary transition-colors border border-gray-100">
            <span className="material-icons-round">more_horiz</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar relative px-4 pt-4 pb-32">
        <div className="mb-8">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nome da Rotina</label>
          <div className="relative group">
            <input 
              className="w-full bg-white text-xl font-bold text-gray-800 px-4 py-4 rounded-2xl border-2 border-transparent focus:border-primary outline-none shadow-sm focus:shadow-md transition-all placeholder-gray-300" 
              placeholder="ex: Treino de Perna" 
              type="text" 
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary opacity-0 group-hover:opacity-100 transition-opacity material-icons-round">edit</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Adicionar Exercícios</label>
            <button className="text-xs font-bold text-primary hover:text-primary-dark">Navegar na Biblioteca</button>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 material-icons-round">search</span>
            <input className="w-full bg-gray-100 text-sm font-medium text-gray-800 pl-11 pr-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-all placeholder-gray-400" placeholder="Buscar flexões, agachamentos..." type="text"/>
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-1.5 rounded-lg shadow-sm text-gray-400 hover:text-primary">
              <span className="material-icons-round text-lg">tune</span>
            </button>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {/* Exercise Card 1 */}
          <div className="bg-white p-4 rounded-2xl shadow-card border border-transparent hover:border-primary/20 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-primary">
                  <span className="material-icons-round">fitness_center</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Supino com Halteres</h3>
                  <span className="text-xs text-gray-500 font-medium">Peito • Força</span>
                </div>
              </div>
              <button className="text-gray-300 hover:text-red-500 transition-colors">
                <span className="material-icons-round">remove_circle_outline</span>
              </button>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1 bg-gray-50 rounded-lg p-2 flex flex-col items-center border border-gray-100">
                <span className="text-[10px] uppercase text-gray-400 font-bold mb-1">Séries</span>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-primary"><span className="material-icons-round text-sm">remove</span></button>
                  <span className="font-bold text-lg text-primary">3</span>
                  <button className="text-gray-400 hover:text-primary"><span className="material-icons-round text-sm">add</span></button>
                </div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-2 flex flex-col items-center border border-gray-100">
                <span className="text-[10px] uppercase text-gray-400 font-bold mb-1">Reps</span>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-primary"><span className="material-icons-round text-sm">remove</span></button>
                  <span className="font-bold text-lg text-primary">12</span>
                  <button className="text-gray-400 hover:text-primary"><span className="material-icons-round text-sm">add</span></button>
                </div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-2 flex flex-col items-center border border-gray-100">
                <span className="text-[10px] uppercase text-gray-400 font-bold mb-1">Carga</span>
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-lg text-gray-800">20</span>
                  <span className="text-xs text-gray-400 font-bold">kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Exercise Card 2 */}
          <div className="bg-white p-4 rounded-2xl shadow-card border border-transparent hover:border-primary/20 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-500">
                  <span className="material-icons-round">directions_run</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Joelho Alto</h3>
                  <span className="text-xs text-gray-500 font-medium">Cardio • HIIT</span>
                </div>
              </div>
              <button className="text-gray-300 hover:text-red-500 transition-colors">
                <span className="material-icons-round">remove_circle_outline</span>
              </button>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1 bg-gray-50 rounded-lg p-2 flex flex-col items-center border border-gray-100">
                <span className="text-[10px] uppercase text-gray-400 font-bold mb-1">Duração</span>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-primary"><span className="material-icons-round text-sm">remove</span></button>
                  <span className="font-bold text-lg text-primary">45s</span>
                  <button className="text-gray-400 hover:text-primary"><span className="material-icons-round text-sm">add</span></button>
                </div>
              </div>
              <div className="w-1/3 bg-gray-50 rounded-lg p-2 flex flex-col items-center justify-center border border-gray-100 text-gray-400">
                <span className="material-icons-round text-xl">timer</span>
              </div>
            </div>
          </div>

          <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 font-bold flex items-center justify-center gap-2 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
            <span className="material-icons-round">add_circle</span>
              Adicionar Exercício
          </button>
        </div>
        <div className="h-20"></div>
      </main>

      <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-4 z-50">
        <button 
           onClick={() => navigate('/workouts')}
           className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-xl shadow-md active:translate-y-1 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-icons-round">check_circle</span>
            Finalizar & Salvar
        </button>
      </div>
    </div>
  );
};