<template>
  <div class="flex justify-center bg-gray-100 min-h-screen font-sans">
    <div class="w-full max-w-md bg-white shadow-2xl relative min-h-screen overflow-hidden">
      <!-- Main Content -->
      <slot />

      <!-- Bottom Navigation (conditionally rendered) -->
      <BottomNav v-if="showNav" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

// Hide BottomNav on specific full-screen flows
const hideNavPaths = [
  '/auth',
  '/workouts/new', 
  '/onboarding', 
  '/workouts/ai-generator',
  '/workouts/running'
];

const showNav = computed(() => !hideNavPaths.includes(route.path));
</script>
