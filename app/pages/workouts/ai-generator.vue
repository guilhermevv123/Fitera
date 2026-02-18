<template>
  <div class="flex flex-col min-h-screen bg-surface relative">
    <header class="bg-surface/95 backdrop-blur-md px-4 pt-6 pb-4 border-b border-primary/5 sticky top-0 z-50">
      <div class="flex items-center gap-4">
        <button 
          @click="router.back()"
          class="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm text-gray-400 hover:text-primary transition-colors border border-gray-100"
        >
          <span class="material-icons-round">arrow_back</span>
        </button>
        <div>
          <h1 class="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span class="material-icons-round text-primary">smart_toy</span>
            FitAI Coach
          </h1>
          <p class="text-xs text-gray-500">Inteligência especializada</p>
        </div>
      </div>
    </header>

    <main class="flex-1 flex flex-col items-center justify-center px-6 pb-32">
      <div v-if="loading" class="flex flex-col items-center justify-center w-full">
          <div class="relative w-32 h-32 mb-8">
             <div class="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
             <div class="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
             <div class="absolute inset-2 border-4 border-orange-200 border-b-transparent rounded-full animate-spin-reverse"></div>
             <span class="absolute inset-0 flex items-center justify-center material-icons-round text-primary text-5xl">psychology</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Construindo Treino...</h2>
          <div class="space-y-2 text-center">
             <p class="text-gray-500 text-sm animate-pulse">Analisando recuperação muscular (12%)</p>
             <p class="text-gray-500 text-sm animate-pulse delay-100">Ajustando volume para Hipertrofia</p>
             <p class="text-gray-500 text-sm animate-pulse delay-200">Selecionando exercícios compostos</p>
          </div>
      </div>
      <div v-else class="w-full max-w-sm">
        <div class="bg-white p-6 rounded-[2rem] shadow-xl border border-primary/10 mb-8 relative overflow-hidden text-center">
           <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-400"></div>
           
           <div class="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 relative">
              <span class="material-icons-round text-4xl text-primary">auto_awesome</span>
              <div class="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center">
                 <span class="material-icons-round text-white text-[10px]">check</span>
              </div>
           </div>

           <h2 class="text-2xl font-bold text-gray-900 mb-2">Pronto para treinar?</h2>
           <p class="text-gray-500 mb-6 leading-relaxed">
              Sua inteligência de treino já analisou seu perfil e recuperação. Vamos gerar a melhor rotina para hoje.
           </p>

           <div class="bg-gray-50 rounded-xl p-4 text-left space-y-3 mb-2">
              <div class="flex items-center gap-3">
                 <span class="material-icons-round text-primary bg-white p-1 rounded-lg shadow-sm">fitness_center</span>
                 <div>
                    <p class="text-xs font-bold text-gray-400 uppercase">Foco Sugerido</p>
                    <p class="font-bold text-gray-800">Superiores & Core</p>
                 </div>
              </div>
              <div class="flex items-center gap-3">
                 <span class="material-icons-round text-blue-500 bg-white p-1 rounded-lg shadow-sm">timer</span>
                 <div>
                    <p class="text-xs font-bold text-gray-400 uppercase">Duração Estimada</p>
                    <p class="font-bold text-gray-800">45 - 60 min</p>
                 </div>
              </div>
           </div>
        </div>

        <button 
          @click="generate"
          class="w-full bg-primary hover:bg-primary-dark text-white font-bold text-xl py-5 rounded-2xl shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-3 group"
        >
          <span class="material-icons-round group-hover:rotate-12 transition-transform">bolt</span>
          Gerar Treino Agora
        </button>
        
        <p class="text-center text-xs text-gray-400 mt-4">
           Baseado no seu histórico e nível atual.
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const loading = ref(false);

const generate = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    router.push('/workouts');
  }, 3000);
};
</script>

<style scoped>
.animate-spin-reverse {
  animation: spin-reverse 1s linear infinite;
}

@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
