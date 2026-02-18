<template>
  <div class="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
    <!-- Background Ambience -->
    <div class="absolute inset-0 z-0 pointer-events-none">
       <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
    </div>

    <div class="relative z-10 w-full max-w-sm">
      <!-- Animated Icon -->
      <div class="relative w-24 h-24 mx-auto mb-8">
         <div class="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
         <div class="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
         <div class="absolute inset-0 flex items-center justify-center">
            <span class="material-icons-round text-4xl text-primary animate-pulse">fingerprint</span>
         </div>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mb-2">Criando seu Perfil</h2>
      <p class="text-gray-500 mb-8">
         A inteligência artificial está ajustando suas metas e calibrando os desafios iniciais.
      </p>
      
      <!-- Step Indicators -->
      <div class="space-y-4 text-left bg-white p-6 rounded-2xl shadow-card border border-gray-100/50 backdrop-blur-sm">
         <div v-for="(step, index) in steps" :key="index" :class="['flex items-center gap-3 transition-all duration-300', isDoneOrCurrent(index) ? 'opacity-100' : 'opacity-40']">
            <div :class="['w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors', isDone(index) ? 'bg-green-500 border-green-500 text-white' : isCurrent(index) ? 'border-primary text-primary' : 'border-gray-300 text-transparent']">
               <span v-if="isDone(index)" class="material-icons-round text-sm font-bold">check</span>
               <div v-else-if="isCurrent(index)" class="w-2 h-2 bg-primary rounded-full animate-ping"></div>
            </div>
            <span :class="['text-sm font-medium', isDone(index) ? 'text-gray-800' : isCurrent(index) ? 'text-primary font-bold' : 'text-gray-500']">
               {{ step.label }}
            </span>
         </div>
      </div>

      <!-- Progress Bar -->
      <div class="mt-8 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
         <div 
           class="h-full bg-primary transition-all duration-100 ease-out"
           :style="{ width: `${progress}%` }"
         ></div>
      </div>
      <p class="text-xs font-bold text-gray-400 mt-2 text-right">{{ Math.round(progress) }}%</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const progress = ref(0);

const steps = [
  { label: 'Verificando credenciais', threshold: 20 },
  { label: 'Sincronizando dados locais', threshold: 50 },
  { label: 'Gerando plano de treino inicial', threshold: 80 },
  { label: 'Finalizando setup', threshold: 100 }
];

const isDone = (index: number) => progress.value > steps[index].threshold || (index === steps.length - 1 && progress.value >= 100);
const isCurrent = (index: number) => {
  if (index === 0) return progress.value <= steps[0].threshold;
  return progress.value > steps[index - 1].threshold && progress.value <= steps[index].threshold;
};
const isDoneOrCurrent = (index: number) => isDone(index) || isCurrent(index);

onMounted(() => {
  const timer = setInterval(() => {
    progress.value += 1.5;
    if (progress.value >= 100) {
      progress.value = 100;
      clearInterval(timer);
      setTimeout(() => router.push('/feed'), 500);
    }
  }, 50);
});
</script>
