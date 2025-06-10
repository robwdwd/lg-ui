<template>
  <UTable :data="results" :columns="columns" />
</template>

<script setup lang="ts">

import type { TableColumn } from '@nuxt/ui'
import type { IPAddressInfo } from '~~/shared/types/tracerouteresult';

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
      const info: IPAddressInfo = row.getValue('info')
      return info?.asn ? h(IpAddressInfoTooltip, { ipinfo: info }) : ''
    },
  },
  {
    accessorKey: 'rtt',
    header: 'RTT',
  },
]
</script>