<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const cookieName = useRuntimeConfig().public.supabase.cookieName
const redirectPath = useCookie(`${cookieName}-redirect-path`).value || '/feed'

watch(user, async () => {
  if (user.value) {
    useCookie(`${cookieName}-redirect-path`).value = null

    // Check if profile is set up (has full_name and avatar)
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url, city')
        .eq('id', user.value.id)
        .single()

      // If profile doesn't exist or is incomplete, go to setup
      if (!profile || !profile.full_name || !profile.city) {
        return navigateTo('/setup-profile')
      }
    } catch (err) {
      // Profile table might not exist yet or user is new
      return navigateTo('/setup-profile')
    }

    return navigateTo(redirectPath)
  }
}, { immediate: true })
</script>

<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center p-6 text-center">
    <div class="flex flex-col items-center gap-4">
      <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p class="text-white font-medium">Confirmando sua sessão...</p>
    </div>
  </div>
</template>
