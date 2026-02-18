<template>
  <div 
    class="flex flex-col items-center relative z-10 mb-8"
    :class="{
      'self-start ml-8': challenge.position === 'left',
      'self-center': challenge.position === 'center',
      'self-end mr-8': challenge.position === 'right'
    }"
    @click="handleClick"
  >
    <!-- Node Circle -->
    <div 
      class="w-20 h-20 rounded-full flex items-center justify-center relative transition-all duration-300 transform"
      :class="[
        statusClasses[challenge.state],
        challenge.state !== 'locked' ? 'cursor-pointer active:scale-95 hover:scale-105 shadow-xl' : 'opacity-80'
      ]"
    >
      <!-- Ripple effect for current node -->
      <div v-if="challenge.state === 'current'" class="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-20"></div>
      
      <!-- Icon -->
      <span class="material-icons-round text-3xl z-10">{{ challenge.icon }}</span>

      <!-- Stars (for completed) -->
      <div v-if="challenge.state === 'completed'" class="absolute -top-1 -right-1 bg-yellow-400 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm text-xs border-2 border-white">
        ★
      </div>
    </div>

    <!-- Label -->
    <div class="mt-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100/50 flex flex-col items-center">
      <span class="text-xs font-bold text-gray-800">{{ challenge.title }}</span>
      <div v-if="challenge.state !== 'locked'" class="flex items-center space-x-1 mt-0.5">
        <span class="text-[10px] text-primary font-bold">+{{ challenge.xp }} XP</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Challenge } from '~/types';

const props = defineProps<{
  challenge: Challenge;
}>();

const emit = defineEmits<{
  (e: 'click', challenge: Challenge): void
}>();

const statusClasses = {
  locked: 'bg-gray-200 text-gray-400 border-4 border-gray-300',
  current: 'bg-primary text-white border-4 border-white ring-4 ring-primary/20 shadow-glow',
  completed: 'bg-success text-white border-4 border-white ring-4 ring-success/20'
};

const handleClick = () => {
  if (props.challenge.state !== 'locked') {
    emit('click', props.challenge);
  }
};
</script>
