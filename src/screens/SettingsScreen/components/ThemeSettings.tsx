import type { TFunction } from 'i18next';
import { THEME_PREFERENCES, type ThemePreference } from '@src/theme';
import { SettingsChoiceRow } from './SettingsChoiceRow';
import { SettingsSection } from './SettingsSection';

interface Props { selected: ThemePreference; onSelect: (preference: ThemePreference) => void; t: TFunction }

export function ThemeSettings({ selected, onSelect, t }: Props) {
  const choices = THEME_PREFERENCES.map((preference) => ({ label: t(`settings.theme_${preference}`), value: preference }));
  return (
    <SettingsSection label={t('settings.theme')}>
      <SettingsChoiceRow choices={choices} selected={selected} onSelect={onSelect} />
    </SettingsSection>
  );
}
