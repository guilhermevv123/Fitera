<template>
  <div class="flex flex-col min-h-screen bg-surface relative overflow-hidden">
    <!-- Header -->
    <header class="bg-surface/95 backdrop-blur-md px-4 pt-6 pb-4 z-50 border-b border-primary/5 sticky top-0">
      <div class="flex justify-between items-center">
        <button 
          @click="router.back()"
          class="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm text-gray-400 hover:text-primary transition-colors border border-gray-100"
        >
          <span class="material-icons-round">arrow_back</span>
        </button>
        <h1 class="text-lg font-bold text-gray-800">Criar Treino</h1>
        <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm text-gray-400 hover:text-primary transition-colors border border-gray-100">
          <span class="material-icons-round">more_horiz</span>
        </button>
      </div>
    </header>

    <main class="flex-1 overflow-y-auto no-scrollbar relative px-4 pt-4 pb-32">
      <div class="mb-8">
        <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nome da Rotina</label>
        <div class="relative group">
          <input 
            class="w-full bg-white text-xl font-bold text-gray-800 px-4 py-4 rounded-2xl border-2 border-transparent focus:border-primary outline-none shadow-sm focus:shadow-md transition-all placeholder-gray-300" 
            placeholder="ex: Treino de Perna" 
            type="text" 
            v-model="routineName"
          />
          <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary opacity-0 group-hover:opacity-100 transition-opacity material-icons-round">edit</span>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider">Adicionar Exercícios</label>
          <button class="text-xs font-bold text-primary hover:text-primary-dark">Navegar na Biblioteca</button>
        </div>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 material-icons-round">search</span>
          <input class="w-full bg-gray-100 text-sm font-medium text-gray-800 pl-11 pr-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-all placeholder-gray-400" placeholder="Buscar flexões, agachamentos..." type="text"/>
          <button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-1.5 rounded-lg shadow-sm text-gray-400 hover:text-primary">
            <span class="material-icons-round text-lg">tune</span>
          </button>
        </div>
      </div>

      <div class="space-y-4 mb-8">
        <!-- Exercise Card 1 -->
        <div class="bg-white p-4 rounded-2xl shadow-card border border-transparent hover:border-primary/20 transition-all group">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-primary">
                <span class="material-icons-round">fitness_center</span>
              </div>
              <div>
                <h3 class="font-bold text-gray-800">Supino com Halteres</h3>
                <span class="text-xs text-gray-500 font-medium">Peito • Força</span>
              </div>
            </div>
            <button class="text-gray-300 hover:text-red-500 transition-colors">
              <span class="material-icons-round">remove_circle_outline</span>
            </button>
          </div>
          <div class="flex space-x-2">
            <div class="flex-1 bg-gray-50 rounded-lg p-2 flex flex-col items-center border border-gray-100">
              <span class="text-[10px] uppercase text-gray-400 font-bold mb-1">Séries</span>
              <div class="flex items-center space-x-2">
                <button class="text-gray-400 hover:text-primary"><span class="material-icons-round text-sm">remove</span></button>
                <span class="font-bold text-lg text-primary">3</span>
                <button class="text-gray-400 hover:text-primary"><span class="material-icons-round text-sm">add</span></button>
              </div>
            </div>
            <div class="flex-1 bg-gray-50 rounded-lg p-2 flex flex-col items-center border border-gray-100">
              <span class="text-[10px] uppercase text-gray-400 font-bold mb-1">Reps</span>
              <div class="flex items-center space-x-2">
                <button class="text-gray-400 hover:text-primary"><span class="material-icons-round text-sm">remove</span></button>
                <span class="font-bold text-lg text-primary">12</span>
                <button class="text-gray-400 hover:text-primary"><span class="material-icons-round text-sm">add</span></button>
              </div>
            </div>
            <div class="flex-1 bg-gray-50 rounded-lg p-2 flex flex-col items-center border border-gray-100">
              <span class="text-[10px] uppercase text-gray-400 font-bold mb-1">Carga</span>
              <div class="flex items-center space-x-1">
                <span class="font-bold text-lg text-gray-800">20</span>
                <span class="text-xs text-gray-400 font-bold">kg</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Exercise Card 2 -->
        <div class="bg-white p-4 rounded-2xl shadow-card border border-transparent hover:border-primary/20 transition-all group">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-500">
                <span class="material-icons-round">directions_run</span>
              </div>
              <div>
                <h3 class="font-bold text-gray-800">Joelho Alto</h3>
                <span class="text-xs text-gray-500 font-medium">Cardio • HIIT</span>
              </div>
            </div>
            <button class="text-gray-300 hover:text-red-500 transition-colors">
              <span class="material-icons-round">remove_circle_outline</span>
            </button>
          </div>
          <div class="flex space-x-2">
            <div class="flex-1 bg-gray-50 rounded-lg p-2 flex flex-col items-center border border-gray-100">
              <span class="text-[10px] uppercase text-gray-400 font-bold mb-1">Duração</span>
              <div class="flex items-center space-x-2">
                <button class="text-gray-400 hover:text-primary"><span class="material-icons-round text-sm">remove</span></button>
                <span class="font-bold text-lg text-primary">45s</span>
                <button class="text-gray-400 hover:text-primary"><span class="material-icons-round text-sm">add</span></button>
              </div>
            </div>
            <div class="w-1/3 bg-gray-50 rounded-lg p-2 flex flex-col items-center justify-center border border-gray-100 text-gray-400">
              <span class="material-icons-round text-xl">timer</span>
            </div>
          </div>
        </div>

        <button class="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 font-bold flex items-center justify-center gap-2 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
          <span class="material-icons-round">add_circle</span>
            Adicionar Exercício
        </button>
      </div>
      <div class="h-20"></div>
    </main>

    <div class="absolute bottom-0 w-full bg-white border-t border-gray-100 p-4 z-50">
      <button 
         @click="handleSave"
         :disabled="isSaving"
         class="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-xl shadow-md active:translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
      >
        <div v-if="isSaving" class="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
        <template v-else>
          <span class="material-icons-round">check_circle</span>
          Finalizar & Salvar
        </template>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const { saveWorkout } = useApp();

const routineName = ref("Meu Novo Treino");
const isSaving = ref(false);

// For demo purposes, we'll save these static exercises but with the user's routine name
const exercises = [
  { id: 'e1', name: 'Supino com Halteres', muscle: 'Peito', type: 'strength', icon: 'fitness_center', sets: 3, reps: 12, weight: 20 },
  { id: 'e3', name: 'Joelho Alto', muscle: 'Cardio', type: 'cardio', icon: 'directions_run', duration: 45 }
];

const handleSave = async () => {
  if (!routineName.value.trim()) return;
  
  isSaving.value = true;
  try {
    const success = await saveWorkout({
      name: routineName.value,
      assignedBy: 'user',
      isCompleted: false,
      exercises: exercises as any
    });
    
    if (success) {
      router.push('/workouts');
    }
  } catch (e) {
    console.error('Error saving workout:', e);
  } finally {
    isSaving.value = false;
  }
};
</script>
