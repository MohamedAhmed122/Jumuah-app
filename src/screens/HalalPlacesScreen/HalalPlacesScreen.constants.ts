import type { Filters } from './HalalPlacesScreen.types';

export const PRICE_MIN = 0;
export const PRICE_MAX = 50;

export const DEFAULT_FILTERS: Filters = {
  placeType: 'all',
  foodCategories: [],
  discountOnly: false,
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
};
