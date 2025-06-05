<template>
  <div v-if="showRawOutput" class="p-3 mb-3">
    <UCard variant="outline" class="mb-3">
      <pre class="text-xs md:text-sm lg:text-base"><code>{{ results.raw_output }}</code></pre>
    </UCard>
  </div>
  <UCard v-else v-for="parsedResult in results.parsed_output" variant="outline" class="mb-3">
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <div class="font-medium text-lg">Traceroute to <span class="text-primary">{{ parsedResult.ip_address }}</span></div>
        </div>
        <div>
          <UModal v-if="showModal" fullscreen title="Traceroute Result" :description="`Plain text output of the traceroute to ${parsedResult.ip_address}.`">
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
    <TracerouteTable :results="parsedResult.hops" />
  </UCard>
</template>

<script setup lang="ts">

const { results } = defineProps<{
  results: TracerouteResult
}>()

// Computed property for conditional logic
const showRawOutput = computed(() => results.raw_only || results.parsed_output.length < 1)
const showModal = computed(() => !results.raw_only && results.parsed_output.length > 0)

</script>
