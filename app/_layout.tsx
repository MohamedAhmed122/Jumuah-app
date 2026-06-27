import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import * as Notifications from 'expo-notifications';

import '../src/i18n';
import i18n from '@src/i18n';
import { useSettingsStore } from '@src/stores/settingsStore';
import '@src/db'; // runs CREATE TABLE IF NOT EXISTS on import

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  const { hydrated, onboardingComplete, appLanguage, hydrate } = useSettingsStore();

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    i18n.changeLanguage(appLanguage);
    SplashScreen.hideAsync();
    if (!onboardingComplete) {
      router.replace('/onboarding');
    }
  }, [hydrated, onboardingComplete, appLanguage]);

  if (!hydrated) return null;

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="onboarding/index" />
          <Stack.Screen name="qibla" options={{ presentation: 'modal' }} />
          <Stack.Screen name="calendar" options={{ presentation: 'modal' }} />
          <Stack.Screen name="tracker" options={{ presentation: 'modal' }} />
          <Stack.Screen name="qada" options={{ presentation: 'modal' }} />
          <Stack.Screen name="stats" options={{ presentation: 'modal' }} />
          <Stack.Screen name="quiz-results" options={{ presentation: 'modal' }} />
          <Stack.Screen name="announcement/[id]" />
          <Stack.Screen name="item/[type]/[id]" />
        </Stack>
      </SafeAreaProvider>
    </I18nextProvider>
  );
}
