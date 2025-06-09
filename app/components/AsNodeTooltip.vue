<template>
  <UPopover mode="hover" arrow>
    <div>AS{{ asn }}</div>
    <template #content>
      <UCard variant="subtle">
        <template #header>
          <div class="flex">
            <UIcon v-if="countryIso" :name="`i-flag-${countryIso}-4x3`" class="me-3" />
            <div>{{ displayName }}</div>
          </div>
        </template>
        <div class="grid grid-cols-2 gap-2 max-w-2xs">
          <template v-for="field in visibleFields" :key="field.label">
            <div class="font-medium">{{ field.label }}</div>
            <div class="text-muted">{{ field.value }}</div>
          </template>
        </div>
      </UCard>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import type { ASNInfoEntry } from '~~/shared/types/bgpresult';

const { asn, asInfo } = defineProps<{ asn: number, asInfo: ASNInfoEntry }>()

const displayName = computed(() =>
  asInfo.organization?.orgName || asInfo.asnName || `AS${asn}`
)

const countryIso = computed(() =>
  asInfo.country?.iso?.toLowerCase()
)

const visibleFields = computed(() => {
  const fields = [
    { label: 'AS Name', value: asInfo.asnName },
    { label: 'Country', value: asInfo.country?.name },
    { label: 'AS Rank', value: asInfo.rank ? `#${asInfo.rank}` : null }
  ]

  return fields.filter(field => field.value)
})

</script>