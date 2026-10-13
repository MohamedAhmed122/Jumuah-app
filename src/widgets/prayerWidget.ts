import { NativeModules, Platform } from 'react-native';
import type { AppLanguage } from '@src/i18n/languages';
import type { PrayerName } from '@constants/prayerMethods';

export interface PrayerWidgetScheduleEntry {
  at: string;
  label: string;
  name: PrayerName | 'jummah';
}

interface PrayerWidgetSnapshot {
  prayerName: PrayerName | 'jummah';
  prayerLabel: string;
  nextPrayerAt: string;
  previousPrayerAt: string | null;
  progress: number;
  language: AppLanguage;
  schedule: PrayerWidgetScheduleEntry[];
}

interface PrayerWidgetDataModule {
  updatePrayerWidgetData: (snapshotJson: string) => Promise<void>;
}

const nativeModule = NativeModules.PrayerWidgetData as PrayerWidgetDataModule | undefined;

export async function updatePrayerWidget(snapshot: PrayerWidgetSnapshot): Promise<void> {
  if (!nativeModule || (Platform.OS !== 'ios' && Platform.OS !== 'android')) return;

  try {
    await nativeModule.updatePrayerWidgetData(JSON.stringify({
      ...snapshot,
      progress: Math.max(0, Math.min(1, snapshot.progress)),
      updatedAt: new Date().toISOString(),
    }));
  } catch {
    return;
  }
}
