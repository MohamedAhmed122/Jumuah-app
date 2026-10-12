import type { StyleProp, ViewStyle } from 'react-native';
import type { AnimatedStyle } from 'react-native-reanimated';

export type CompassRotationStyle = AnimatedStyle<ViewStyle>;

export interface CompassReading {
  accuracy: number | null;
  heading: number;
}

export interface HeadingSubscription {
  remove: () => void;
}

export interface QiblaScreenViewModel {
  bearingLabel: string;
  calibrationWarning: string;
  compassStyle: CompassRotationStyle;
  direction: string;
  displayBearing: number;
  displayQiblaBearing: number;
  locationDenied: boolean;
  locationWarning: string;
  needsCalibration: boolean;
  onBack: () => void;
  needleStyle: CompassRotationStyle;
  rootStyle: StyleProp<ViewStyle>;
  sensorAvailable: boolean;
  sensorWarning: string;
}
