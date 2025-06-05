<template>
  <UCard variant="outline" class="mb-3">
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <div class="font-medium text-lg">BGP route results
            <span v-if="results.location_name"> for <span class="text-primary">{{ results.location_name }}</span></span>
          </div>
        </div>
        <div>
          <UModal v-if="showModal" fullscreen title="BGP results" description="Plain text output from the BGP command.">
            <UTooltip text="View the plain text output.">
              <UButton icon="i-tabler-code" color="neutral" variant="ghost" class="float-right" />
            </UTooltip>
            <template #body>
              <pre class="text-xs md:text-sm lg:text-base"><code>{{ results.raw_output }}</code></pre>
            </template>
          </UModal>
        </div>
      </div>
    </template>

    <div v-if="showRawOutput" class="p-3 mb-3">
      <pre class="text-xs md:text-sm lg:text-base"><code>{{ results.raw_output }}</code></pre>
    </div>
    <div v-else>
      <UTabs v-if="hasMultipleParsedOutputs" :items="tabItems" variant="pill" size="sm" color="neutral" class="w-full">
        <template v-for="(parsedResult, index) in results.parsed_output" #[index]="{ item }">
          <BgpPrefixHeader :prefix="parsedResult.prefix" :as-paths="parsedResult.as_paths" :as-info="parsedResult.asn_info" />
          <BgpPathTable :results="parsedResult.paths" />
        </template>
      </UTabs>

      <div v-else v-for="parsedResult in results.parsed_output">
        <BgpPrefixHeader :prefix="parsedResult.prefix" :as-paths="parsedResult.as_paths" :as-info="parsedResult.asn_info" />
        <BgpPathTable :results="parsedResult.paths" />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const { results } = defineProps<{ results: BgpResult }>()

// Computed property for tab items
const tabItems = computed<TabsItem[]>(() =>
  results.parsed_output.map((prefix, index) => ({
    label: prefix.prefix,
    slot: `${index}` as const
  }))
)

// Computed property for conditional logic
const showRawOutput = computed(() => results.raw_only || results.parsed_output.length < 1)
const showModal = computed(() => !results.raw_only && results.parsed_output.length > 0)
const hasMultipleParsedOutputs = computed(() => results.parsed_output.length > 1)
</script>
