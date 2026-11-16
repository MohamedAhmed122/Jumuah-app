import { useTranslation } from 'react-i18next';
import type { Mosque } from '@src/api/locations';
import { useThemeName } from '@src/hooks/useTheme';
import { TV_ANNOUNCEMENT_SECONDS, useSettingsStore } from '@src/stores/settingsStore';
import { TV_LANGUAGES } from '../TvPrayerScreen.constants';

export type TvMenuOptions = ReturnType<typeof useTvMenuOptions>;

export function useTvMenuOptions(mosques: Mosque[]) {
  const { t } = useTranslation();
  const themeName = useThemeName();
  const settings = useSettingsStore();
  const seconds = settings.tvAnnouncementSeconds;
  const step = TV_ANNOUNCEMENT_SECONDS.step;

  return {
    t,
    languages: TV_LANGUAGES.map(({ language, label }) => ({
      id: language, label, selected: language === settings.appLanguage,
      onPress: () => { void settings.setLanguage(language); },
    })),
    mosques: mosques.map((mosque) => ({
      id: mosque.id, label: mosque.name, sub: mosque.city, selected: mosque.id === settings.preferredMosqueId,
      onPress: () => { void settings.setPreferredMosque(mosque.id); },
    })),
    themes: (['dark', 'light'] as const).map((theme) => ({
      id: theme, label: t(`tv.${theme}`), selected: theme === themeName,
      onPress: () => { void settings.setThemePreference(theme); },
    })),
    announcements: ([false, true] as const).map((enabled) => ({
      id: enabled ? 'on' : 'off', label: t(enabled ? 'tv.on' : 'tv.off'),
      selected: enabled === settings.tvAnnouncementsEnabled,
      onPress: () => { void settings.setTvAnnouncementsEnabled(enabled); },
    })),
    duration: {
      enabled: settings.tvAnnouncementsEnabled,
      value: t('tv.seconds_value', { seconds }),
      note: t('tv.per_announcement'),
      defaultNote: t('tv.default_seconds', { seconds: TV_ANNOUNCEMENT_SECONDS.default }),
      decreaseLabel: t('tv.decrease_seconds', { seconds: step }),
      increaseLabel: t('tv.increase_seconds', { seconds: step }),
      decrease: () => { void settings.setTvAnnouncementSeconds(seconds - step); },
      increase: () => { void settings.setTvAnnouncementSeconds(seconds + step); },
    },
  };
}
