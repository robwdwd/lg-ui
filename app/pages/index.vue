<template>
  <UContainer>
    <div class="flex flex-col lg:flex-row gap-10">
      <div>
        <UForm :state="state" class="space-y-4" @submit="onSubmit">
          <LocationSelect v-model="state.location" />

          <UFormField label="Command" name="command">
            <USelect size="xl" v-model="state.command" :items="commandLabels" placeholder="Select Command"
              class="w-full lg:w-72" />
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
        <UProgress v-if="showProgress" :v-model="null" />
        <div v-if="results">
          <component :is="getResultComponent" :results="results" />
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui';
import { API_TIMEOUT, CommandTypes, TOAST_MESSAGES } from '~~/constants';

const toast = useToast();
const showProgress = ref(false);

const { fetchResults } = useApi();
const results = ref<Result | null>(null);

// Track the command seperatly from state of the form as if the user
// changes the command select when viewing existing results it does bad things
//
const lgCommand = ref<CommandTypes | undefined>();

const commandLabels = [
  { label: 'BGP Route', value: CommandTypes.BGP },
  { label: 'Ping', value: CommandTypes.PING },
  { label: 'Traceroute', value: CommandTypes.TRACEROUTE },
];

const resultComponents = computed(() => ({
  [CommandTypes.BGP]: resolveComponent('BgpResult'),
  [CommandTypes.PING]: resolveComponent('PingResult'),
  [CommandTypes.TRACEROUTE]: resolveComponent('TracerouteResult'),
}));

const getResultComponent = computed(() =>
  lgCommand.value ? resultComponents.value[lgCommand.value] : undefined
)

const ipOrCidr = z.union([
  z.string().cidr({ message: 'Invalid CIDR or IP address' }),
  z.string().ip({ message: 'Invalid CIDR or IP address' }),
]);

const schema = z.object({
  location: z.object({
    value: z.string(),
    label: z.string(),
    server_id: z.string(),
    icon: z.string(),
  }, { required_error: 'Location is required' }),
  command: z.nativeEnum(CommandTypes, { message: 'Command is required' }),
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
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  results.value = null;
  showProgress.value = true;
  
  try {
    const { command, location, destination } = event.data;
    lgCommand.value = command as CommandTypes;

    const response = await fetchResults<Result>('/api/run/', {
      command: command as CommandTypes,
      location: location.value,
      destination,
      serverId: location.server_id,
      timeout: API_TIMEOUT[command as CommandTypes],
    });

    if (response) {
      results.value = response;
    }
  } catch (error) {
    toast.add(TOAST_MESSAGES.error);
    results.value = null;
  } finally {
    showProgress.value = false;
  }
}
</script>
