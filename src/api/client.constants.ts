import { Platform } from 'react-native';

export const LOCAL_API_BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:4000/api'
  : 'http://localhost:4000/api';

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? LOCAL_API_BASE_URL;
