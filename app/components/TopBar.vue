<template>
  <header class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 pt-6 pb-2 sticky top-0 z-40 border-b border-gray-100">
    <div class="flex justify-between items-center mb-3">
      <!-- XP Progress -->
      <div class="flex-1 mr-6">
        <div class="flex justify-between items-end mb-1">
          <span class="text-[10px] sm:text-xs font-bold text-primary tracking-wide uppercase">
            Nível {{ user.level }}: {{ user.levelName }}
          </span>
          <span class="text-[10px] sm:text-xs font-bold text-gray-400">
            {{ phaseMissions }}/10 missões • {{ user.xp }} XP
          </span>
        </div>
        <div class="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full bg-primary rounded-full transition-all duration-500 ease-out" 
            :style="{ width: `${progressPercent}%` }"
          ></div>
        </div>
      </div>

      <!-- Currency & Streak -->
      <div class="flex space-x-2 sm:space-x-3 items-center shrink-0">
        <div class="flex items-center space-x-1 bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm">
          <span class="material-icons-round text-primary text-base sm:text-lg">local_fire_department</span>
          <span class="font-bold text-xs sm:text-sm text-primary">{{ user.streak }}</span>
        </div>
        <div class="flex items-center space-x-1 bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm">
          <span class="material-icons-round text-blue-400 text-base sm:text-lg">diamond</span>
          <span class="font-bold text-xs sm:text-sm text-blue-500">{{ user.coins }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { user, userProgress, getPhaseProgress } = useApp();

// Phase missions = completed missions in the current phase (user.level)
const phaseMissions = computed(() => {
  return getPhaseProgress(user.value.level);
});

const progressPercent = computed(() => {
  return (phaseMissions.value / 10) * 100;
});
</script>
