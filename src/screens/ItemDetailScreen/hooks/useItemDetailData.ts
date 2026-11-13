import {
  fetchLocationBundle,
  type HalalPlace,
  type Mosque,
} from "@src/api/locations";
import { useSettingsStore } from "@src/stores/settingsStore";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import type { ItemDetailRouteParams } from "../ItemDetailScreen.types";
import { findItem, narrowItem } from "../ItemDetailScreen.utils";

export function useItemDetailData() {
  const { type, id } = useLocalSearchParams<ItemDetailRouteParams>();
  const language = useSettingsStore((state) => state.appLanguage);
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [halalPlaces, setHalalPlaces] = useState<HalalPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id || !type) return;
    void (async () => {
      try {
        const bundle = await fetchLocationBundle(false, language);
        setMosques(bundle.mosques);
        setHalalPlaces(bundle.halal);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, language, type]);

  const item = useMemo(
    () => (id && type ? findItem(type, id, mosques, halalPlaces) : null),
    [id, type, mosques, halalPlaces],
  );
  const narrowed = narrowItem(item, type);
  return { item, type, loading, error, ...narrowed };
}
