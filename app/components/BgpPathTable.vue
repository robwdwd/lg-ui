<template>
  <UTable :data="results" :columns="columns" />
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

const { results } = defineProps<{ results: BgpPath[] }>()

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UTooltip = resolveComponent('UTooltip')
const UFieldGroup = resolveComponent('UFieldGroup')

const columns: TableColumn<BgpPath>[] = [
  {
    header: '#',
    accessorKey: 'best_path',
    cell: ({ row }) => {
      const pathId = row.index + 1
      const isBestPath = row.getValue('best_path')
      if (isBestPath) {
        return h(
          UFieldGroup,
          { variant: 'subtle', color: 'success' },
          () => [
            h(UButton, { variant: 'outline', color: 'success' }, () => String(pathId)),
            h(UButton, { variant: 'subtle', color: 'success' }, () => 'Best'),
          ]
        )
      }
      return h('span', { class: 'font-medium' }, String(pathId))
    },
  },
  {
    accessorKey: 'as_path',
    header: 'AS Path',
    cell: ({ row }) => {
      const asPath = row.getValue('as_path') as number[] | undefined

      if (!asPath || asPath.length === 0) {
        return null
      }
      return h('div', { class: 'text-right font-medium' }, asPath.join(' '))
    },
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
      const communities = row.getValue('communities') as Array<{ community: string; description?: string }> | undefined

      if (!communities || communities.length === 0) {
        return null
      }

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
