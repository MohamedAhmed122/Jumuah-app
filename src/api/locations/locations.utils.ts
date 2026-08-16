import type { LocationBundle } from './locations.types';

export function isLocationBundle(value: unknown): value is LocationBundle {
  if (!value || typeof value !== 'object') return false;
  const bundle = value as Partial<LocationBundle>;
  return Array.isArray(bundle.halal) && Array.isArray(bundle.mosques);
}
