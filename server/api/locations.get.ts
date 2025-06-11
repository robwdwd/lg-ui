export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  // Get the array of server URLs from the object values
  const apiServers = Object.values(config.lgApiServers) as string[];

  try {
    const results = await Promise.all(
      apiServers.map(async (base: string) => {
        try {
          return await $fetch<ApiRegions[]>(`${base}locations/regional`);
        } catch {
          return [];
        }
      })
    );

    // Merge regions by name and check for duplicates
    const regionMap = new Map<string, ApiRegions>();

    for (const region of results.flat()) {
      const existingRegion = regionMap.get(region.name);
      if (existingRegion) {
        // Check for duplicate codes and names
        const existingCodes = new Set(existingRegion.locations.map((loc) => loc.code));
        const existingNames = new Set(existingRegion.locations.map((loc) => loc.name));

        const duplicateCodes = region.locations.filter((loc) => existingCodes.has(loc.code));
        if (duplicateCodes.length) {
          throw createError({
            statusCode: 409,
            statusMessage: `Duplicate location codes found in region "${region.name}": ${duplicateCodes.map((loc) => loc.code).join(', ')}`,
          });
        }

        const duplicateNames = region.locations.filter((loc) => existingNames.has(loc.name));
        if (duplicateNames.length) {
          throw createError({
            statusCode: 409,
            statusMessage: `Duplicate location names found in region "${region.name}": ${duplicateNames.map((loc) => loc.name).join(', ')}`,
          });
        }

        existingRegion.locations.push(...region.locations);
      } else {
        // Clone to avoid mutation
        regionMap.set(region.name, { ...region, locations: [...region.locations] });
      }
    }

    return Array.from(regionMap.values());
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch location data',
    });
  }
});
