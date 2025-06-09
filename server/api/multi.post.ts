import { MultiApiPostBody } from "~~/shared/types/misc";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const { command: command, locations: locations, destinations: destinations, timeout: timeout }: MultiApiPostBody = await readBody(event);

  // Validate required fields
  if (!command || !locations || !destinations || !timeout) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body: Missing required fields',
    });
  }

  try {
    const apiUrl = `${config.public.apiBase}multi/${command}`;

    const body = {
      locations,
      destinations
    };

    const response = await $fetch<MultiBgpResult | MultiPingResult>(apiUrl, {
      method: 'POST',
      body: body,
      timeout: timeout
    });

    if (response?.errors?.length > 0) {
      console.error('API returned errors:', {
        message: response.errors,
        command,
        body,
      });
      throw Error('API returned errors');
    }

    return response

  } catch (error) {
    console.error('Error fetching API data:', {
      message: error,
      command,
      body,
    });
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch API data',
    });
  }
});