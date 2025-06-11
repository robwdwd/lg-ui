import { MultiApiPostBody } from "~~/shared/types/misc";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const { command, locations, destinations, timeout, serverId }: MultiApiPostBody = await readBody(event);

  // Validate required fields and types
  if (
    !command ||
    !Array.isArray(locations) ||
    !Array.isArray(destinations) ||
    !timeout ||
    !serverId
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body: Missing or invalid required fields',
    });
  }

  // Get the correct API base URL from lgApiServers using serverId
  const apiBase = config.lgApiServers?.[serverId];
  if (!apiBase) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid serverId: ${serverId}`,
    });
  }

  const apiUrl = `${apiBase}multi/${command}`;
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
        timeout,
        serverId: serverId
      });
      if (!response?.locations?.length) {
      throw createError({
        statusCode: 502,
        statusMessage: 'API returned errors and no results',
      });
      }
    }

    return response;
  } catch (error: any) {
    console.error('Error fetching API data:', {
      message: error?.message || error,
      command,
      body,
      timeout,
      serverId: serverId
    });
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch API data',
    });
  }
});
