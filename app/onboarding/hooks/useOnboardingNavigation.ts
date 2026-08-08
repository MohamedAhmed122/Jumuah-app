import { useEffect, useRef, useState } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  TOTAL_STEPS,
  TRANSITION_DISTANCE,
  TRANSITION_DURATION,
  TRANSITION_FADE_DURATION,
  TRANSITION_START_SCALE,
} from '../OnboardingScreen.constants';

export function useOnboardingNavigation() {
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const hasNavigated = useRef(false);
  const pagerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }, { scale: scale.value }],
  }));

  useEffect(() => {
    if (!hasNavigated.current || reduceMotion) return;
    const easing = Easing.out(Easing.cubic);
    translateX.value = withTiming(0, { duration: TRANSITION_DURATION, easing });
    opacity.value = withTiming(1, { duration: TRANSITION_FADE_DURATION, easing });
    scale.value = withTiming(1, { duration: TRANSITION_DURATION, easing });
  }, [opacity, reduceMotion, scale, step, translateX]);

  const goTo = (next: number) => {
    translateX.value = reduceMotion ? 0 : next > step ? TRANSITION_DISTANCE : -TRANSITION_DISTANCE;
    opacity.value = reduceMotion ? 1 : 0;
    scale.value = reduceMotion ? 1 : TRANSITION_START_SCALE;
    hasNavigated.current = true;
    setStep(next);
  };

  const next = () => {
    if (step < TOTAL_STEPS - 1) goTo(step + 1);
  };

  return { step, pagerStyle, goTo, next };
}
