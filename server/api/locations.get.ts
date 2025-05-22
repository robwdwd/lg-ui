export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    const locations = await $fetch(`${config.public.apiBase}locations/regional`);
    return locations
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch location data',
    });
  }
});
