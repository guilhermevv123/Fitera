<template>
  <div class="min-h-screen bg-gray-900 relative overflow-hidden flex flex-col justify-center items-center p-6">
    <!-- Background -->
    <div class="absolute inset-0 z-0">
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
      <div class="absolute -top-20 -right-20 w-64 h-64 bg-orange-600/15 rounded-full blur-[100px]"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 w-full max-w-sm">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-14 h-14 bg-gradient-to-br from-primary to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(255,106,0,0.4)]">
          <span class="material-icons-round text-3xl text-white">person_add</span>
        </div>
        <h1 class="text-3xl font-black text-white mb-2">Configure seu Perfil</h1>
        <p class="text-gray-400 text-sm">Escolha um nome, foto e cidade para a comunidade te conhecer.</p>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-3xl p-6 shadow-2xl space-y-6">
        <!-- Avatar Upload -->
        <div class="flex flex-col items-center">
          <div class="relative group cursor-pointer mb-2" @click="triggerFileInput">
            <div class="w-28 h-28 rounded-full border-4 border-gray-100 overflow-hidden bg-gray-100 shadow-lg transition-transform group-hover:scale-105">
              <img 
                v-if="avatarPreview" 
                :src="avatarPreview" 
                alt="Avatar" 
                class="w-full h-full object-cover" 
              />
              <div v-else class="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <span class="material-icons-round text-4xl">photo_camera</span>
                <span class="text-[10px] font-bold mt-1">TOQUE AQUI</span>
              </div>
            </div>
            <div class="absolute bottom-0 right-0 w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white shadow-lg border-3 border-white group-hover:scale-110 transition-transform">
              <span class="material-icons-round text-lg">edit</span>
            </div>
          </div>
          <input 
            ref="fileInput" 
            type="file" 
            accept="image/*" 
            class="hidden" 
            @change="handleAvatarSelect" 
          />
          <p class="text-xs text-gray-400 font-medium">Adicione uma foto de perfil</p>
        </div>

        <!-- Name Input -->
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Seu Nome *</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span class="material-icons-round text-gray-300">person</span>
            </div>
            <input 
              v-model="userName" 
              type="text"
              placeholder="Como quer ser chamado?" 
              class="w-full bg-gray-50 text-gray-900 pl-12 pr-4 py-4 rounded-xl border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
              required
            />
          </div>
        </div>

        <!-- City Input -->
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sua Cidade *</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span class="material-icons-round text-gray-300">location_on</span>
            </div>
            <input 
              v-model="userCity" 
              type="text" 
              placeholder="Ex: São Paulo, Rio de Janeiro..." 
              class="w-full bg-gray-50 text-gray-900 pl-12 pr-4 py-4 rounded-xl border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
              required
            />
          </div>
          <p class="text-[10px] text-gray-400 mt-1.5 ml-1">Usada para recomendar pessoas próximas a você.</p>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-sm font-medium">
          <span class="material-icons-round text-lg">error_outline</span>
          {{ errorMessage }}
        </div>

        <!-- Submit Button -->
        <button 
          @click="saveProfile"
          :disabled="isSaving || !userName.trim() || !userCity.trim()"
          class="w-full bg-gradient-to-r from-primary to-orange-600 hover:to-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div v-if="isSaving" class="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
          <template v-else>
            Começar a Jornada
            <span class="material-icons-round">rocket_launch</span>
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const router = useRouter();
const { user, updateProfile, uploadAvatar } = useApp();
const supabase = useSupabaseClient();
const supabaseUser = useSupabaseUser();

// Ensure user.id is synced from Supabase auth
if (supabaseUser.value) {
  user.value.id = supabaseUser.value.id;
}

const userName = ref(user.value.name || '');
const userCity = ref(user.value.city || '');
const avatarFile = ref<File | null>(null);
const avatarPreview = ref<string | null>(user.value.avatar || null);
const isSaving = ref(false);
const errorMessage = ref('');
const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleAvatarSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    avatarFile.value = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(input.files[0]);
  }
};

const saveProfile = async () => {
  if (!userName.value.trim() || !userCity.value.trim()) {
    errorMessage.value = 'Nome e cidade são obrigatórios.';
    return;
  }

  isSaving.value = true;
  errorMessage.value = '';

  try {
    let avatarUrl = user.value.avatar;

    // Upload avatar if selected
    if (avatarFile.value) {
      const uploaded = await uploadAvatar(avatarFile.value);
      if (uploaded) {
        avatarUrl = uploaded;
      }
    }

    // If no avatar was uploaded and no existing one, generate a default
    if (!avatarUrl || avatarUrl.includes('picsum') || avatarUrl.includes('placeholder')) {
      avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName.value}`;
    }

    // Check if profile exists, if not create one
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.value.id)
      .single();

    if (existingProfile) {
      await updateProfile({
        full_name: userName.value.trim(),
        city: userCity.value.trim(),
        avatar_url: avatarUrl,
      });
    } else {
      // Create profile
      await supabase
        .from('profiles')
        .insert({
          id: user.value.id,
          full_name: userName.value.trim(),
          city: userCity.value.trim(),
          avatar_url: avatarUrl,
        } as any);
    }

    // Update local user state
    user.value = {
      ...user.value,
      name: userName.value.trim(),
      city: userCity.value.trim(),
      avatar: avatarUrl,
    };

    // Navigate to survey or feed
    router.push('/survey');
  } catch (err: any) {
    errorMessage.value = err.message || 'Erro ao salvar perfil.';
  } finally {
    isSaving.value = false;
  }
};

definePageMeta({
  layout: false
});
</script>
