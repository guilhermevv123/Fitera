<template>
  <div class="bg-surface min-h-screen pb-24 flex flex-col">
    <!-- Header -->
    <div class="pt-8 px-6 flex justify-between items-center">
      <button class="p-2 rounded-full hover:bg-black/5 transition-colors">
        <span class="material-icons-round text-2xl text-gray-400">settings</span>
      </button>
      <div class="text-sm font-bold tracking-wide uppercase text-gray-400">Perfil</div>
      <button class="p-2 rounded-full hover:bg-black/5 transition-colors">
        <span class="material-icons-round text-2xl text-gray-400">share</span>
      </button>
    </div>

    <!-- Hero -->
    <div class="flex flex-col items-center mt-6 px-6">
      <div class="relative group">
        <div class="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-110 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
        <div class="w-28 h-28 rounded-full border-4 border-white shadow-xl relative overflow-hidden z-10">
          <img :src="user.avatar" alt="Profile" class="w-full h-full object-cover" />
        </div>
        <div class="absolute bottom-0 right-0 z-20 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white flex items-center gap-1 shadow-sm">
          <span class="material-icons-round text-[14px]">edit</span>
        </div>
      </div>
      <h1 class="text-2xl font-bold mt-4 text-gray-900">{{ user.name }}</h1>
      <p class="text-gray-500 text-sm font-medium">Entrou em {{ user.joinedDate }}</p>

      <div class="flex items-center gap-3 mt-4 w-full justify-center">
        <div class="bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-white/50">
          <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center text-[10px] text-white font-bold">L</div>
          <span class="text-sm font-bold text-gray-600">Nível {{ user.level }} • {{ user.levelName }}</span>
        </div>
        <div class="bg-primary/10 px-4 py-2 rounded-full flex items-center gap-2 border border-primary/20">
          <span class="material-icons-round text-primary text-sm">bolt</span>
          <span class="text-sm font-bold text-primary">{{ user.xp.toLocaleString() }} XP</span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="mt-8 px-5 space-y-6 flex-1">
      <!-- Streak Card -->
      <div class="bg-white rounded-2xl p-5 shadow-soft border border-gray-100 relative overflow-hidden">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
        <div class="flex justify-between items-start mb-4 relative z-10">
          <div>
            <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span class="text-3xl">🔥</span> {{ user.streak }} Dias de Ofensiva
            </h2>
            <p class="text-xs text-gray-500 mt-1 font-medium">Você está pegando fogo! Continue assim!</p>
          </div>
          <button class="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-primary/30 hover:bg-primary/90 transition">
            Congelar
          </button>
        </div>
        <!-- Calendar Days (Static Mock) -->
        <div class="flex justify-between items-center pt-2">
          <div v-for="d in ['Seg', 'Ter', 'Qua']" :key="d" class="flex flex-col items-center gap-2">
            <span class="text-[10px] font-bold text-gray-400 uppercase">{{ d }}</span>
            <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
              <span class="material-icons-round text-sm">check</span>
            </div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <span class="text-[10px] font-bold text-primary uppercase">Qui</span>
            <div class="w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center relative shadow-lg">
              <div class="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75"></div>
              <span class="material-icons-round text-primary">local_fire_department</span>
            </div>
          </div>
          <div v-for="d in ['Sex', 'Sáb', 'Dom']" :key="d" class="flex flex-col items-center gap-2 opacity-50">
            <span class="text-[10px] font-bold text-gray-400 uppercase">{{ d }}</span>
            <div class="w-8 h-8 rounded-full bg-gray-100 border border-gray-200"></div>
          </div>
        </div>
      </div>

      <!-- Achievements -->
      <div>
        <div class="flex justify-between items-end mb-4 px-1">
          <h3 class="text-lg font-bold text-gray-900">Conquistas</h3>
          <button class="text-xs font-bold text-primary hover:text-primary/80">Ver Tudo</button>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div v-for="badge in user.badges" :key="badge.id" class="bg-white p-3 rounded-2xl flex flex-col items-center text-center shadow-sm border border-gray-100 aspect-square justify-center">
            <div class="w-12 h-12 rounded-full flex items-center justify-center mb-2 text-2xl" :class="badge.color.split(' ')[0]">
              {{ badge.icon }}
            </div>
            <span class="text-xs font-bold text-gray-800 leading-tight">{{ badge.name }}</span>
          </div>
          <div class="bg-gray-50 p-3 rounded-2xl flex flex-col items-center text-center border border-dashed border-gray-300 aspect-square justify-center opacity-60">
            <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2 text-gray-400">
              <span class="material-icons-round text-xl">lock</span>
            </div>
            <span class="text-xs font-medium text-gray-500 leading-tight">Peso Pesado</span>
          </div>
        </div>
      </div>

      <!-- History -->
      <div class="pb-6">
        <h3 class="text-lg font-bold text-gray-900 mb-4 px-1">Atividade Recente</h3>
        <div class="space-y-3">
          <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center shrink-0">
              <span class="material-icons-round">self_improvement</span>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-sm text-gray-900">Yoga Matinal</h4>
              <p class="text-xs text-gray-500">Hoje, 07:30</p>
            </div>
            <div class="text-right">
              <span class="block text-primary font-bold text-sm">+50 XP</span>
              <span class="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Mindfulness</span>
            </div>
          </div>
          <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
              <span class="material-icons-round">directions_run</span>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-sm text-gray-900">Corrida 5K</h4>
              <p class="text-xs text-gray-500">Ontem, 18:15</p>
            </div>
            <div class="text-right">
              <span class="block text-primary font-bold text-sm">+120 XP</span>
              <span class="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Cardio</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Logout Button -->
      <div class="px-1">
        <button 
          @click="handleSignOut"
          class="w-full py-4 rounded-2xl bg-red-50 text-red-600 font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors border border-red-100"
        >
          <span class="material-icons-round">logout</span>
          Sair da Conta
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useApp();
const supabase = useSupabaseClient();
const router = useRouter();

const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    router.push('/auth');
  }
};
</script>
