<template>
  <UCard variant="outline" class="mb-3">
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <div class="font-medium text-lg">Ping results
            <span v-if="results.location_name"> for <span class="text-primary">{{ results.location_name }}</span></span>
          </div>
        </div>
        <div>
          <UModal v-if="showModal" fullscreen title="Ping results" description="Plain text output from the ping command.">
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
      <pre>{{ results.raw_output }}</pre>
    </div>

    <PingTable v-else :results="results.parsed_output" />
  </UCard>
</template>

<script setup lang="ts">

const { results } = defineProps<{
  results: PingResult
}>()

// Computed property for conditional logic
const showRawOutput = computed(() => results.raw_only || results.parsed_output.length < 1)
const showModal = computed(() => !results.raw_only && results.parsed_output.length > 0)

</script>