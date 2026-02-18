<template>
  <div class="flex flex-col min-h-screen bg-surface pb-24 relative">
    <!-- Header Clean & Sticky -->
    <header class="px-6 pt-6 pb-4 flex justify-between items-center bg-surface/95 backdrop-blur-md sticky top-0 z-30 border-b border-gray-200/50">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">Treinos</h1>
        <p class="text-xs text-gray-500 font-medium">Hoje, 24 Jan</p>
      </div>
      <div class="flex gap-3">
        <button class="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
          <span class="material-icons-round">calendar_today</span>
        </button>
      </div>
    </header>
    
    <div class="px-5 space-y-6 flex-1 overflow-y-auto no-scrollbar pt-2">
      
      <!-- 1. SECTION: BODY STATUS -->
      <section class="bg-white rounded-3xl p-6 shadow-card border border-primary/5 relative overflow-hidden">
         <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
         
         <div class="flex justify-between items-start relative z-10">
            <div class="space-y-4 max-w-[60%]">
               <div>
                  <div class="flex items-center gap-2 mb-1">
                      <span class="material-icons-round text-green-500 text-lg">battery_charging_full</span>
                      <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Recuperação</span>
                  </div>
                  <p class="text-3xl font-extrabold text-gray-900">88%</p>
                  <p class="text-xs text-gray-500 font-medium mt-1">Você está pronto para um treino intenso hoje.</p>
               </div>
               
               <div class="flex gap-4 pt-2">
                  <div>
                      <p class="text-[10px] text-gray-400 font-bold uppercase">Fadiga</p>
                      <p class="text-sm font-bold text-gray-800">12%</p>
                  </div>
                  <div>
                      <p class="text-[10px] text-gray-400 font-bold uppercase">Foco Ideal</p>
                      <p class="text-sm font-bold text-primary">Pernas</p>
                  </div>
               </div>
            </div>

            <!-- Muscle Map Visual -->
            <div class="relative h-32 w-24 -mr-2">
               <svg viewBox="0 0 100 200" class="h-full w-full drop-shadow-lg">
                  <path d="M50,10 C40,10 35,15 35,25 C35,30 30,35 20,40 C15,45 15,60 20,65 L25,90 C25,95 20,100 20,130 L25,180 C25,190 35,190 35,180 L35,140 L45,140 L45,180 C45,190 55,190 55,180 L60,130 C60,100 55,95 55,90 L60,65 C65,60 65,45 60,40 C50,35 45,30 45,25 C45,15 40,10 30,10" fill="#F3F4F6" stroke="#E5E7EB" stroke-width="2" />
                  <path d="M25,40 L55,40 L50,65 L30,65 Z" fill="#BBF7D0" stroke="#86EFAC" opacity="1" /> <!-- Chest -->
                  <path d="M25,90 C25,95 20,100 20,130 L25,160 L35,130 L35,100 Z" fill="#FED7AA" stroke="#FDBA74" />
                  <path d="M55,90 C55,95 60,100 60,130 L55,160 L45,130 L45,100 Z" fill="#FED7AA" stroke="#FDBA74" />
               </svg>
               <div class="absolute bottom-0 right-0 bg-white shadow-sm border border-gray-100 text-[10px] font-bold px-2 py-0.5 rounded-full text-orange-500 whitespace-nowrap">
                  Descansar
               </div>
            </div>
         </div>
      </section>

      <!-- 2. SECTION: QUICK ACTIONS -->
      <section class="grid grid-cols-2 gap-3">
           <NuxtLink 
             to="/workouts/ai-generator"
             class="bg-gray-900 text-white rounded-2xl p-4 relative overflow-hidden group shadow-lg shadow-gray-200"
           >
              <div class="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                 <span class="material-icons-round text-5xl">smart_toy</span>
              </div>
              <div class="relative z-10 flex flex-col items-start h-full justify-between">
                 <div class="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-sm mb-2">
                    <span class="material-icons-round text-primary text-sm">auto_awesome</span>
                 </div>
                 <div>
                     <span class="text-[10px] font-bold text-gray-400 uppercase">FitAI</span>
                     <h3 class="font-bold text-lg leading-tight">Gerar Treino</h3>
                 </div>
              </div>
           </NuxtLink>

           <NuxtLink 
             to="/workouts/running"
             class="bg-blue-600 text-white rounded-2xl p-4 relative overflow-hidden group shadow-lg shadow-blue-100"
           >
              <div class="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                 <span class="material-icons-round text-5xl">directions_run</span>
              </div>
              <div class="relative z-10 flex flex-col items-start h-full justify-between">
                 <div class="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-sm mb-2">
                    <span class="material-icons-round text-white text-sm">map</span>
                 </div>
                 <div>
                     <span class="text-[10px] font-bold text-blue-200 uppercase">GPS</span>
                     <h3 class="font-bold text-lg leading-tight">Corrida</h3>
                 </div>
              </div>
           </NuxtLink>
      </section>

      <!-- 3. SECTION: MY ROUTINES -->
      <section>
          <div class="flex justify-between items-end mb-4 px-1">
             <h2 class="text-lg font-bold text-gray-900">Minhas Rotinas</h2>
             <NuxtLink 
               to="/workouts/new"
               class="text-primary text-xs font-bold flex items-center gap-1 hover:bg-primary/5 px-2 py-1 rounded-lg transition-colors"
             >
               <span class="material-icons-round text-sm">add</span> Nova
             </NuxtLink>
          </div>

          <div class="space-y-3">
              <div v-for="workout in workouts" :key="workout.id" class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer">
                  <div class="flex items-center gap-4">
                      <div class="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">
                          <span class="material-icons-round text-2xl">fitness_center</span>
                      </div>
                      <div>
                          <h3 class="font-bold text-gray-900">{{ workout.name }}</h3>
                          <p class="text-xs text-gray-500 font-medium">{{ workout.exercises.length }} Exercícios • Força</p>
                      </div>
                  </div>
                  <button class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all">
                      <span class="material-icons-round text-lg">play_arrow</span>
                  </button>
              </div>
          </div>
      </section>

      <!-- 4. SECTION: HISTORY TEASER -->
      <section class="pb-6">
          <h2 class="text-lg font-bold text-gray-900 mb-4 px-1">Última Atividade</h2>
          <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 opacity-80">
                <div class="flex justify-between items-start">
                   <div class="flex gap-3">
                      <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                         <span class="material-icons-round text-xl">directions_run</span>
                      </div>
                      <div>
                         <h4 class="font-bold text-gray-900 text-sm">Corrida Matinal</h4>
                         <p class="text-xs text-gray-400">Ontem • 5.34 km</p>
                      </div>
                   </div>
                   <span class="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">424 Cal</span>
                </div>
          </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { workouts } = useApp();
</script>
