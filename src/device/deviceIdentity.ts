import * as SecureStore from 'expo-secure-store';

const DEVICE_ID_KEY = 'pushDeviceId';

export async function getDeviceId(): Promise<string> {
  const stored = await SecureStore.getItemAsync(DEVICE_ID_KEY);
  if (stored) return stored;

  const generated = `device-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
  await SecureStore.setItemAsync(DEVICE_ID_KEY, generated);
  return generated;
}

export function deleteDeviceId() {
  return SecureStore.deleteItemAsync(DEVICE_ID_KEY);
}
