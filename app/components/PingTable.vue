<template>
    <UTable :data="results" :columns="columns" />
</template>

<script setup lang="ts">

import { h } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const { results } = defineProps<{ results: PingData[] }>()

// Utility function for packet loss class
const getPacketLossClass = (loss: number): string => {
    if (loss > 60) return 'text-red-500'
    if (loss > 30) return 'text-orange-500'
    if (loss > 0) return 'text-yellow-400'
    return 'text-green-400'
}

// Define columns
const columns: TableColumn<PingData>[] = [
    {
        accessorKey: 'ip_address',
        header: 'Destination',
        cell: ({ row }) => h('div', { class: 'text-primary font-medium' }, row.getValue('ip_address')),
    },
    {
        accessorKey: 'packet_loss',
        header: 'Loss %',
        cell: ({ row }) => {
            const loss = row.getValue('packet_loss')
            return h('span', { class: getPacketLossClass(loss) }, loss)
        },
    },
    { accessorKey: 'rtt_min', header: 'RTT (Min)' },
    { accessorKey: 'rtt_avg', header: 'RTT (Avg)' },
    { accessorKey: 'rtt_max', header: 'RTT (Max)' },
    { accessorKey: 'packet_count', header: 'Packet Count' },
    { accessorKey: 'packet_size', header: 'Packet Size' },
]
</script>