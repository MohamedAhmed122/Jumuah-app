import { useCallback, useEffect, useMemo, useState } from 'react';
import * as Location from 'expo-location';
import type { HalalPlace } from '@src/api/locations';
import { useSettingsStore } from '@src/stores/settingsStore';
import { fallbackCity } from '../HalalPlacesScreen.utils';

export function useHalalCity(places: HalalPlace[]) {
  const { userCoordinates, preferredHalalCity, setPreferredHalalCity } = useSettingsStore();
  const [selectedCity, setSelectedCity] = useState(preferredHalalCity ?? 'Vilnius');
  const [cityVisible, setCityVisible] = useState(false);
  const cityOptions = useMemo(() => [...new Set(places.map((place) => place.city).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b)), [places]);

  const detectCity = useCallback(async () => {
    try {
      const [location] = await Location.reverseGeocodeAsync({
        latitude: userCoordinates.lat,
        longitude: userCoordinates.lng,
      });
      const detected = location?.city || location?.subregion || '';
      const match = cityOptions.find((city) => city.toLocaleLowerCase() === detected.toLocaleLowerCase());
      setSelectedCity(match ?? fallbackCity(cityOptions));
    } catch {
      setSelectedCity(fallbackCity(cityOptions));
    }
  }, [cityOptions, userCoordinates]);

  useEffect(() => {
    if (preferredHalalCity) setSelectedCity(preferredHalalCity);
    else if (places.length > 0) void detectCity();
  }, [detectCity, places.length, preferredHalalCity]);

  const selectCity = async (city: string) => {
    setSelectedCity(city);
    await setPreferredHalalCity(city);
    setCityVisible(false);
  };

  const useCurrentCity = async () => {
    await setPreferredHalalCity(null);
    setCityVisible(false);
    await detectCity();
  };

  return {
    userCoordinates, selectedCity, cityOptions, cityVisible,
    openCity: () => setCityVisible(true), closeCity: () => setCityVisible(false),
    selectCity, useCurrentCity,
  };
}
