import * as Location from 'expo-location';
import { Accelerometer, Magnetometer } from 'expo-sensors';

import { HEADING_SMOOTHING, SENSOR_UPDATE_INTERVAL } from '../QiblaScreen.constants';
import type { CompassReading, HeadingCorrection, HeadingSubscription, SensorVector } from '../QiblaScreen.types';
import { headingDeclination, normalizeHeading, rotationHeading, smoothHeading } from '../QiblaScreen.utils';

type HeadingListener = (reading: CompassReading) => void;
type CorrectionListener = (correction: HeadingCorrection) => void;

async function sensorsAvailable(): Promise<boolean> {
  const [accelerometer, magnetometer] = await Promise.all([
    Accelerometer.isAvailableAsync(),
    Magnetometer.isAvailableAsync(),
  ]);
  return accelerometer && magnetometer;
}

async function watchHeadingCorrection(onCorrection: CorrectionListener): Promise<HeadingSubscription | null> {
  try {
    return await Location.watchHeadingAsync((heading) => {
      onCorrection({
        accuracy: heading.accuracy,
        declination: headingDeclination(heading.trueHeading, heading.magHeading),
      });
    });
  } catch {
    return null;
  }
}

export async function watchRotationHeading(
  onReading: HeadingListener,
  applyDeclination: boolean,
): Promise<HeadingSubscription | null> {
  if (!(await sensorsAvailable())) return null;

  let gravity: SensorVector | null = null;
  let magneticHeading: number | null = null;
  let declination = 0;
  let accuracy: number | null = null;

  const correction = applyDeclination
    ? await watchHeadingCorrection((update) => {
        declination = update.declination ?? declination;
        accuracy = update.accuracy;
      })
    : null;

  Accelerometer.setUpdateInterval(SENSOR_UPDATE_INTERVAL);
  Magnetometer.setUpdateInterval(SENSOR_UPDATE_INTERVAL);
  const accelerometer = Accelerometer.addListener((reading) => {
    gravity = reading;
  });
  const magnetometer = Magnetometer.addListener((magnetic) => {
    if (!gravity) return;
    const heading = rotationHeading(gravity, magnetic);
    if (heading === null) return;
    magneticHeading = smoothHeading(magneticHeading, heading, HEADING_SMOOTHING);
    onReading({ heading: normalizeHeading(magneticHeading + declination), accuracy });
  });

  return {
    remove: () => {
      accelerometer.remove();
      magnetometer.remove();
      correction?.remove();
    },
  };
}
