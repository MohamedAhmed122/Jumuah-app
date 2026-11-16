import { useEffect } from 'react';
import { AppState } from 'react-native';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import * as ScreenOrientation from 'expo-screen-orientation';
import { KEEP_AWAKE_TAG } from '../TvPrayerScreen.constants';

function keepScreenAwake() {
  activateKeepAwakeAsync(KEEP_AWAKE_TAG).catch(() => undefined);
}

export function useTvDisplayMode() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).catch(() => undefined);
    keepScreenAwake();
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') keepScreenAwake();
    });
    return () => {
      subscription.remove();
      deactivateKeepAwake(KEEP_AWAKE_TAG).catch(() => undefined);
    };
  }, []);
}
