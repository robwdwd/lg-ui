<template>
  <ClientOnly>
    <UDropdownMenu :items="items">
      <UButton :icon="isDark ? 'i-tabler-moon' : 'i-tabler-sun'" color="neutral" variant="ghost" />
    </UDropdownMenu>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const colorMode = useColorMode()

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Light',
    icon: 'i-tabler-sun',
    onSelect: () => (colorMode.preference = 'light')
  },
  {
    label: 'Dark',
    icon: 'i-tabler-moon',
    onSelect: () => (colorMode.preference = 'dark')
  },
  {
    label: 'System',
    icon: 'i-tabler-color-filter',
    onSelect: () => (colorMode.preference = 'system')
  }
])

const isDark = computed(() => colorMode.value === 'dark')
</script>