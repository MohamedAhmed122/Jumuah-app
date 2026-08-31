import { Stack } from 'expo-router';

import { MODAL_SCREEN_OPTIONS, ROOT_STACK_OPTIONS } from '../RootLayout.constants';

export function RootNavigator() {
  return (
    <Stack screenOptions={ROOT_STACK_OPTIONS}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="onboarding/index" />
      <Stack.Screen name="qibla" options={MODAL_SCREEN_OPTIONS} />
      <Stack.Screen name="calendar" options={MODAL_SCREEN_OPTIONS} />
      <Stack.Screen name="tracker" options={MODAL_SCREEN_OPTIONS} />
      <Stack.Screen name="qada" options={MODAL_SCREEN_OPTIONS} />
      <Stack.Screen name="stats" options={MODAL_SCREEN_OPTIONS} />
      <Stack.Screen name="privacy" options={MODAL_SCREEN_OPTIONS} />
      <Stack.Screen name="quiz-results" options={MODAL_SCREEN_OPTIONS} />
      <Stack.Screen name="announcement/[id]" />
      <Stack.Screen name="item/[type]/[id]" />
    </Stack>
  );
}
