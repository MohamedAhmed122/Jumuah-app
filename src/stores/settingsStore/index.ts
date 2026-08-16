import { create } from 'zustand';

import { createSettingsActions } from './settingsStore.actions';
import { DEFAULT_SETTINGS } from './settingsStore.constants';
import type { SettingsState } from './settingsStore.types';

export type { AppVisibility, NotificationToggles } from './settingsStore.types';

export const useSettingsStore = create<SettingsState>((set, get) => ({
  ...DEFAULT_SETTINGS,
  ...createSettingsActions(set, get),
}));
