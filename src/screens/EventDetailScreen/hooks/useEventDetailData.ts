import { useCallback, useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { fetchEventById, joinEvent, leaveEvent, type CommunityEvent } from '@src/api/events';
import { fetchLocationBundle } from '@src/api/locations';
import { getDeviceId } from '@src/device/deviceIdentity';
import { useSettingsStore } from '@src/stores/settingsStore';
import type { EventRouteParams } from '../EventDetailScreen.types';

export function useEventDetailData() {
  const { id, mosqueId } = useLocalSearchParams<EventRouteParams>();
  const language = useSettingsStore((state) => state.appLanguage);
  const [event, setEvent] = useState<CommunityEvent | null>(null);
  const [mosqueName, setMosqueName] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id || !mosqueId) return setError(true);
    void (async () => {
      try {
        const deviceId = await getDeviceId();
        const [response, locations] = await Promise.all([
          fetchEventById(id, mosqueId, language, deviceId), fetchLocationBundle(),
        ]);
        setEvent(response.data);
        const locationId = response.data.locationMosqueId ?? mosqueId;
        setMosqueName(locations.mosques.find((mosque) => mosque.id === locationId)?.name ?? '');
      } catch { setError(true); } finally { setLoading(false); }
    })();
  }, [id, language, mosqueId]);

  const updateAttendance = useCallback(async (join: boolean) => {
    if (!event || !id || !mosqueId) return;
    setUpdating(true);
    try {
      const deviceId = await getDeviceId();
      const response = join ? await joinEvent(id, deviceId, language, mosqueId) : await leaveEvent(id, deviceId);
      setEvent({ ...event, ...response.data });
    } catch { setError(true); } finally { setUpdating(false); }
  }, [event, id, language, mosqueId]);

  return { event, mosqueName, loading, updating, error, join: () => updateAttendance(true), leave: () => updateAttendance(false) };
}
