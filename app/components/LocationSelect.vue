<template>
  <UFormField label="Location" name="location">
    <USelect v-model="model" :items="locations" :multiple="multiple" :loading="location_status !== 'success'" :disabled="location_status !== 'success'"
      placeholder="Select location" class="w-full lg:w-72" />
  </UFormField>
</template>

<script setup lang="ts">

const model = defineModel();

defineProps<{
  multiple?: boolean,
}>()

// Get location data for the location select.
//
const transformLocations = (data: { code: string; name: string; locations: { name: string; code: string }[] }[]) => {
  return data.flatMap(region => [
    { type: 'label', label: region.name },
    ...region.locations.map(l => ({ label: l.name, value: l.code }))
  ]);
};

const { data: locations, status: location_status } = await useFetch('/api/locations', {
  transform: transformLocations,
  lazy: true,
});

</script>