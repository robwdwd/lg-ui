<template>
  <UTable :data="results" :columns="columns" />
</template>

<script setup lang="ts">

import type { TableColumn } from '@nuxt/ui'

const { results } = defineProps<{ results: TracerouteHop[] }>()

const columns: TableColumn<TracerouteHop>[] = [
  {
    accessorKey: 'hop_number',
    header: 'Hop',
  },
  {
    accessorKey: 'ip_address',
    header: 'IP',
  },
  {
    accessorKey: 'fqdn',
    header: 'FQDN',
  },
  {
    accessorKey: 'rtt',
    header: 'RTT',
  },
]
</script>