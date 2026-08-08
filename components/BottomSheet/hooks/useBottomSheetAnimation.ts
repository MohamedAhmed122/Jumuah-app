import { useEffect, useState } from 'react';
import {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  BOTTOM_SHEET_CLOSE_DURATION,
  BOTTOM_SHEET_MAX_HEIGHT,
  BOTTOM_SHEET_SPRING_CONFIG,
} from '../BottomSheet.constants';
import type { BottomSheetAnimation } from '../BottomSheet.types';

export function useBottomSheetAnimation(visible: boolean): BottomSheetAnimation {
  const [isOpen, setIsOpen] = useState(false);
  const translateY = useSharedValue(BOTTOM_SHEET_MAX_HEIGHT);

  useEffect(() => {
    cancelAnimation(translateY);
    if (visible) {
      setIsOpen(true);
      translateY.value = withSpring(0, BOTTOM_SHEET_SPRING_CONFIG);
    } else {
      translateY.value = withTiming(
        BOTTOM_SHEET_MAX_HEIGHT,
        { duration: BOTTOM_SHEET_CLOSE_DURATION },
        (finished) => {
          if (finished) runOnJS(setIsOpen)(false);
        },
      );
    }
  }, [translateY, visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return { animatedStyle, isOpen };
}
