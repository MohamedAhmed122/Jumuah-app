import type { StyleProp, ViewStyle } from 'react-native';
import type { AnimatedStyle } from 'react-native-reanimated';

export type CompassRotationStyle = AnimatedStyle<ViewStyle>;

export interface QiblaScreenViewModel {
  bearingLabel: string;
  compassStyle: CompassRotationStyle;
  direction: string;
  displayBearing: number;
  displayQiblaBearing: number;
  onBack: () => void;
  needleStyle: CompassRotationStyle;
  rootStyle: StyleProp<ViewStyle>;
  sensorAvailable: boolean;
  sensorWarning: string;
}
