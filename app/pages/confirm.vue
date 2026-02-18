<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const cookieName = useRuntimeConfig().public.supabase.cookieName
const redirectPath = useCookie(`${cookieName}-redirect-path`).value || '/feed'

// O app.vue lida com a lógica global de redirecionamento baseada no estado do usuário.
// Esta página serve apenas como o ponto de entrada para o callback do Supabase.
</script>

<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center p-6 text-center">
    <div class="flex flex-col items-center gap-4">
      <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p class="text-white font-medium">Confirmando sua sessão...</p>
    </div>
  </div>
</template>
