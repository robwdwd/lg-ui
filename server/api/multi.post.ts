import { API_TIMEOUT_MULTICMD } from "~~/constants";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const body = await readBody<{ command: string; body: MultiEmitSchema }>(event);
  const { command, body: requestBody } = body;

  // Validate required fields
  if (!command || !requestBody) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body: Missing required fields',
    });
  }

  try {
    const apiUrl = `${config.public.apiBase}multi/${command}`;

    const response = await $fetch<MultiBgpResult | MultiPingResult>(apiUrl, {
      method: 'POST',
      body: requestBody,
      timeout: API_TIMEOUT_MULTICMD
    });

    if (response?.errors?.length > 0) {
      console.error('API returned errors:', {
        message: response.errors,
        command,
        requestBody,
      });
      throw Error('API returned errors');
    }

    return response

  } catch (error) {
    console.error('Error fetching API data:', {
      message: error,
      command,
      requestBody,
    });
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch API data',
    });
  }
});