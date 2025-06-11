export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig(event);

  const { command, location, destination, timeout, serverId }: ApiPostBody = await readBody(event);

  // Validate required fields
  if (!command || !location || !destination || !timeout || !serverId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body: Missing required fields',
    });
  }

  // Get the correct API base URL from lgApiServers using serverId
  const apiBase = config.lgApiServers?.[serverId];
  console.log('ApiBase:', apiBase)
  if (!apiBase) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid serverId: ${serverId}`,
    });
  }

  try {
    const apiUrl = `${apiBase}${command}/${location}/${destination}`;
    console.log('Single API URL:', apiUrl)
    return await $fetch(apiUrl, { timeout });
  } catch (error: any) {
    console.error('Error fetching API data:', {
      message: error?.message || error,
      command,
      location,
      destination,
      serverId,
      timeout,
    });
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch API data',
    });
  }
});