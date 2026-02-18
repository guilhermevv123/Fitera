<template>
  <div class="flex flex-col min-h-screen bg-surface pb-24 relative overflow-hidden">
    <TopBar />
    
    <!-- Phase Selector -->
    <div class="px-4 pt-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
      <button 
        v-for="(phase, idx) in allPhasesNav" 
        :key="phase.id"
        @click="switchPhase(phase.id)"
        class="shrink-0 text-sm font-bold px-4 py-1.5 rounded-full border-2 transition-all active:scale-95"
        :class="activePhaseId === phase.id 
          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
          : isPhaseUnlocked(phase.id) 
            ? 'bg-white text-gray-600 border-gray-200 hover:border-primary/40' 
            : 'bg-gray-100 text-gray-400 border-gray-200 opacity-60'"
      >
        {{ isPhaseUnlocked(phase.id) ? '' : '🔒 ' }}Fase {{ phase.id }}
      </button>
    </div>

    <!-- Section Header -->
    <div class="text-center mb-6 relative z-20">
      <div class="inline-flex items-center bg-primary text-white text-sm font-bold px-5 py-1.5 rounded-full shadow-lg border-2 border-white gap-2">
        <span class="material-icons-round text-base">{{ activePhaseData?.icon || 'wb_sunny' }}</span>
        Fase {{ activePhaseId }}: {{ activePhaseData?.title || '' }}
      </div>
      <div class="flex items-center justify-center gap-1 mt-2">
        <span class="text-xs text-gray-400">{{ getPhaseProgress(activePhaseId) }}/10 missões</span>
        <span class="text-xs text-primary font-bold">•</span>
        <span class="text-xs text-primary font-bold">{{ phaseXpEarned }} XP</span>
      </div>
    </div>

    <!-- Map Area -->
    <div class="relative flex-1 px-4 min-h-[1200px]">
      <!-- SVG Path Background -->
      <div class="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <svg class="w-full h-full" preserveAspectRatio="none" :viewBox="`0 0 400 ${pathHeight}`">
          <!-- Base path gray -->
          <path 
            :d="pathD"
            stroke="#E5E7EB" 
            stroke-width="12" 
            fill="none" 
            stroke-linecap="round"
          />
          <!-- Progress path orange -->
          <path 
            v-if="progressPathD"
            :d="progressPathD"
            stroke="#FF6A00" 
            stroke-width="12" 
            fill="none" 
            stroke-linecap="round"
          />
        </svg>
      </div>

      <!-- Mission Nodes -->
      <div class="relative z-10 flex flex-col space-y-12 pb-20">
        <div 
          v-for="(mission, index) in missions" 
          :key="mission.id"
          :ref="el => { if (isMissionCurrent(index)) currentMissionEl = el as any }"
          :class="[
            'flex pt-2',
            nodePosition(index) === 'center' ? 'justify-center' : 
            nodePosition(index) === 'right' ? 'justify-end pr-[15%]' : 
            'justify-start pl-[15%]'
          ]"
        >
          <!-- Node -->
          <div class="flex flex-col items-center relative z-10 mb-2" @click="handleNodeClick(mission, index)">
            <!-- Circle -->
            <div 
              class="w-20 h-20 rounded-full flex items-center justify-center relative transition-all duration-300 transform"
              :class="[
                nodeClasses(mission, index),
                isNodeUnlocked(index) ? 'cursor-pointer active:scale-95 hover:scale-105 shadow-xl' : 'opacity-80'
              ]"
            >
              <!-- Pulse for current -->
              <div v-if="isMissionCurrent(index)" class="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-20"></div>
              
              <!-- Icon -->
              <span class="material-icons-round text-3xl z-10">{{ mission.icon }}</span>

              <!-- Completed star -->
              <div v-if="isMissionCompleted(activePhaseId, mission.id)" class="absolute -top-1 -right-1 bg-yellow-400 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm text-xs border-2 border-white">
                ★
              </div>

              <!-- "Aqui!" indicator for current -->
              <div v-if="isMissionCurrent(index)" class="absolute -right-14 top-1/2 -translate-y-1/2 bg-white text-primary text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md border border-primary/20 animate-bounce">
                Aqui!
              </div>
            </div>

            <!-- Label -->
            <div class="mt-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100/50 flex flex-col items-center max-w-[120px]">
              <span class="text-[10px] font-bold text-gray-800 text-center leading-tight">{{ mission.title }}</span>
              <div v-if="isNodeUnlocked(index)" class="flex items-center space-x-1 mt-0.5">
                <span class="text-[10px] text-primary font-bold">+{{ mission.xp }} XP</span>
              </div>
              <!-- Type badge -->
              <span 
                class="text-[8px] font-bold uppercase mt-0.5 px-1.5 py-0.5 rounded"
                :class="missionTypeBadge(mission.type)"
              >{{ missionTypeLabel(mission.type) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mission Detail Modal -->
    <div v-if="selectedMission" class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4" @click.self="closeModal">
      <div class="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg shadow-2xl transition-all max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col">
        <!-- Drag handle -->
        <div class="w-12 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-1 sm:hidden"></div>
        
        <div class="p-6 overflow-y-auto flex-1">
          <div class="flex justify-between items-start mb-6">
            <div 
              class="w-16 h-16 rounded-2xl flex items-center justify-center"
              :class="missionTypeColor(selectedMission.type)"
            >
              <span class="material-icons-round text-4xl">{{ selectedMission.icon }}</span>
            </div>
            <button @click="closeModal" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100">
              <span class="material-icons-round">close</span>
            </button>
          </div>

          <h2 class="text-2xl font-black text-gray-900 mb-2">{{ selectedMission.title }}</h2>
          <div class="flex items-center gap-3 mb-6">
            <span 
              class="text-[10px] font-bold px-2 py-1 rounded-md uppercase"
              :class="missionTypeBadge(selectedMission.type)"
            >{{ missionTypeLabel(selectedMission.type) }}</span>
            <span class="flex items-center gap-1 text-xs font-bold text-primary">
              <span class="material-icons-round text-sm">bolt</span> +{{ selectedMission.xp }} XP
            </span>
          </div>

          <p class="text-sm text-gray-600 leading-relaxed mb-5">{{ selectedMission.description }}</p>

          <!-- ═══ THEORY: Quiz Section ═══ -->
          <template v-if="selectedMission.type === 'teoria' && selectedMission.quizOptions">
            <!-- Content first -->
            <div v-if="selectedMission.instructions" class="bg-gray-50 rounded-2xl p-5 mb-5 border border-gray-100">
              <h3 class="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
                <span class="material-icons-round text-primary text-xl">auto_stories</span>
                Conteúdo
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{{ selectedMission.instructions }}</p>
            </div>

            <!-- Quiz Question -->
            <div class="bg-blue-50 rounded-2xl p-5 mb-5 border border-blue-100">
              <h3 class="flex items-center gap-2 text-sm font-bold text-blue-800 mb-3 uppercase tracking-wider">
                <span class="material-icons-round text-blue-500 text-xl">quiz</span>
                Teste seu conhecimento
              </h3>
              <p class="text-sm text-blue-900 font-medium leading-relaxed mb-4">{{ selectedMission.question }}</p>
              
              <!-- Options -->
              <div class="space-y-2.5">
                <button
                  v-for="(option, optIdx) in selectedMission.quizOptions"
                  :key="optIdx"
                  @click="selectQuizAnswer(optIdx)"
                  :disabled="quizAnswered"
                  class="w-full text-left p-3.5 rounded-xl border-2 transition-all text-sm font-medium flex items-center gap-3"
                  :class="getQuizOptionClass(optIdx)"
                >
                  <div 
                    class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                    :class="getQuizBulletClass(optIdx)"
                  >
                    {{ ['A', 'B', 'C'][optIdx] }}
                  </div>
                  <span>{{ option }}</span>
                  <!-- Feedback icons -->
                  <span v-if="quizAnswered && optIdx === selectedMission.correctAnswer" class="material-icons-round text-green-500 ml-auto text-xl">check_circle</span>
                  <span v-if="quizAnswered && quizSelectedAnswer === optIdx && optIdx !== selectedMission.correctAnswer" class="material-icons-round text-red-500 ml-auto text-xl">cancel</span>
                </button>
              </div>

              <!-- Feedback message -->
              <div v-if="quizAnswered" class="mt-4 flex items-center gap-2 text-sm font-bold" :class="quizCorrect ? 'text-green-600' : 'text-red-600'">
                <span class="material-icons-round text-xl">{{ quizCorrect ? 'emoji_events' : 'refresh' }}</span>
                {{ quizCorrect ? 'Resposta correta! Parabéns! 🎉' : 'Resposta incorreta. Releia o conteúdo e tente novamente!' }}
              </div>
            </div>
          </template>

          <!-- ═══ PRACTICE: Instructions ═══ -->
          <template v-else-if="selectedMission.type === 'pratica'">
            <div v-if="selectedMission.instructions" class="bg-orange-50 rounded-2xl p-5 mb-5 border border-orange-100">
              <h3 class="flex items-center gap-2 text-sm font-bold text-orange-800 mb-3 uppercase tracking-wider">
                <span class="material-icons-round text-primary text-xl">fitness_center</span>
                Instruções
              </h3>
              <p class="text-sm text-orange-900 leading-relaxed whitespace-pre-line">{{ selectedMission.instructions }}</p>
            </div>
          </template>

          <!-- ═══ FINAL CHALLENGE: Sub Tasks ═══ -->
          <template v-else-if="selectedMission.type === 'desafio_final'">
            <div v-if="selectedMission.instructions" class="bg-gray-50 rounded-2xl p-5 mb-5 border border-gray-100">
              <h3 class="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
                <span class="material-icons-round text-primary text-xl">description</span>
                Descrição
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{{ selectedMission.instructions }}</p>
            </div>
            <div v-if="selectedMission.subTasks && selectedMission.subTasks.length > 0" class="bg-amber-50 rounded-2xl p-5 mb-5 border border-amber-100">
              <h3 class="flex items-center gap-2 text-sm font-bold text-amber-800 mb-3 uppercase tracking-wider">
                <span class="material-icons-round text-amber-600 text-xl">emoji_events</span>
                Etapas do Desafio
              </h3>
              <div class="space-y-3">
                <div v-for="(task, i) in selectedMission.subTasks" :key="i" class="flex items-start gap-3">
                  <div class="w-7 h-7 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 text-[11px] font-black">
                    {{ i + 1 }}
                  </div>
                  <p class="text-sm text-amber-900 pt-0.5">{{ task }}</p>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Sticky Footer -->
        <div class="p-6 bg-white border-t border-gray-50">
          <!-- Already completed -->
          <div v-if="isMissionCompleted(activePhaseId, selectedMission.id)" class="w-full bg-green-50 text-green-700 font-bold text-sm py-4 rounded-2xl border-2 border-green-200 text-center flex items-center justify-center gap-2">
            <span class="material-icons-round text-lg">check_circle</span>
            Missão já concluída ✓
          </div>
          <!-- Theory: needs correct answer -->
          <template v-else-if="selectedMission.type === 'teoria'">
            <button 
              v-if="quizCorrect"
              @click="handleComplete"
              :disabled="isCompleting"
              class="w-full bg-primary hover:bg-primary-dark text-white font-black text-lg py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span v-if="isCompleting" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              {{ isCompleting ? 'Salvando...' : 'Concluir & Ganhar XP' }}
            </button>
            <div v-else-if="quizAnswered && !quizCorrect" class="w-full">
              <button 
                @click="retryQuiz"
                class="w-full bg-gray-800 text-white font-bold text-base py-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span class="material-icons-round text-lg">refresh</span>
                Tentar Novamente
              </button>
            </div>
            <div v-else class="w-full bg-blue-50 text-blue-600 font-bold text-sm py-4 rounded-2xl border-2 border-blue-200 text-center flex items-center justify-center gap-2">
              <span class="material-icons-round text-lg">quiz</span>
              Responda o quiz para concluir
            </div>
          </template>
          <!-- Practice / Final Challenge: just complete -->
          <template v-else>
            <button 
              @click="handleComplete"
              :disabled="isCompleting"
              class="w-full bg-primary hover:bg-primary-dark text-white font-black text-lg py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span v-if="isCompleting" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              {{ isCompleting ? 'Salvando...' : 'Concluir & Ganhar XP' }}
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- Celebration Toast -->
    <Transition name="toast">
      <div v-if="showCelebration" class="fixed bottom-28 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-orange-600 text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-xl z-50 flex items-center gap-2.5 whitespace-nowrap">
        <span class="text-xl">🎉</span>
        {{ celebrationMsg }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { PHASES_DATA, PHASES_OVERVIEW } from '~/utils/phasesData';
import type { Mission } from '~/types';

const { user, fetchProgress, completeMission, isMissionCompleted, getPhaseProgress, userProgress } = useApp();

const activePhaseId = ref(1);
const selectedMission = ref<Mission | null>(null);
const isCompleting = ref(false);
const showCelebration = ref(false);
const celebrationMsg = ref('');
const currentMissionEl = ref<HTMLElement | null>(null);

// Quiz state
const quizSelectedAnswer = ref<number | null>(null);
const quizAnswered = ref(false);
const quizCorrect = ref(false);

// ─── Phase Navigation ─────────────────────────────────────

const allPhasesNav = computed(() => PHASES_OVERVIEW);

const activePhaseData = computed(() => {
  return PHASES_DATA.find(p => p.id === activePhaseId.value) || null;
});

const missions = computed(() => activePhaseData.value?.missions || []);

// Phase unlocking: sequential — phase N requires phase N-1 completed (10/10)
const isPhaseUnlocked = (phaseId: number) => {
  if (phaseId === 1) return true;
  // Check if phase data exists for this phase
  const hasData = PHASES_DATA.some(p => p.id === phaseId);
  if (!hasData) return false;
  // Previous phase must be 100% complete
  return getPhaseProgress(phaseId - 1) >= 10;
};

const switchPhase = (id: number) => {
  if (isPhaseUnlocked(id)) {
    activePhaseId.value = id;
  }
};

// ─── Current Mission ──────────────────────────────────────

const currentMissionIndex = computed(() => {
  if (!activePhaseData.value) return 0;
  for (let i = 0; i < missions.value.length; i++) {
    if (!isMissionCompleted(activePhaseId.value, missions.value[i].id)) {
      return i;
    }
  }
  return missions.value.length; // All done
});

const phaseXpEarned = computed(() => {
  if (!activePhaseData.value) return 0;
  return missions.value
    .filter(m => isMissionCompleted(activePhaseId.value, m.id))
    .reduce((sum, m) => sum + m.xp, 0);
});

// ─── Streak: unique days with at least 1 mission ─────────

const streakDays = computed(() => {
  if (!userProgress.value.length) return 0;
  
  // Get unique dates (YYYY-MM-DD) from completed missions
  const uniqueDates = new Set(
    userProgress.value.map(p => {
      const d = new Date(p.completed_at);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    })
  );
  
  // Count consecutive days ending today (or most recent)
  const sorted = Array.from(uniqueDates).sort().reverse();
  if (sorted.length === 0) return 0;
  
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  // Check if the most recent date is today or yesterday
  const mostRecent = sorted[0];
  const mostRecentDate = new Date(mostRecent + 'T00:00:00');
  const diffDays = Math.floor((today.getTime() - mostRecentDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays > 1) return 0; // Streak broken
  
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const curr = new Date(sorted[i] + 'T00:00:00');
    const prev = new Date(sorted[i - 1] + 'T00:00:00');
    const diff = Math.floor((prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
});

// ─── SVG Path ─────────────────────────────────────────────

const nodePosition = (index: number): 'left' | 'center' | 'right' => {
  const pattern: ('center' | 'right' | 'right' | 'center' | 'left' | 'left')[] = ['center', 'right', 'right', 'center', 'left', 'left'];
  return pattern[index % pattern.length];
};

const pathHeight = computed(() => missions.value.length * 120 + 40);

const getNodeY = (index: number) => 40 + index * 120;
const getNodeX = (index: number) => {
  const pos = nodePosition(index);
  if (pos === 'center') return 200;
  if (pos === 'right') return 310;
  return 90;
};

const pathD = computed(() => {
  if (missions.value.length === 0) return '';
  let d = `M${getNodeX(0)} ${getNodeY(0)}`;
  for (let i = 1; i < missions.value.length; i++) {
    const x = getNodeX(i);
    const y = getNodeY(i);
    const prevX = getNodeX(i - 1);
    const prevY = getNodeY(i - 1);
    const midY = (prevY + y) / 2;
    d += ` C${prevX} ${midY} ${x} ${midY} ${x} ${y}`;
  }
  return d;
});

const progressPathD = computed(() => {
  const completed = currentMissionIndex.value;
  if (completed <= 0) return '';
  
  let d = `M${getNodeX(0)} ${getNodeY(0)}`;
  const limit = Math.min(completed, missions.value.length - 1);
  for (let i = 1; i <= limit; i++) {
    const x = getNodeX(i);
    const y = getNodeY(i);
    const prevX = getNodeX(i - 1);
    const prevY = getNodeY(i - 1);
    const midY = (prevY + y) / 2;
    d += ` C${prevX} ${midY} ${x} ${midY} ${x} ${y}`;
  }
  return d;
});

// ─── Node State ───────────────────────────────────────────

const isNodeUnlocked = (index: number) => {
  if (index === 0) return true;
  return isMissionCompleted(activePhaseId.value, missions.value[index - 1].id);
};

const isMissionCurrent = (index: number) => index === currentMissionIndex.value;

const nodeClasses = (mission: Mission, index: number) => {
  if (isMissionCompleted(activePhaseId.value, mission.id)) {
    return 'bg-success text-white border-4 border-white ring-4 ring-success/20';
  }
  if (isMissionCurrent(index)) {
    return 'bg-primary text-white border-4 border-white ring-4 ring-primary/20 shadow-glow';
  }
  return 'bg-gray-200 text-gray-400 border-4 border-gray-300';
};

// ─── Modal Actions ────────────────────────────────────────

const handleNodeClick = (mission: Mission, index: number) => {
  if (!isNodeUnlocked(index)) return;
  selectedMission.value = mission;
  // Reset quiz state
  quizSelectedAnswer.value = null;
  quizAnswered.value = false;
  quizCorrect.value = false;
};

const closeModal = () => {
  selectedMission.value = null;
  quizSelectedAnswer.value = null;
  quizAnswered.value = false;
  quizCorrect.value = false;
};

// ─── Quiz Logic ───────────────────────────────────────────

const selectQuizAnswer = (optIdx: number) => {
  if (quizAnswered.value) return;
  quizSelectedAnswer.value = optIdx;
  quizAnswered.value = true;
  quizCorrect.value = optIdx === selectedMission.value?.correctAnswer;
};

const retryQuiz = () => {
  quizSelectedAnswer.value = null;
  quizAnswered.value = false;
  quizCorrect.value = false;
};

const getQuizOptionClass = (optIdx: number) => {
  if (!quizAnswered.value) {
    return 'border-gray-200 bg-white hover:border-primary/40 hover:bg-primary/5';
  }
  // After answering
  if (optIdx === selectedMission.value?.correctAnswer) {
    return 'border-green-400 bg-green-50 text-green-800';
  }
  if (quizSelectedAnswer.value === optIdx) {
    return 'border-red-400 bg-red-50 text-red-700';
  }
  return 'border-gray-200 bg-gray-50 opacity-50';
};

const getQuizBulletClass = (optIdx: number) => {
  if (!quizAnswered.value) {
    return 'bg-gray-100 text-gray-500';
  }
  if (optIdx === selectedMission.value?.correctAnswer) {
    return 'bg-green-500 text-white';
  }
  if (quizSelectedAnswer.value === optIdx) {
    return 'bg-red-500 text-white';
  }
  return 'bg-gray-100 text-gray-400';
};

// ─── Complete Mission ─────────────────────────────────────

const handleComplete = async () => {
  if (!selectedMission.value) return;
  
  isCompleting.value = true;
  const success = await completeMission(
    activePhaseId.value,
    selectedMission.value.id,
    selectedMission.value.xp
  );
  isCompleting.value = false;

  if (success) {
    const title = selectedMission.value.title;
    const xp = selectedMission.value.xp;
    closeModal();

    celebrationMsg.value = `${title} completa! +${xp} XP`;
    showCelebration.value = true;
    setTimeout(() => { showCelebration.value = false; }, 3000);

    // Phase complete?
    if (getPhaseProgress(activePhaseId.value) >= 10) {
      setTimeout(() => {
        celebrationMsg.value = `🏅 Fase ${activePhaseId.value} completa! Próxima fase desbloqueada!`;
        showCelebration.value = true;
        setTimeout(() => { showCelebration.value = false; }, 3500);
      }, 3500);
    }
  }
};

// ─── Helpers ──────────────────────────────────────────────

const missionTypeLabel = (type: string) => {
  const labels: Record<string, string> = { teoria: 'Teoria', pratica: 'Prática', desafio_final: 'Desafio' };
  return labels[type] || type;
};

const missionTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    teoria: 'bg-blue-500 text-white',
    pratica: 'bg-primary/10 text-primary',
    desafio_final: 'bg-amber-500 text-white',
  };
  return colors[type] || 'bg-gray-500 text-white';
};

const missionTypeBadge = (type: string) => {
  const badges: Record<string, string> = {
    teoria: 'bg-blue-100 text-blue-600',
    pratica: 'bg-orange-100 text-orange-600',
    desafio_final: 'bg-amber-100 text-amber-700',
  };
  return badges[type] || 'bg-gray-100 text-gray-700';
};

// ─── Init ─────────────────────────────────────────────────

onMounted(async () => {
  await fetchProgress();
  
  // Auto-select first incomplete phase
  for (const phase of PHASES_DATA) {
    if (getPhaseProgress(phase.id) < 10) {
      activePhaseId.value = phase.id;
      break;
    }
  }

  // Update user streak from actual progress data
  user.value.streak = streakDays.value;
});
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.toast-enter-active, .toast-leave-active { transition: all 0.25s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 10px); }
</style>
