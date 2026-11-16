import { useEffect, useRef, useState } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ANNOUNCEMENT_CARD_WIDTH, SLIDE_TRANSITION_MS } from '../TvPrayerScreen.constants';

export function useSlideTransition(index: number) {
  const progress = useSharedValue(1);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const shown = useRef(index);

  useEffect(() => {
    if (shown.current === index) return;
    setPreviousIndex(shown.current);
    shown.current = index;
    progress.value = 0;
    progress.value = withTiming(1, { duration: SLIDE_TRANSITION_MS, easing: Easing.bezier(0.4, 0, 0.2, 1) });
  }, [index, progress]);

  const incomingStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (progress.value - 1) * ANNOUNCEMENT_CARD_WIDTH }],
  }));
  const outgoingStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * ANNOUNCEMENT_CARD_WIDTH }],
  }));

  return { previousIndex, incomingStyle, outgoingStyle };
}
