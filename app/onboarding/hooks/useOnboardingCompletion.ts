import { useState } from 'react';
import { router } from 'expo-router';
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import type { TFunction } from 'i18next';
import { useSettingsStore } from '@src/stores/settingsStore';
import { getNextPrayerTeaser } from '../OnboardingScreen.utils';

interface Args { goTo: (step: number) => void; t: TFunction }

export function useOnboardingCompletion({ goTo, t }: Args) {
  const coordinates = useSettingsStore((state) => state.userCoordinates);
  const completeOnboarding = useSettingsStore((state) => state.completeOnboarding);
  const [nextPrayerLabel, setNextPrayerLabel] = useState('');
  const [nextPrayerTime, setNextPrayerTime] = useState('');
  const checkScale = useSharedValue(0);
  const checkOpacity = useSharedValue(0);
  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
    opacity: checkOpacity.value,
  }));

  const finish = () => {
    goTo(5);
    const teaser = getNextPrayerTeaser(coordinates);
    setNextPrayerLabel(teaser.prayer ? t(`prayer.${teaser.prayer}`) : '');
    setNextPrayerTime(teaser.time);
    checkScale.value = 0;
    checkOpacity.value = 0;
    checkScale.value = withSpring(1, { damping: 12 });
    checkOpacity.value = withTiming(1, { duration: 400 });
  };
  const enterApp = async () => {
    await completeOnboarding();
    router.replace('/(tabs)');
  };

  return { nextPrayerLabel, nextPrayerTime, checkStyle, finish, enterApp };
}
