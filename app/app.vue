<template>
  <UApp>
    <NavBar />
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

// Set SEO meta directly
useSeoMeta({
  title: config.public.siteTitle,
})
</script>