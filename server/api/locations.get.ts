export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
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

    const regionMap = new Map<string, ApiRegions>();

    for (const region of results.flat()) {
      const existingRegion = regionMap.get(region.name);
      if (existingRegion) {
        const existingCodes = new Set(existingRegion.locations.map(loc => loc.code));
        const existingNames = new Set(existingRegion.locations.map(loc => loc.name));

        const duplicateCodes = region.locations.filter(loc => existingCodes.has(loc.code));
        if (duplicateCodes.length) {
          throw createError({
            statusCode: 409,
            statusMessage: `Duplicate location codes found in region "${region.name}": ${duplicateCodes.map(loc => loc.code).join(', ')}`,
          });
        }

        const duplicateNames = region.locations.filter(loc => existingNames.has(loc.name));
        if (duplicateNames.length) {
          throw createError({
            statusCode: 409,
            statusMessage: `Duplicate location names found in region "${region.name}": ${duplicateNames.map(loc => loc.name).join(', ')}`,
          });
        }

        existingRegion.locations.push(...region.locations);
      } else {
        regionMap.set(region.name, { ...region, locations: [...region.locations] });
      }
    }

    // Sort regions and their locations by name
    return Array.from(regionMap.values())
      .map(region => ({
        ...region,
        locations: region.locations.slice().sort((a, b) => a.name.localeCompare(b.name)),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch location data',
    });
  }
});
