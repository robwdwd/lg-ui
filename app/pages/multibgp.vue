<template>
  <UContainer>
    <div class="flex flex-col lg:flex-row gap-10">
      <div>
        <MultiForm :max-destination="$config.public.maxDestBgp" :max-location="$config.public.maxLocsBgp" class="space-y-4" @submit="onSubmit" />
      </div>

      <div class="flex-auto">
        <UProgress v-if="api_call_show_progress" v-model="api_call_progress" />

        <div v-if="results">
          <UTabs :items="tabItems" class="w-full">
            <template v-for="location in results.locations" #[location.name]="{ item }">
              <BgpResult :results="location.results" />
            </template>
          </UTabs>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
import { API_TIMEOUT_MULTICMD } from '~~/constants';

const { api_call_progress, api_call_show_progress, fetchResults } = useApi();

const tabItems = ref<TabsItem[]>([]);
const results = ref<MultiBgpResult | null>(null);

async function onSubmit(event: MultiEmitSchema) {
  results.value = null;
  tabItems.value = [];

  const response = await fetchResults<MultiBgpResult>(
    '/api/multi/',
    { command: 'bgp', body: event },
    API_TIMEOUT_MULTICMD
  );

  if (response) {
    results.value = response;
    tabItems.value = useMapLocationsToTabs(results.value.locations);
  }
}
</script>
