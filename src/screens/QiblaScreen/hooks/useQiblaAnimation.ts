import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { ROTATION_DURATION } from '../QiblaScreen.constants';
import { continuousRotation } from '../QiblaScreen.utils';

export function useQiblaAnimation(heading: number, qiblaBearing: number) {
  const compassRotation = useSharedValue(0);
  const needleRotation = useSharedValue(qiblaBearing);

  useEffect(() => {
    const compassTarget = continuousRotation(compassRotation.value, -heading);
    const needleTarget = continuousRotation(needleRotation.value, qiblaBearing - heading);
    compassRotation.value = withTiming(compassTarget, { duration: ROTATION_DURATION });
    needleRotation.value = withTiming(needleTarget, { duration: ROTATION_DURATION });
  }, [compassRotation, heading, needleRotation, qiblaBearing]);

  const compassStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${compassRotation.value}deg` }],
  }));
  const needleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${needleRotation.value}deg` }],
  }));

  return { compassStyle, needleStyle };
}
