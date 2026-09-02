import { useMemo, useState } from 'react';
import type { HalalPlace } from '@src/api/locations';
import { DEFAULT_FILTERS } from '../HalalPlacesScreen.constants';
import type { Filters } from '../HalalPlacesScreen.types';
import { matchesFilters, searchPlaces, sortPlacesByDistance } from '../HalalPlacesScreen.utils';

export function useHalalFilters(
  places: HalalPlace[], selectedCity: string, coords: { lat: number; lng: number },
) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [draftFilters, setDraftFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [filterVisible, setFilterVisible] = useState(false);
  const basePlaces = useMemo(
    () => searchPlaces(places, selectedCity, search),
    [places, search, selectedCity],
  );
  const filteredPlaces = useMemo(
    () => sortPlacesByDistance(basePlaces, filters, coords),
    [basePlaces, filters, coords],
  );
  const draftCount = useMemo(
    () => basePlaces.filter((place) => matchesFilters(place, draftFilters)).length,
    [basePlaces, draftFilters],
  );

  const openFilters = () => {
    setDraftFilters({ ...filters, foodCategories: [...filters.foodCategories] });
    setFilterVisible(true);
  };
  const closeFilters = () => setFilterVisible(false);
  const resetDraft = () => setDraftFilters({ ...DEFAULT_FILTERS, foodCategories: [] });
  const applyFilters = () => {
    setFilters(draftFilters);
    setFilterVisible(false);
  };

  return {
    search, setSearch, filters, draftFilters, setDraftFilters, filteredPlaces, draftCount,
    filterVisible, openFilters, closeFilters, resetDraft, applyFilters,
  };
}
