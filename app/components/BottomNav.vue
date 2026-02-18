<template>
  <nav class="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 z-50">
    <!-- Background Container -->
    <div class="bg-white border-t border-gray-100 pb-safe-bottom px-1 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] h-[72px] flex items-end justify-between relative">

      <!-- Left Side -->
      <div class="flex-1 h-full">
        <NuxtLink to="/feed" class="flex flex-col items-center justify-center w-full h-full pb-2 pt-3 transition-colors" :class="isActive('/feed') ? 'text-primary' : 'text-gray-400 hover:text-gray-600'">
          <span class="material-icons-round text-2xl mb-0.5 transition-transform" :class="isActive('/feed') ? 'scale-110' : ''">dynamic_feed</span>
          <span class="text-[10px] font-bold uppercase tracking-wider">Feed</span>
        </NuxtLink>
      </div>
      <div class="flex-1 h-full">
        <NuxtLink to="/workouts" class="flex flex-col items-center justify-center w-full h-full pb-2 pt-3 transition-colors" :class="isActive('/workouts') ? 'text-primary' : 'text-gray-400 hover:text-gray-600'">
          <span class="material-icons-round text-2xl mb-0.5 transition-transform" :class="isActive('/workouts') ? 'scale-110' : ''">fitness_center</span>
          <span class="text-[10px] font-bold uppercase tracking-wider">Treino</span>
        </NuxtLink>
      </div>

      <!-- Center "Desafios" Button (Highlighted) -->
      <div class="w-20 relative flex flex-col items-center justify-end h-full z-10">
         <div class="absolute -top-6">
           <NuxtLink
             to="/challenges"
             class="flex items-center justify-center w-16 h-16 rounded-full border-[5px] border-[#F7F7F8] shadow-glow transform transition-all active:scale-95 bg-primary text-white"
           >
              <span class="material-icons-round text-3xl">map</span>
           </NuxtLink>
         </div>
         <span class="text-[10px] font-bold uppercase tracking-wider mb-2" :class="isActive('/challenges') ? 'text-primary' : 'text-gray-400'">Desafios</span>
      </div>

      <!-- Right Side -->
      <div class="flex-1 h-full">
        <NuxtLink to="/store" class="flex flex-col items-center justify-center w-full h-full pb-2 pt-3 transition-colors" :class="isActive('/store') ? 'text-primary' : 'text-gray-400 hover:text-gray-600'">
          <span class="material-icons-round text-2xl mb-0.5 transition-transform" :class="isActive('/store') ? 'scale-110' : ''">storefront</span>
          <span class="text-[10px] font-bold uppercase tracking-wider">Loja</span>
        </NuxtLink>
      </div>
      <div class="flex-1 h-full">
        <NuxtLink to="/profile" class="flex flex-col items-center justify-center w-full h-full pb-2 pt-3 transition-colors" :class="isActive('/profile') ? 'text-primary' : 'text-gray-400 hover:text-gray-600'">
          <span class="material-icons-round text-2xl mb-0.5 transition-transform" :class="isActive('/profile') ? 'scale-110' : ''">person</span>
          <span class="text-[10px] font-bold uppercase tracking-wider">Perfil</span>
        </NuxtLink>
      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute();

const isActive = (path: string) => {
  return route.path.startsWith(path);
};
</script>
