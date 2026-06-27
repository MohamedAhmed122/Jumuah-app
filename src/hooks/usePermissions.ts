import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { Linking } from 'react-native';

export const usePermissions = () => {
  const requestLocation = async (): Promise<boolean> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  };

  const requestNotifications = async (): Promise<boolean> => {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  };

  const openAppSettings = () => {
    Linking.openSettings();
  };

  const getLocationStatus = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status;
  };

  const getNotificationStatus = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    return status;
  };

  return {
    requestLocation,
    requestNotifications,
    openAppSettings,
    getLocationStatus,
    getNotificationStatus,
  };
};
