<template>
  <header class="bg-default/75 backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50 mb-3 md:mb-8">
    <UContainer class="w-full flex items-center justify-between">
      <!-- Logo and Title -->
      <div class="justify-self-start flex items-center">
        <UIcon name="i-tabler-spy" class="size-10 me-3" />
        <div class="text-lg font-medium">{{ title }}</div>
      </div>

      <!-- Navigation Menu for Desktop -->
      <div class="hidden md:flex">
        <UNavigationMenu :items="navLinks" class="w-full justify-center" />
      </div>

      <!-- Mobile Menu and Color Mode Button -->
      <div class="flex items-center justify-self-end gap-2">
        <ColorModeButton />
        <UDropdownMenu :items="navLinks" class="md:hidden">
          <UButton icon="i-tabler-menu" color="neutral" variant="ghost" class="block" />
        </UDropdownMenu>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// Access runtime config for the site title
const config = useRuntimeConfig();
const title = config.public.siteTitle;

// Static navigation links
const navLinks: NavigationMenuItem[] = [
  {
    label: 'Home',
    icon: 'i-tabler-home-filled',
    to: '/',
  },
  {
    label: 'Multi-Ping',
    icon: 'i-tabler-route-scan',
    to: '/multiping',
  },
  {
    label: 'Multi-BGP',
    icon: 'i-tabler-layout-list-filled',
    to: '/multibgp',
  }
];
</script>
