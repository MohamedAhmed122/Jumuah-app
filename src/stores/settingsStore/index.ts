import { create } from 'zustand';

import { createSettingsActions } from './settingsStore.actions';
import { DEFAULT_SETTINGS } from './settingsStore.constants';
import type { SettingsState } from './settingsStore.types';

export { TV_ANNOUNCEMENT_SECONDS } from './settingsStore.constants';

export type {
  AppVisibility, Coordinates, NotificationToggles, NotificationType, SettingsData,
} from './settingsStore.types';

export const useSettingsStore = create<SettingsState>((set, get) => ({
  ...DEFAULT_SETTINGS,
  ...createSettingsActions(set, get),
}));
