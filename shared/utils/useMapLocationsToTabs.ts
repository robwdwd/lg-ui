import type { TabsItem } from '@nuxt/ui';

export const useMapLocationsToTabs = (locations: ResultLocation[]): TabsItem[] => {
  return locations.map((loc) => ({
    label: loc.name,
    slot: `${loc.name}` as const,
  }));
};