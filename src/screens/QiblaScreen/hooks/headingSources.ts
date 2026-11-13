import { Platform } from 'react-native';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';

import { SENSOR_UPDATE_INTERVAL } from '../QiblaScreen.constants';
import type { CompassReading, HeadingSubscription } from '../QiblaScreen.types';
import { magnetometerHeading } from '../QiblaScreen.utils';
import { watchRotationHeading } from './rotationHeading';

type HeadingListener = (reading: CompassReading) => void;

export async function hasLocationPermission(): Promise<boolean> {
  const { status } = await Location.getForegroundPermissionsAsync();
  return status === 'granted';
}

export async function watchFusedHeading(onReading: HeadingListener): Promise<HeadingSubscription | null> {
  try {
    return await Location.watchHeadingAsync((heading) => {
      const value = heading.trueHeading >= 0 ? heading.trueHeading : heading.magHeading;
      onReading({ heading: value, accuracy: heading.accuracy });
    });
  } catch {
    return null;
  }
}

export async function watchMagnetometerHeading(onReading: HeadingListener): Promise<HeadingSubscription | null> {
  if (!(await Magnetometer.isAvailableAsync())) return null;
  Magnetometer.setUpdateInterval(SENSOR_UPDATE_INTERVAL);
  return Magnetometer.addListener(({ x, y }) => {
    onReading({ heading: magnetometerHeading(x, y), accuracy: null });
  });
}

export async function watchHeading(
  locationGranted: boolean,
  onReading: HeadingListener,
): Promise<HeadingSubscription | null> {
  if (Platform.OS === 'android') return watchRotationHeading(onReading, locationGranted);
  const fused = locationGranted ? await watchFusedHeading(onReading) : null;
  return fused ?? watchMagnetometerHeading(onReading);
}
