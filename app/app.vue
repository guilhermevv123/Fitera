<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { user: appUser, fetchUserProfile } = useApp();
const supabaseUser = useSupabaseUser();
const route = useRoute();
const router = useRouter();

// Watch for auth changes and sync with useApp state
watch(supabaseUser, async (newUser) => {
  const publicPaths = ['/auth', '/confirm'];
  const onboardingPaths = ['/setup-profile', '/survey'];
  const isPublicPath = publicPaths.includes(route.path) || route.path === '/';
  const isOnboardingPath = onboardingPaths.includes(route.path);
  
  if (newUser) {
    // Sync Supabase user to App state
    const profile = await fetchUserProfile(newUser.id);
    
    // Redirect logic: if profile is incomplete, force setup
    const isProfileComplete = profile && profile.full_name && profile.city;
    
    if (!isProfileComplete && !isOnboardingPath && route.path !== '/auth') {
      router.push('/setup-profile');
    } else if (isProfileComplete && isPublicPath) {
      router.push('/feed');
    }
    // If on onboarding path, do NOT redirect - let the user complete the flow
  } else if (!isPublicPath) {
    // Clear user state if logged out
    appUser.value.id = '';
    router.push('/auth');
  }
}, { immediate: true });
</script>
