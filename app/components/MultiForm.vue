<template>
  <UForm :schema="schema" :state="state" :validate="validate" class="space-y-4" @submit="onSubmit">
    <LocationSelect v-model="state.location" multiple />

    <UFormField label="Destinations" name="destination">
      <UTextarea v-model="state.destination" class="w-full lg:w-72" />
    </UFormField>

    <UButton type="submit" class="block w-full lg:w-72">
      Submit
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const emit = defineEmits<{
  submit: [MultiEmitSchema]
}>()

const { maxLocation, maxDestination } = defineProps<{
  maxLocation: number,
  maxDestination: number,
}>()

const state = reactive<Partial<Schema>>({
  location: undefined,
  destination: undefined
})

const schema = z.object({
  location: z.string()
    .array()
    .max(maxLocation, { message: `A maximum of ${maxLocation} locations allowed` })
    .nonempty({ message: "Location is required" }),

  destination: z.string().nonempty({ message: "Destination is required" })
})

type Schema = z.output<typeof schema>


// Utility function to parse and clean destination input
const parseDestinations = (destination: string): string[] =>
  [...new Set(destination.split(/[\s,;]+/).filter(Boolean))];

// Helper function to process Zod errors
const processZodErrors = (error: z.ZodError): FormError[] => {
  const formErrors: FormError[] = []
  const flattenedErrors = error.flatten()

  flattenedErrors.formErrors.forEach(msg => {
    formErrors.push({ name: 'destination', message: msg })
  })

  Object.entries(flattenedErrors.fieldErrors).forEach(([_, messages]) => {
    messages.forEach(msg => {
      formErrors.push({ name: 'destination', message: msg })
    })
  })

  return formErrors
}

// Custom validation
//
const validate = (state: any): FormError[] => {
  const foundErrors: FormError[] = []

  if (state.destination) {
    const dests = parseDestinations(state.destination)
    try {
      z.array(z.string().ip('IP address is not valid'))
        .min(1, { message: "At least one destination is required" })
        .max(maxDestination, { message: `A maximum of ${maxDestination} destinations allowed` })
        .parse(dests)

    } catch (error) {
      if (error instanceof z.ZodError) {
        foundErrors.push(...processZodErrors(error))
      }
    }
  }

  return foundErrors
}

// Handle form submission
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const dests = parseDestinations(event.data.destination || '')

  emit('submit', {
    locations: Array.from(event.data.location),
    destinations: dests,
  })
}

</script>