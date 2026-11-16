import { useEffect } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ALERT_DURATION_MS } from '../TvPrayerScreen.constants';

interface Props {
  remainingMs: number;
  style: StyleProp<ViewStyle>;
}

export function TvTimedFill({ remainingMs, style }: Props) {
  const start = Math.max(0, Math.min(100, (1 - remainingMs / ALERT_DURATION_MS) * 100));
  const width = useSharedValue(start);

  useEffect(() => {
    width.value = withTiming(100, { duration: Math.max(remainingMs, 0), easing: Easing.linear });
    return () => cancelAnimation(width);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ width: `${width.value}%` }));
  return <Animated.View style={[style, animatedStyle]} />;
}
