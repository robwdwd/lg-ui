<template>

  <div class="flex items-center justify-between mt-2 mb-3">
    <div>BGP route for <span class="text-primary">{{ prefix }}</span></div>
    <div>
      <AsPathFlow :as-paths="asPaths" :prefix="prefix" :as-info="asInfo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ASNInfo } from '~~/shared/types/bgpresult';

const { prefix, asPaths, asInfo } = defineProps<{ prefix: string, asPaths: number[][], asInfo?: ASNInfo }>()

</script>
