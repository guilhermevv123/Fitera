<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const route = useRoute();
const router = useRouter();

// Watch for auth changes and redirect accordingly
watch(user, (newUser) => {
  const publicPaths = ['/auth', '/confirm'];
  
  if (!newUser && !publicPaths.includes(route.path)) {
    router.push('/auth');
  } else if (newUser && (route.path === '/auth' || route.path === '/')) {
    router.push('/feed');
  }
}, { immediate: true });
</script>
