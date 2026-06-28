import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import * as Notifications from 'expo-notifications';
import { AppState } from 'react-native';

import '../src/i18n';
import i18n from '@src/i18n';
import { syncPushRegistration } from '@src/notifications/pushRegistration';
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
  const { hydrated, onboardingComplete, appLanguage, preferredMosqueId, hydrate } = useSettingsStore();

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

  useEffect(() => {
    if (!hydrated || !onboardingComplete) return;
    const sync = () => void syncPushRegistration(preferredMosqueId, appLanguage);
    sync();
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') sync();
    });
    return () => subscription.remove();
  }, [hydrated, onboardingComplete, preferredMosqueId, appLanguage]);

  useEffect(() => {
    if (!hydrated || !onboardingComplete) return;

    const openAnnouncement = (response: Notifications.NotificationResponse | null) => {
      const data = response?.notification.request.content.data;
      if (data?.type === 'announcement' && typeof data.id === 'string') {
        router.push(`/announcement/${data.id}`);
        Notifications.clearLastNotificationResponse();
      }
    };

    void Notifications.getLastNotificationResponseAsync().then(openAnnouncement);
    const subscription = Notifications.addNotificationResponseReceivedListener(openAnnouncement);
    return () => subscription.remove();
  }, [hydrated, onboardingComplete]);

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
