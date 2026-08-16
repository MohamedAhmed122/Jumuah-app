import type { AppLanguage } from "@src/i18n/languages";
import { useSettingsStore } from "@src/stores/settingsStore";
import { readLocationsCache, writeLocationsCache } from "../cache";
import { apiClient } from "../client";
import {
  LOCATION_CACHE_VERSION,
  LOCATION_ENDPOINTS,
} from "./locations.constants";
import type {
  CachedLocationBundle,
  HalalPlace,
  LocationBundle,
  Mosque,
} from "./locations.types";

export async function fetchLocationBundle(
  forceRefresh = false,
  language: AppLanguage = useSettingsStore.getState().appLanguage,
): Promise<LocationBundle> {
  if (!forceRefresh) {
    const cached = await readLocationsCache<CachedLocationBundle>();
    if (
      cached?.version === LOCATION_CACHE_VERSION &&
      cached.language === language
    )
      return cached.bundle;
  }

  const [mosqueResponse, halalResponse] = await Promise.all([
    apiClient.get<Mosque[]>(LOCATION_ENDPOINTS.mosques),
    apiClient.get<HalalPlace[]>(LOCATION_ENDPOINTS.halal, {
      params: { lang: language },
    }),
  ]);
  const bundle: LocationBundle = {
    halal: halalResponse.data,
    mosques: mosqueResponse.data,
  };

  await writeLocationsCache<CachedLocationBundle>({
    bundle,
    language,
    version: LOCATION_CACHE_VERSION,
  });
  return bundle;
}
