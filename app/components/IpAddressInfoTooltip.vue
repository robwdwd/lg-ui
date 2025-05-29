<template>
  <UPopover mode="hover" arrow>
    <div>AS{{ ipinfo.asn }}</div>
    <template #content>
      <UCard variant="subtle">
        <template #header>
          <div class="flex">
            <div v-if="ipinfo.as_cc" class="me-3">
              <UIcon :name="`i-flag-${ipinfo.as_cc.toLowerCase()}-4x3`" />
            </div>
            <div>AS{{ ipinfo.asn }}</div>
          </div>
        </template>
        <div class="grid grid-cols-2 gap-2 max-w-2xs">
          <div v-if="displayName" class="font-medium">AS Name</div>
          <div v-if="displayName" class="text-muted">{{ displayName }}</div>

          <div v-if="ipinfo.asrank?.country?.name" class="font-medium">AS Country</div>
          <div v-if="ipinfo.asrank?.country?.name" class="text-muted">
            <UIcon v-if="ipinfo.asrank?.country?.iso" :name="`i-flag-${ipinfo.asrank.country.iso.toLowerCase()}-4x3`" /> {{ ipinfo.asrank.country.name }}
          </div>

          <div v-if="ipinfo.asrank?.rank" class="font-medium">AS Rank</div>
          <div v-if="ipinfo.asrank?.rank" class="text-muted">#{{ ipinfo.asrank.rank }}</div>

          <div v-if="ipinfo.bgp_prefix" class="font-medium">BGP Prefix</div>
          <div v-if="ipinfo.bgp_prefix" class="text-muted">{{ ipinfo.bgp_prefix }}</div>

          <div v-if="ipinfo.registry" class="font-medium">Registry</div>
          <div v-if="ipinfo.registry" class="text-muted">{{ registryUpper }}</div>
        </div>
      </UCard>
    </template>
  </UPopover>
</template>

<script setup lang="ts">

import type { IPAddressInfo } from '~~/shared/types/tracerouteresult';

const { ipinfo } = defineProps<{ ipinfo: IPAddressInfo }>()

const displayName = computed(() =>
  ipinfo.asrank?.organization?.orgName || ipinfo.asrank?.asnName || ''
)

const registryUpper = computed(() =>
  ipinfo.registry ? ipinfo.registry.toUpperCase() : ''
)

</script>