<template>
  <UPopover mode="hover" arrow>
    <div>AS{{ ipinfo.asn }}</div>
    <template #content>
      <UCard variant="subtle">
        <template #header>
          <div class="flex">
            <div>{{ ipinfo.asn }}</div>
          </div>
        </template>
        <div class="grid grid-cols-2 gap-2 max-w-2xs">
          <div v-if="ipinfo.as_name" class="font-medium">AS Name</div>
          <div v-if="ipinfo.as_name" class="text-muted">{{ ipinfo.as_name }}</div>

          <div v-if="ipinfo.bgp_prefix" class="font-medium">BGP Prefix</div>
          <div v-if="ipinfo.bgp_prefix" class="text-muted">#{{ ipinfo.bgp_prefix }}</div>

          <div v-if="ipinfo.registry" class="font-medium">Registry</div>
          <div v-if="ipinfo.registry" class="text-muted">#{{ ipinfo.registry }}</div>
        </div>
      </UCard>
    </template>
  </UPopover>
</template>

<script setup lang="ts">

import type { IPAddressInfo } from '~~/shared/types/tracerouteresult';

const { ipinfo } = defineProps<{ ipinfo: IPAddressInfo }>()


</script>