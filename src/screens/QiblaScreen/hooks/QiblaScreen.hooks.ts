import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { calculateQiblaBearing, compassDirection } from '@src/prayer/qibla';
import { useSettingsStore } from '@src/stores/settingsStore';

import type { QiblaScreenViewModel } from '../QiblaScreen.types';
import { createSafeAreaStyle } from '../QiblaScreen.styles';
import { getRelativeAngle, needsCalibration } from '../QiblaScreen.utils';
import { useCompassHeading } from './useCompassHeading';
import { useQiblaAnimation } from './useQiblaAnimation';

export function useQiblaScreen(): QiblaScreenViewModel {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const userCoordinates = useSettingsStore((state) => state.userCoordinates);
  const { heading, accuracy, locationDenied, sensorAvailable } = useCompassHeading();
  const qiblaBearing = calculateQiblaBearing(userCoordinates);
  const { compassStyle, needleStyle } = useQiblaAnimation(heading, qiblaBearing);

  return {
    bearingLabel: t('map.qibla_bearing'),
    calibrationWarning: t('errors.compass_calibration'),
    compassStyle,
    direction: compassDirection(qiblaBearing),
    displayBearing: Math.round(getRelativeAngle(qiblaBearing, heading)),
    displayQiblaBearing: Math.round(qiblaBearing),
    locationDenied,
    locationWarning: t('map.qibla_location_banner'),
    needsCalibration: sensorAvailable && needsCalibration(accuracy),
    needleStyle,
    onBack: () => router.back(),
    rootStyle: createSafeAreaStyle(insets.top, insets.bottom),
    sensorAvailable,
    sensorWarning: t('errors.sensor_unavailable'),
  };
}
