import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { PlaceTypeOption } from '../HalalPlacesScreen.types';
import { useHalalCity } from './useHalalCity';
import { useHalalFilters } from './useHalalFilters';
import { useHalalPlacesData } from './useHalalPlacesData';

export function useHalalPlacesScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const data = useHalalPlacesData();
  const city = useHalalCity(data.places);
  const filtering = useHalalFilters(data.places, city.selectedCity, city.userCoordinates);
  const placeTypes: PlaceTypeOption[] = [
    { value: 'all', label: t('map.filter_all') },
    { value: 'restaurant', label: t('map.restaurant') },
    { value: 'fast_food', label: t('map.fast_food') },
    { value: 'grocery', label: t('map.grocery') },
    { value: 'supermarket_halal', label: t('map.supermarket_halal') },
  ];
  const filterActive = filtering.filters.placeType !== 'all'
    || filtering.filters.foodCategories.length > 0
    || filtering.filters.discountOnly;

  return { t, insets, data, city, filtering, placeTypes, filterActive };
}
