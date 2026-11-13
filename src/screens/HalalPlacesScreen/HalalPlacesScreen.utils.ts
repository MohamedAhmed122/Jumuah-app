import type { HalalPlace } from '@src/api/locations';
import type { Filters, HalalPlaceResult, PlaceType } from './HalalPlacesScreen.types';

export function supportsFoodFilters(placeType: PlaceType): boolean {
  return placeType === 'restaurant' || placeType === 'fast_food';
}

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const radius = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function plainText(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

export function isOpenNow(hours?: string): boolean | null {
  if (!hours) return null;
  const match = hours.match(/^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const [, openHour, openMinute, closeHour, closeMinute] = match.map(Number);
  const current = new Date().getHours() * 60 + new Date().getMinutes();
  return current >= openHour * 60 + openMinute && current < closeHour * 60 + closeMinute;
}

export function matchesFilters(place: HalalPlace, filters: Filters): boolean {
  if (filters.placeType !== 'all' && place.category !== filters.placeType) return false;
  const categories = new Set((place.foodCategories ?? []).map((item) => item.toLocaleLowerCase()));
  if (!filters.foodCategories.every((item) => categories.has(item.toLocaleLowerCase()))) return false;
  if (filters.discountOnly && !(place.discountPercent && place.discountPercent > 0)) return false;
  if (!supportsFoodFilters(filters.placeType)) return true;
  return place.averageMealCost != null
    && place.averageMealCost >= filters.minPrice
    && place.averageMealCost <= filters.maxPrice;
}

export function searchPlaces(places: HalalPlace[], city: string, search: string): HalalPlace[] {
  const query = search.trim().toLocaleLowerCase();
  return places.filter((place) => !city || place.city === city).filter((place) => {
    if (!query) return true;
    return [place.name, place.address, place.city, plainText(place.descriptionHtml), ...(place.foodCategories ?? [])]
      .some((value) => value?.toLocaleLowerCase().includes(query));
  });
}

export function sortPlacesByDistance(
  places: HalalPlace[], filters: Filters, coords: { lat: number; lng: number },
): HalalPlaceResult[] {
  return places.filter((place) => matchesFilters(place, filters)).map((place) => ({
    ...place,
    distanceKm: haversineKm(coords.lat, coords.lng, place.lat, place.lng),
  })).sort((a, b) => a.distanceKm - b.distanceKm);
}

export function fallbackCity(cities: string[]): string {
  return cities.includes('Vilnius') ? 'Vilnius' : cities[0] ?? 'Vilnius';
}
