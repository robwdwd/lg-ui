<template>
  <UContainer>
    <div class="flex flex-col lg:flex-row gap-10">
      <div>
        <MultiForm :max-destinations="maxDestinations" :max-locations="maxLocations" class="space-y-4"
          @submit="onSubmit" />
      </div>

      <div class="flex-auto">
        <UProgress v-if="showProgress" :v-model="null" />

        <div v-if="results">
          <UTabs :items="tabItems" class="w-full">
            <template v-for="location in results.locations" :key="location.name" #[location.name]>
              <component :is="resultComponent" :results="location.results" />
            </template>
          </UTabs>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import type { TabsItem } from '@nuxt/ui';
import { API_TIMEOUT_MULTICMD, CommandTypes } from '~~/constants';


const { command, maxDestinations, maxLocations, resultComponent } = defineProps<{
  command: CommandTypes;
  maxDestinations: number;
  maxLocations: number;
  resultComponent: Component | string;
}>()

const { showProgress, fetchResults } = useApi();

const tabItems = ref<TabsItem[]>([]);
const results = ref<MultiBgpResult | MultiPingResult | null>(null);

async function onSubmit(event: MultiEmitSchema) {
  results.value = null;
  tabItems.value = [];

  const response = await fetchResults<MultiBgpResult | MultiPingResult>(
    '/api/multi/',
    { command: command, locations: event.locations, destinations: event.destinations, timeout: API_TIMEOUT_MULTICMD },
  );

  if (response) {
    results.value = response;
    tabItems.value = useMapLocationsToTabs(response.locations);
  }
}
</script>
