<template>
  <UPopover mode="hover" arrow>
    <div>AS{{ asn }}</div>
    <template #content>
      <UCard variant="subtle">
        <template #header>
          <div class="flex">
            <div v-if="asInfo.country?.iso" class="me-3">
              <UIcon :name="`i-flag-${asInfo.country?.iso?.toLowerCase()}-4x3`" />
            </div>
            <div>{{ displayName }}</div>
          </div>
        </template>
        <div class="grid grid-cols-2 gap-2 max-w-2xs">
          <div v-if="asInfo.asnName" class="font-medium">AS Name</div>
          <div v-if="asInfo.asnName" class="text-muted">{{ asInfo.asnName }}</div>

          <div v-if="asInfo.country?.name" class="font-medium">Country</div>
          <div v-if="asInfo.country?.name" class="text-muted">{{ asInfo.country?.name }}</div>

          <div v-if="asInfo.rank" class="font-medium">AS Rank</div>
          <div v-if="asInfo.rank" class="text-muted">#{{ asInfo.rank }}</div>
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
</script>