export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const body = await readBody(event);
  const { command, location, destination, timeout }: ApiPostBody = await readBody(event);

  // Validate required fields
  if (!command || !location || !destination || !timeout) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body: Missing required fields',
    });
  }

  try {
    const apiUrl = `${config.public.apiBase}${command}/${location}/${destination}`;
    return await $fetch(apiUrl, { timeout: timeout });
  } catch (error) {
    console.error('Error fetching API data:', {
      error: error,
      command,
      location,
      destination,
      timeout
    });
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch API data',
    });
  }
});