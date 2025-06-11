<template>
  <UFormField label="Location" name="location">
    <UInputMenu size="xl" v-model="model" :items="locations" :multiple="multiple"
      :loading="locationStatus !== 'success'" :disabled="locationStatus !== 'success'" :placeholder="placeholder"
      icon="i-lucide-map" class="w-full lg:w-72" />
  </UFormField>
</template>

<script setup lang="ts">
import type { LocationSelect } from '~~/shared/types/locations';


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
const transformLocations = (data: { code: string; name: string; locations: { name: string; code: string; server_id: string, country: string, country_iso: string }[] }[]) => {
  return data.flatMap(region => [
    { type: 'label' as const, label: region.name, value: undefined },
    ...region.locations.map(l => ({
      label: l.name,
      value: l.code,
      server_id: l.server_id,
      icon: `i-flag-${l.country_iso.toLowerCase()}-4x3`
    }))
  ]);
};

const { data: locations, status: locationStatus } = await useFetch('/api/locations', {
  transform: transformLocations,
  lazy: true,
});

</script>
