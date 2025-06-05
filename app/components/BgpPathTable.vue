<template>
  <UTable :data="results" :columns="columns" />
</template>

<script setup lang="ts">

import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const { results } = defineProps<{ results: BgpPath[] }>()

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UTooltip = resolveComponent('UTooltip')
const UButtonGroup = resolveComponent('UButtonGroup')

const columns: TableColumn<BgpPath>[] = [
  {
    header: '#',
    accessorKey: 'best_path',
    cell: ({ row }) => {
      const pathId = row.index + 1
      const isBestPath = row.getValue('best_path')
      if (isBestPath) {
        return h(
          UButtonGroup,
          { variant: 'subtle', color: 'success' },
          () => [
            h(UButton, { variant: 'outline', color: 'success' }, () => String(pathId)),
            h(UButton, { variant: 'subtle', color: 'success' }, () => 'Best'),
          ]
        )
      } else {
        return h('span', { class: 'font-medium' }, String(pathId))
      }
    },
  },
  {
    accessorKey: 'as_path',
    header: 'AS Path',
    cell: ({ row }) =>
      h('div', { class: 'text-right font-medium' }, row.getValue('as_path').join(' ')),
  },
  {
    accessorKey: 'next_hop',
    header: 'Next hop',
  },
  {
    accessorKey: 'local_pref',
    header: 'LP',
  },
  {
    accessorKey: 'metric',
    header: 'Metric',
  },
  {
    accessorKey: 'communities',
    header: 'Communities',
    cell: ({ row }) => {
      const communities = row.getValue('communities')
      return h(
        'div',
        { class: 'flex flex-wrap' },
        communities.map((community, index) =>
          h(
            UTooltip,
            { text: community.community, key: index },
            () =>
              h(
                UBadge,
                { variant: 'subtle', class: 'me-1 mb-1' },
                () => community.description || community.community
              )
          )
        )
      )
    },
  },
]
</script>
