<template>
  <UPopover>
    <UButton :label="`AS${ipinfo.asn}`" color="neutral" variant="link" icon="i-tabler-info-circle" />
    <template #content>
      <UCard variant="subtle">
        <div class="grid grid-cols-2 gap-2 max-w-2xs">
          <template v-for="field in visibleFields" :key="field.label">
            <div class="font-medium">{{ field.label }}</div>
            <div class="text-muted">
              <UIcon v-if="field.icon" :name="field.icon" class="me-1" />
              {{ field.value }}
            </div>
          </template>
        </div>
      </UCard>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import type { IPAddressInfo } from '~~/shared/types/tracerouteresult'

const { ipinfo } = defineProps<{ ipinfo: IPAddressInfo }>()

const visibleFields = computed(() => {
  const fields = [
    {
      label: 'AS Name',
      value: ipinfo.asrank?.asnName,
    },
    {
      label: 'Organisation',
      value: ipinfo.asrank?.organization?.orgName,
    },
    {
      label: 'AS Country',
      value: ipinfo.asrank?.country?.name,
      icon: ipinfo.asrank?.country?.iso
        ? `i-flag-${ipinfo.asrank.country.iso.toLowerCase()}-4x3`
        : undefined,
    },
    {
      label: 'AS Rank',
      value: ipinfo.asrank?.rank ? `#${ipinfo.asrank.rank}` : undefined,
    },
    {
      label: 'BGP Prefix',
      value: ipinfo.bgp_prefix,
    },
    {
      label: 'Registry',
      value: ipinfo.registry?.toUpperCase(),
    },
  ]

  return fields.filter(field => field.value)
})
</script>
