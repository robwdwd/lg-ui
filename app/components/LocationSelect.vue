<template>
  <UFormField label="Location" name="location">
    <UInputMenu v-model="model" :items="locations" :multiple="multiple"
      :loading="locationStatus !== 'success'" :disabled="locationStatus !== 'success'" :placeholder="placeholder"
      class="w-full lg:w-72" />
  </UFormField>
</template>

<script setup lang="ts">
import type { ApiRegions, LocationSelect } from '~~/shared/types/locations';


const model = defineModel<LocationSelect | LocationSelect[]>()

const props = defineProps<{ multiple?: boolean }>()

const defaultPlaceholder = 'Select a location'

const placeholder = computed(() =>
  props.multiple && Array.isArray(model.value) && model.value.length > 0
    ? ''
    : defaultPlaceholder
)

// Get location data for the location select.
//
const transformLocations = (data: ApiRegions[]) => {
  return data.flatMap(region => [
    { type: 'label' as const, label: region.name, value: undefined },
    ...region.locations.map(loc => ({
      label: `${loc.name} (${loc.country})`,
      value: loc.code,
      server_id: loc.server_id,
      icon: `i-flag-${loc.country_iso.toLowerCase()}-4x3`
    }))
  ]);
};

const { data: locations, status: locationStatus } = await useFetch('/api/locations', {
  transform: transformLocations,
  lazy: true,
});

</script>
