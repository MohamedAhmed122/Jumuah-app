import 'react-native-reanimated';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';

import '@src/db';
import '@src/i18n';

void SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
