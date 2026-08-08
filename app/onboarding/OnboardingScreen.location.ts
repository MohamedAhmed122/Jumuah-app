import * as Location from 'expo-location';

import { DEFAULT_COORDS } from '@constants/prayerMethods';
import type { Coordinates } from '@src/stores/settingsStore/settingsStore.types';
import { LAST_LOCATION_MAX_AGE_MS, LOCATION_TIMEOUT_MS } from './OnboardingScreen.constants';

async function getCurrentPosition() {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
      new Promise<never>((_, reject) => {
        timeout = setTimeout(() => reject(new Error('location-timeout')), LOCATION_TIMEOUT_MS);
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

export async function resolveOnboardingCoordinates(
  allow: boolean,
  requestPermission: () => Promise<boolean>,
): Promise<Coordinates> {
  if (!allow) return DEFAULT_COORDS;
  try {
    if (!(await requestPermission())) return DEFAULT_COORDS;
    const position = await Location.getLastKnownPositionAsync({ maxAge: LAST_LOCATION_MAX_AGE_MS })
      ?? await getCurrentPosition();
    return { lat: position.coords.latitude, lng: position.coords.longitude };
  } catch {
    return DEFAULT_COORDS;
  }
}
