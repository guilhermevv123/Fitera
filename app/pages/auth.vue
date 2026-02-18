<template>
  <div class="min-h-screen bg-gray-900 relative overflow-hidden flex flex-col justify-end">
    <!-- Dynamic Background -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-gray-900 transition-opacity duration-1000 z-10" :class="animateEnter ? 'opacity-40' : 'opacity-100'"></div>
      <img 
        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop" 
        alt="Fitness Background" 
        class="w-full h-full object-cover transition-transform duration-[20s] ease-linear"
        :class="animateEnter ? 'scale-110' : 'scale-100'"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent z-0"></div>
    </div>

    <!-- Brand Section (Top) -->
    <div class="absolute top-0 left-0 right-0 p-8 pt-16 flex flex-col items-center z-10 transition-all duration-1000 transform" :class="animateEnter ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'">
       <div class="w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,106,0,0.5)] mb-4 animate-bounce-slow">
          <span class="material-icons-round text-4xl text-white">bolt</span>
       </div>
       <h1 class="text-4xl font-extrabold text-white tracking-tight mb-1">FITERA</h1>
       <p class="text-gray-300 font-medium tracking-wide text-sm">Evolua seu corpo. Ganhe o jogo.</p>
    </div>

    <!-- Auth Card (Bottom Sheet) -->
    <div class="relative z-20 bg-white rounded-t-[2.5rem] p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] transition-all duration-700 delay-300 transform" :class="animateEnter ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'">
      
      <!-- Decorative Pull Bar -->
      <div class="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8"></div>

      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ mode === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta' }}
        </h2>
        <p class="text-gray-500 text-sm">
          {{ mode === 'login' ? 'Continue sua jornada épica.' : 'Comece sua transformação hoje.' }}
        </p>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-sm font-medium animate-shake">
         <span class="material-icons-round text-lg">error_outline</span>
         {{ errorMessage }}
      </div>

      <form @submit.prevent="handleAuth" class="space-y-4">
         <!-- Name Input (Signup Only) -->
         <div class="overflow-hidden transition-all duration-500 ease-in-out" :class="mode === 'signup' ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'">
            <div class="relative group">
               <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span class="material-icons-round text-gray-400 group-focus-within:text-primary transition-colors">person</span>
               </div>
               <input 
                  type="text" 
                  placeholder="Seu Nome" 
                  class="w-full bg-gray-50 text-gray-900 pl-12 pr-4 py-4 rounded-xl border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                  :required="mode === 'signup'"
                  v-model="name"
               />
            </div>
         </div>

         <!-- Email Input -->
         <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
               <span class="material-icons-round text-gray-400 group-focus-within:text-primary transition-colors">email</span>
            </div>
            <input 
               type="email" 
               placeholder="Seu Email" 
               class="w-full bg-gray-50 text-gray-900 pl-12 pr-4 py-4 rounded-xl border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
               required
               v-model="email"
            />
         </div>

         <!-- Phone Input (Signup Only) -->
         <div class="overflow-hidden transition-all duration-500 ease-in-out" :class="mode === 'signup' ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'">
            <div class="relative group">
               <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span class="material-icons-round text-gray-400 group-focus-within:text-primary transition-colors">smartphone</span>
               </div>
               <input 
                  type="tel" 
                  placeholder="Seu WhatsApp (DD+Número)" 
                  class="w-full bg-gray-50 text-gray-900 pl-12 pr-4 py-4 rounded-xl border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                  :required="mode === 'signup'"
                  v-model="phone"
               />
            </div>
         </div>

         <!-- Password Input -->
         <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
               <span class="material-icons-round text-gray-400 group-focus-within:text-primary transition-colors">lock</span>
            </div>
            <input 
               type="password" 
               placeholder="Sua Senha" 
               class="w-full bg-gray-50 text-gray-900 pl-12 pr-4 py-4 rounded-xl border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
               required
               v-model="password"
            />
         </div>

         <!-- Action Button -->
         <button 
           type="submit" 
           :disabled="isLoading"
           class="w-full bg-gradient-to-r from-primary to-orange-600 hover:to-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 relative overflow-hidden"
         >
            <div v-if="isLoading" class="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            <template v-else>
               {{ mode === 'login' ? 'Entrar' : 'Cadastrar Grátis' }}
               <span class="material-icons-round">arrow_forward</span>
            </template>
         </button>
      </form>

      <!-- Social Login -->
      <div class="mt-8">
         <div class="relative flex items-center justify-center mb-6">
            <div class="absolute inset-x-0 h-px bg-gray-100"></div>
            <span class="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Ou entre com</span>
         </div>
         
          <div class="grid grid-cols-2 gap-4">
            <button 
              @click="loginWithSocial('google')"
              type="button"
              class="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
            >
               <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="w-5 h-5" />
               <span class="font-bold text-gray-700 text-sm">Google</span>
            </button>
            <button 
              @click="loginWithSocial('apple')"
              type="button"
              class="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
            >
               <img src="https://www.svgrepo.com/show/475647/apple-color.svg" alt="Apple" class="w-5 h-5" />
               <span class="font-bold text-gray-700 text-sm">Apple</span>
            </button>
          </div>
      </div>

      <!-- Toggle Mode -->
      <div class="mt-8 text-center">
         <p class="text-gray-500 text-sm">
            {{ mode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?' }} 
            <button 
               @click="toggleMode"
               class="text-primary font-bold ml-1 hover:underline focus:outline-none"
            >
               {{ mode === 'login' ? 'Cadastre-se' : 'Fazer Login' }}
            </button>
         </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const { user } = useApp();
const router = useRouter();
const supabase = useSupabaseClient();

const animateEnter = ref(false);
const mode = ref<'login' | 'signup'>('login');
const errorMessage = ref('');
const isLoading = ref(false);

const email = ref('');
const password = ref('');
const name = ref('');
const phone = ref('');

onMounted(() => {
  setTimeout(() => {
    animateEnter.value = true;
  }, 100);
});

const handleAuth = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    if (mode.value === 'signup') {
      const { data, error } = await supabase.auth.signUp({
        email: email.value.trim(),
        password: password.value,
        options: {
          data: {
            full_name: name.value.trim(),
            phone: phone.value.trim(),
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.value || email.value}`
          }
        }
      });
      if (error) throw error;
      
      if (data.user) {
        // If there's no session, it usually means email confirmation is needed
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          errorMessage.value = 'Conta criada! Verifique seu e-mail para confirmar o cadastro e poder entrar.';
          return;
        }

        user.value = {
          ...user.value,
          id: data.user.id,
          name: name.value || data.user.email?.split('@')[0] || '',
          phone: phone.value || '',
        };
        router.push('/setup-profile'); // Redirect to profile setup first
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value.trim(),
        password: password.value,
      });
      if (error) throw error;
      if (data.user) {
         router.push('/feed');
      }
    }
  } catch (err: any) {
    if (err.message?.includes('User already registered')) {
      errorMessage.value = 'Este e-mail já está cadastrado. Tente fazer login.';
    } else {
      errorMessage.value = err.message || 'Ocorreu um erro na autenticação';
    }
  } finally {
    isLoading.value = false;
  }
};

const loginWithSocial = async (provider: 'google' | 'apple') => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/confirm`
      }
    });
    if (error) throw error;
  } catch (err: any) {
    errorMessage.value = err.message || `Erro ao entrar com ${provider}`;
    isLoading.value = false;
  }
};

const toggleMode = () => {
  const newMode = mode.value === 'login' ? 'signup' : 'login';
  mode.value = newMode;
  errorMessage.value = '';
  
  name.value = '';
  email.value = '';
  password.value = '';
  phone.value = '';
};
</script>

<style scoped>
.animate-bounce-slow {
  animation: bounce 3s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
