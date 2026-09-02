import type { Dispatch, SetStateAction } from 'react';
import type { HalalPlace } from '@src/api/locations';

export type PlaceType = 'all' | HalalPlace['category'];

export interface Filters {
  placeType: PlaceType;
  foodCategories: string[];
  discountOnly: boolean;
  minPrice: number;
  maxPrice: number;
}

export interface HalalPlaceResult extends HalalPlace {
  distanceKm: number;
}

export type SetFilters = Dispatch<SetStateAction<Filters>>;

export interface PlaceTypeOption {
  value: PlaceType;
  label: string;
}
