import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { Magnetometer } from 'expo-sensors';

import { SENSOR_UPDATE_INTERVAL } from '../QiblaScreen.constants';
import { normalizeHeading } from '../QiblaScreen.utils';

export function useMagnetometerHeading() {
  const [heading, setHeading] = useState(0);
  const [sensorAvailable, setSensorAvailable] = useState(true);
  const subscriptionRef = useRef<ReturnType<typeof Magnetometer.addListener> | null>(null);

  useEffect(() => {
    Magnetometer.isAvailableAsync().then((available) => {
      if (!available) {
        setSensorAvailable(false);
        return;
      }

      Magnetometer.setUpdateInterval(SENSOR_UPDATE_INTERVAL);
      subscriptionRef.current = Magnetometer.addListener(({ x, y }) => {
        setHeading(normalizeHeading(x, y, Platform.OS === 'ios'));
      });
    });

    return () => subscriptionRef.current?.remove();
  }, []);

  return { heading, sensorAvailable };
}
