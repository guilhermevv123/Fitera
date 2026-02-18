<template>
  <div class="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
    <!-- Progress Indicator -->
    <div class="absolute top-12 left-0 right-0 px-8 flex gap-2">
      <div 
        v-for="i in totalSteps" 
        :key="i"
        class="h-1.5 flex-1 rounded-full transition-all duration-500"
        :class="i <= currentStep ? 'bg-primary' : 'bg-gray-800'"
      ></div>
    </div>

    <!-- Question Container -->
    <div class="w-full max-w-sm relative z-10 transition-all duration-500" :class="animating ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'">
      <div v-if="currentStep <= totalSteps">
        <span class="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">Pergunta {{ currentStep }} de {{ totalSteps }}</span>
        <h2 class="text-3xl font-black mb-8 leading-tight">{{ currentQuestion.text }}</h2>

        <div class="space-y-3">
          <button 
            v-for="option in currentQuestion.options" 
            :key="option.value"
            @click="selectOption(option.value)"
            class="w-full group relative overflow-hidden bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-primary p-5 rounded-2xl text-left transition-all active:scale-95"
          >
            <div class="flex items-center justify-between relative z-10">
              <span class="font-bold text-lg text-gray-200 group-hover:text-white">{{ option.label }}</span>
              <span class="material-icons-round text-primary opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">arrow_forward</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Processing State -->
      <div v-else class="text-center">
        <div class="relative w-24 h-24 mx-auto mb-8">
           <div class="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
           <div class="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
           <div class="absolute inset-0 flex items-center justify-center">
              <span class="material-icons-round text-4xl text-primary animate-pulse">psychology</span>
           </div>
        </div>
        <h2 class="text-3xl font-black mb-4">Calibrando seu Plano</h2>
        <p class="text-gray-400 leading-relaxed">Nossa IA está analisando suas respostas para criar o roteiro perfeito para sua evolução.</p>
      </div>
    </div>

    <!-- Background Elements -->
    <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute -top-20 -right-20 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const router = useRouter();
const { user } = useApp();

const currentStep = ref(1);
const totalSteps = 7;
const animating = ref(false);
const answers = ref<Record<string, string>>({});

const questions = [
  {
    id: 'goal',
    text: 'Qual é seu objetivo principal?',
    options: [
      { label: 'Emagrecimento', value: 'weight_loss' },
      { label: 'Ganho de Massa', value: 'muscle_gain' },
      { label: 'Manutenção e Saúde', value: 'maintenance' },
      { label: 'Flexibilidade e Yoga', value: 'flexibility' }
    ]
  },
  {
    id: 'frequency',
    text: 'Quantos dias por semana planeja treinar?',
    options: [
      { label: '1 a 2 dias', value: '1-2' },
      { label: '3 a 4 dias', value: '3-4' },
      { label: '5 ou mais', value: '5+' },
      { label: 'Todos os dias', value: 'daily' }
    ]
  },
  {
    id: 'location',
    text: 'Onde você prefere treinar?',
    options: [
      { label: 'Na Academia', value: 'gym' },
      { label: 'Em Casa', value: 'home' },
      { label: 'Ao Ar Livre', value: 'outdoor' }
    ]
  },
  {
    id: 'equipment',
    text: 'Qual seu acesso a equipamentos?',
    options: [
      { label: 'Nenhum (Peso do corpo)', value: 'none' },
      { label: 'Halteres básicos', value: 'dumbbells' },
      { label: 'Academia Completa', value: 'full_gym' }
    ]
  },
  {
    id: 'experience',
    text: 'Qual seu nível de experiência?',
    options: [
      { label: 'Iniciante (Começando agora)', value: 'beginner' },
      { label: 'Intermediário (Já treinei antes)', value: 'intermediate' },
      { label: 'Avançado (Treino pesado)', value: 'advanced' }
    ]
  },
  {
    id: 'focus',
    text: 'Alguma área precisa de atenção especial?',
    options: [
      { label: 'Coluna / Postura', value: 'back' },
      { label: 'Joelhos / Articulações', value: 'knees' },
      { label: 'Core / Abdômen', value: 'core' },
      { label: 'Sem restrições', value: 'none' }
    ]
  },
  {
    id: 'time',
    text: 'Qual seu horário favorito para treinar?',
    options: [
      { label: 'Manhã Cedo', value: 'morning' },
      { label: 'Hora do Almoço', value: 'lunch' },
      { label: 'Final do Dia', value: 'evening' },
      { label: 'Madrugada', value: 'night' }
    ]
  }
];

const currentQuestion = computed(() => questions[currentStep.value - 1]);

const selectOption = (value: string) => {
  answers.value[currentQuestion.value.id] = value;
  
  animating.value = true;
  setTimeout(() => {
    if (currentStep.value < totalSteps) {
      currentStep.value++;
      animating.value = false;
    } else {
      currentStep.value++;
      finishSurvey();
    }
  }, 400);
};

const finishSurvey = () => {
  // Mocking AI processing time
  setTimeout(() => {
    router.push('/feed');
  }, 2500);
};

definePageMeta({
  layout: false
});
</script>
