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
import { API_TIMEOUT_MULTICMD, CommandTypes, TOAST_MESSAGES } from '~~/constants';

const toast = useToast();
const showProgress = ref(false);

const { command, maxDestinations, maxLocations, resultComponent } = defineProps<{
  command: CommandTypes;
  maxDestinations: number;
  maxLocations: number;
  resultComponent: Component | string;
}>()

const { fetchResults } = useApi();

const tabItems = ref<TabsItem[]>([]);
const results = ref<MultiResult | null>(null);

async function onSubmit(event: MultiEmitSchema) {
  results.value = null;
  tabItems.value = [];
  console.log('MutltiEventSubmit:', event.locations);

  try {
    showProgress.value = true;
    // Group locations by serverId, pushing only loc.value
    const locationsByServer = event.locations.reduce<Record<string, string[]>>((acc, loc) => {
      (acc[loc.server_id] ??= []).push(loc.value);
      return acc;
    }, {});

    console.log('LocationsByServer:', locationsByServer)

    // Fetch results for each serverId with individual error handling
    const settledResults = await Promise.allSettled(
      Object.entries(locationsByServer).map(([server_id, locations]) =>
        fetchResults<MultiResult>(
          '/api/multi/',
          { command, locations, destinations: event.destinations, serverId: server_id, timeout: API_TIMEOUT_MULTICMD }
        )
      )
    );

    // Log failed servers and show toast
    const failedCount = settledResults.filter(result => result.status === 'rejected').length;

    settledResults.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error('One of the requests failed:', result.reason);
      }
    });

    // Show toast if some servers failed
    if (failedCount > 0) {
      toast.add(TOAST_MESSAGES.partial);
    }

    // Filter successful responses
    const responses = settledResults
      .filter((result): result is PromiseFulfilledResult<MultiResult> =>
        result.status === 'fulfilled' && !!result.value
      )
      .map(result => result.value);

    // Merge results from successful responses
    const mergedLocations = responses.flatMap(res => res.locations ?? []);
    const mergedErrors = responses.flatMap(res => res.errors ?? []);

    if (responses.length) {
      results.value = {
        ...responses[0],
        locations: mergedLocations,
        errors: mergedErrors,
        raw_only: responses[0].raw_only ?? false,
      };
      if (mergedLocations.length) {
        tabItems.value = useMapLocationsToTabs(mergedLocations);
      }
    } else {
      // All servers failed
      toast.add(TOAST_MESSAGES.error);
      results.value = null;
    }
  } catch (error) {
    toast.add(TOAST_MESSAGES.error);
    results.value = null;
  } finally {
    showProgress.value = false;
  }


}
</script>
