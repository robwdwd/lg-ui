<template>
  <UTable :data="results" :columns="columns" />
</template>

<script setup lang="ts">
import { h } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const IpAddressInfoTooltip = resolveComponent('IpAddressInfoTooltip')

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
    accessorKey: 'info',
    header: 'Origin ASN',
    cell: ({ row }) => {
      const info = row.getValue('info')
      return info?.asn ? h(IpAddressInfoTooltip, { ipinfo: info }) : ''
    },
  },
  {
    accessorKey: 'rtt',
    header: 'RTT',
  },
]
</script>