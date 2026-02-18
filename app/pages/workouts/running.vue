<template>
  <div class="flex flex-col min-h-screen bg-[#F0F2F5] relative overflow-hidden">
    
    <!-- Map Background Layer -->
    <div class="absolute inset-0 z-0">
       <!-- Simulated Map -->
       <div class="w-full h-full bg-[#EBF0F8] relative">
          <!-- Grid/Streets -->
          <svg class="w-full h-full opacity-30" width="100%" height="100%">
             <defs>
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" stroke-width="1"/>
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
             
             <!-- Mock River/Park -->
             <path d="M-10,300 Q150,250 200,400 T450,500" fill="none" stroke="#BFDBFE" stroke-width="40" />
          </svg>

          <!-- Run Path -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none">
             <path 
                d="M 100 500 Q 150 450 180 350 T 220 250 T 300 280" 
                fill="none" 
                stroke="#8B5CF6" 
                stroke-width="6" 
                stroke-linecap="round"
                class="drop-shadow-lg"
             />
             <!-- Start Point -->
             <circle cx="100" cy="500" r="8" fill="#8B5CF6" class="animate-pulse" />
             <!-- Current User Location -->
             <g transform="translate(300, 280)">
                <circle cx="0" cy="0" r="20" fill="#F59E0B" fill-opacity="0.3" class="animate-ping" />
                <circle cx="0" cy="0" r="8" fill="#F59E0B" stroke="white" stroke-width="3" />
             </g>
          </svg>
       </div>
    </div>

    <!-- Header Controls -->
    <div class="absolute top-0 left-0 right-0 z-10 pt-12 px-6 flex justify-between items-center pointer-events-none">
       <button 
         @click="router.back()"
         class="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-gray-700 pointer-events-auto hover:bg-white"
       >
          <span class="material-icons-round">arrow_back</span>
       </button>
       <div class="bg-white/80 backdrop-blur-md px-4 py-1 rounded-full shadow-sm pointer-events-auto">
          <span class="text-xs font-bold text-gray-800 flex items-center gap-1">
             <span class="material-icons-round text-green-500 text-sm">satellite_alt</span> GPS Forte
          </span>
       </div>
       <button class="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-gray-700 pointer-events-auto hover:bg-white">
          <span class="material-icons-round">music_note</span>
       </button>
    </div>

    <!-- AI Coach Bubble (Floating) -->
    <div class="absolute top-32 left-6 right-6 z-10">
       <div class="bg-gray-900/90 backdrop-blur-md text-white p-4 rounded-2xl rounded-tl-none shadow-xl border border-gray-700 animate-fade-in flex items-center gap-3 max-w-xs">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0">
             <span class="material-icons-round text-lg animate-pulse">graphic_eq</span>
          </div>
          <div>
             <p class="text-xs font-bold text-purple-300 uppercase mb-0.5">AI Pacer</p>
             <p class="text-sm font-medium">"Diminua um pouco o ritmo, seu BPM subiu rápido. Mantenha 150 BPM."</p>
          </div>
       </div>
    </div>

    <!-- Bottom Stats Card (Glassmorphism) -->
    <div class="absolute bottom-8 left-4 right-4 z-20">
       <div class="bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 shadow-2xl border border-white/40">
          <!-- Main Stats Row -->
          <div class="flex justify-between items-end mb-6">
             <div>
                <div class="flex items-center gap-2 mb-1">
                   <span class="material-icons-round text-purple-500">directions_run</span>
                   <span class="text-sm font-bold text-gray-500 uppercase tracking-wider">Corrida Livre</span>
                </div>
                <div class="flex items-baseline gap-1">
                   <span class="text-5xl font-extrabold text-gray-900">3.42</span>
                   <span class="text-lg font-bold text-gray-400">km</span>
                </div>
             </div>
             <div class="text-right">
                <div class="text-3xl font-bold text-gray-800 font-mono tracking-tight">
                   {{ formatTime(isActive ? duration + 350 : 350) }}
                </div>
                <div class="text-sm font-bold text-gray-400 mt-1">Tempo Total</div>
             </div>
          </div>

          <!-- Secondary Stats Grid -->
          <div class="grid grid-cols-3 gap-4 mb-8">
             <div class="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
                <p class="text-xl font-bold text-gray-800">5'42"</p>
                <p class="text-[10px] font-bold text-gray-400 uppercase">Pace Médio</p>
             </div>
             <div class="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
                <p class="text-xl font-bold text-red-500 flex items-center justify-center gap-1">
                   156 <span class="material-icons-round text-xs">favorite</span>
                </p>
                <p class="text-[10px] font-bold text-gray-400 uppercase">BPM</p>
             </div>
             <div class="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
                <p class="text-xl font-bold text-orange-500">284</p>
                <p class="text-[10px] font-bold text-gray-400 uppercase">KCAL</p>
             </div>
          </div>

          <!-- Slide to Action -->
          <div class="relative h-16 bg-gray-100 rounded-full overflow-hidden flex items-center px-2">
             <button 
                v-if="!isActive"
                @click="isActive = true"
                class="w-full h-full flex items-center justify-center text-primary font-bold text-lg gap-2"
             >
                <span class="material-icons-round">play_circle</span> Continuar
             </button>
             <template v-else>
                <div class="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-sm pointer-events-none">
                   PAUSAR CORRIDA
                </div>
                <button 
                   @click="isActive = false"
                   class="w-12 h-12 bg-white rounded-full shadow-md z-10 flex items-center justify-center text-red-500 hover:scale-110 transition-transform absolute left-2"
                >
                   <span class="material-icons-round text-2xl">pause</span>
                </button>
                <button 
                   @click="finishRun"
                   class="w-12 h-12 bg-gray-900 rounded-full shadow-md z-10 flex items-center justify-center text-white hover:scale-110 transition-transform absolute right-2"
                >
                   <span class="material-icons-round text-2xl">stop</span>
                </button>
             </template>
          </div>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const duration = ref(0);
const isActive = ref(false);

let timer: any = null;

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const finishRun = () => {
  isActive.value = false;
  router.push('/workouts');
};

watch(isActive, (newVal) => {
  if (newVal) {
    timer = setInterval(() => {
      duration.value++;
    }, 1000);
  } else {
    clearInterval(timer);
  }
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
