import util from 'util';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  console.log(util.inspect(config.lgApiServers, { depth: null, colors: true }));

  // Get the array of server URLs from the object values
  const apiServers = Object.values(config.lgApiServers) as string[];

  try {
    const results = await Promise.all(
      apiServers.map(async (base: string) => {
        try {
          const regions = await $fetch<ApiRegions[]>(`${base}locations/regional`);
          return regions;
        } catch {
          return [];
        }
      })
    );

    // Flatten and merge regions with the same name
    const regionMap = new Map<string, ApiRegions>();

    results.flat().forEach((region: ApiRegions) => {
      if (regionMap.has(region.name)) {
        // Merge locations from regions with the same name
        const existingRegion = regionMap.get(region.name)!;

        // Check for duplicate location codes
        const existingCodes = new Set(existingRegion.locations.map((loc: ApiLocation) => loc.code));
        const duplicateCodes = region.locations.filter((loc: ApiLocation) => existingCodes.has(loc.code));

        // Check for duplicate location names
        const existingNames = new Set(existingRegion.locations.map((loc: ApiLocation) => loc.name));
        const duplicateNames = region.locations.filter((loc: ApiLocation) => existingNames.has(loc.name));

        if (duplicateCodes.length > 0) {
          const duplicateCodesList = duplicateCodes.map((loc: ApiLocation) => loc.code).join(', ');
          throw createError({
            statusCode: 409,
            statusMessage: `Duplicate location codes found in region "${region.name}": ${duplicateCodesList}`,
          });
        }

        if (duplicateNames.length > 0) {
          const duplicateNamesList = duplicateNames.map((loc: ApiLocation) => loc.name).join(', ');
          throw createError({
            statusCode: 409,
            statusMessage: `Duplicate location names found in region "${region.name}": ${duplicateNamesList}`,
          });
        }

        existingRegion.locations = [...existingRegion.locations, ...region.locations];
      } else {
        // Create a copy to avoid mutations
        regionMap.set(region.name, { ...region, locations: [...region.locations] });
      }
    });

    const locations = Array.from(regionMap.values());
    console.log(util.inspect(locations, { depth: null, colors: true }));
    return locations;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch location data',
    });
  }
});
