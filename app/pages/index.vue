<template>
  <UContainer>
    <div class="flex flex-col lg:flex-row gap-10">
      <div>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <LocationSelect v-model="state.location" />

          <UFormField label="Command" name="command">
            <USelect size="xl" v-model="state.command" :items="command_labels" placeholder="Select Command" class="w-full lg:w-72" />
          </UFormField>

          <UFormField label="Destination" name="destination" size="xl">
            <UInput v-model="state.destination" class="w-full lg:w-72" />
          </UFormField>

          <UButton size="xl" type="submit" class="block w-full lg:w-72">
            Submit
          </UButton>
        </UForm>
      </div>

      <div class="flex-auto">
        <UProgress v-if="api_call_show_progress" v-model="api_call_progress" />
        <div v-if="results">
          <component :is="getResultComponent(lgCommand)" :results="results" />
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui';
import { API_TIMEOUT, CommandTypes } from '~~/constants';

const { api_call_progress, api_call_show_progress, fetchResults } = useApi();
const results = ref<Result | null>(null);

// Track the command seperatly from state of the form as if the user
// changes the command select when viewing existing results it does bad things
//
const lgCommand = ref<string | undefined>();

const command_labels = [
  { label: 'BGP Route', value: CommandTypes.BGP },
  { label: 'Ping', value: CommandTypes.PING },
  { label: 'Traceroute', value: CommandTypes.TRACEROUTE },
];

const resultComponents: Record<CommandTypes, any> = {
  [CommandTypes.BGP]: resolveComponent('BgpResult'),
  [CommandTypes.PING]: resolveComponent('PingResult'),
  [CommandTypes.TRACEROUTE]: resolveComponent('TracerouteResult'),
};

const ipOrCidr = z.union([
  z.string().cidr({ message: 'Invalid CIDR or IP address' }),
  z.string().ip({ message: 'Invalid CIDR or IP address' }),
]);

const schema = z.object({
  location: z.string({ message: 'Location is required' }),
  command: z.string({ message: 'Command is required' }),
  destination: ipOrCidr,
}).refine(
  ({ command, destination }) =>
    command === CommandTypes.BGP || !destination.includes('/'),
  {
    message: 'Destination cannot be a CIDR for ping or traceroute.',
    path: ['destination'],
  }
);

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  location: undefined,
  command: undefined,
  destination: undefined,
});

function getResultComponent(command: CommandTypes | undefined) {
  return command ? resultComponents[command] : null;
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  results.value = null;
  lgCommand.value = event.data.command;

  const response = await fetchResults<Result>('/api/run/', {
    command: event.data.command,
    location: event.data.location,
    destination: event.data.destination,
    timeout: API_TIMEOUT[event.data.command],
  });

  if (response) {
    results.value = response;
  }
}
</script>
