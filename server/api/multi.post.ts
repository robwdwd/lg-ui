import { MultiApiPostBody } from "~~/shared/types/misc";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const { command, locations, destinations, timeout }: MultiApiPostBody = await readBody(event);

  // Validate required fields and types
  if (
    !command ||
    !Array.isArray(locations) ||
    !Array.isArray(destinations) ||
    !timeout
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body: Missing or invalid required fields',
    });
  }

  const apiUrl = `${config.public.apiBase}multi/${command}`;
  const body = { locations, destinations };

  try {
    const response = await $fetch<MultiBgpResult | MultiPingResult>(apiUrl, {
      method: 'POST',
      body,
      timeout,
    });

    if (response?.errors?.length) {
      console.error('API returned errors:', {
        errors: response.errors,
        command,
        body,
      });
      throw createError({
        statusCode: 502,
        statusMessage: 'API returned errors',
      });
    }

    return response;
  } catch (error: any) {
    console.error('Error fetching API data:', {
      message: error?.message || error,
      command,
      body,
    });
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch API data',
    });
  }
});