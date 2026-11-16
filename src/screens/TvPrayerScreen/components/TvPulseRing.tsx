import { useEffect } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming,
} from 'react-native-reanimated';

interface Props {
  durationMs: number;
  delayMs?: number;
  style: StyleProp<ViewStyle>;
}

export function TvPulseRing({ durationMs, delayMs = 0, style }: Props) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(delayMs, withRepeat(withTiming(1, { duration: durationMs, easing: Easing.out(Easing.ease) }), -1));
    return () => cancelAnimation(progress);
  }, [delayMs, durationMs, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.7 * (1 - progress.value),
    transform: [{ scale: 0.75 + progress.value * 0.95 }],
  }));

  return <Animated.View style={[style, animatedStyle]} />;
}
