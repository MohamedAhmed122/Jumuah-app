import { useState } from 'react';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SCREEN_WIDTH, TOTAL_STEPS } from '../OnboardingScreen.constants';

export function useOnboardingNavigation() {
  const [step, setStep] = useState(0);
  const translateX = useSharedValue(0);
  const pagerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const goTo = (next: number) => {
    translateX.value = next > step ? -SCREEN_WIDTH : SCREEN_WIDTH;
    setStep(next);
    translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
  };

  const next = () => {
    if (step < TOTAL_STEPS - 1) goTo(step + 1);
  };

  return { step, pagerStyle, goTo, next };
}
