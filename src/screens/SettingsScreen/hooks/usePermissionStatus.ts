import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

export function usePermissionStatus() {
  const [locationDenied, setLocationDenied] = useState(false);
  const [notificationDenied, setNotificationDenied] = useState(false);

  useEffect(() => {
    void Location.getForegroundPermissionsAsync()
      .then(({ status }) => setLocationDenied(status === 'denied'));
    void Notifications.getPermissionsAsync()
      .then(({ status }) => setNotificationDenied(status === 'denied'));
  }, []);

  return { locationDenied, notificationDenied };
}
