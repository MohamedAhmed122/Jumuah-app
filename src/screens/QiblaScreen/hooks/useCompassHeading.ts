import { useEffect, useState } from 'react';

import type { CompassReading, HeadingSubscription } from '../QiblaScreen.types';
import { hasLocationPermission, watchHeading } from './headingSources';

export function useCompassHeading() {
  const [reading, setReading] = useState<CompassReading>({ heading: 0, accuracy: null });
  const [sensorAvailable, setSensorAvailable] = useState(true);
  const [locationDenied, setLocationDenied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let subscription: HeadingSubscription | null = null;

    void (async () => {
      const granted = await hasLocationPermission();
      subscription = await watchHeading(granted, setReading);
      if (cancelled) {
        subscription?.remove();
        return;
      }
      setLocationDenied(!granted);
      if (!subscription) setSensorAvailable(false);
    })();

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, []);

  return { heading: reading.heading, accuracy: reading.accuracy, locationDenied, sensorAvailable };
}
