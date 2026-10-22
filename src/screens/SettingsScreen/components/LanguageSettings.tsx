import type { TFunction } from 'i18next';
import { APP_LANGUAGES, LANGUAGE_LABELS, type AppLanguage } from '@src/i18n/languages';
import { SettingsChoiceRow } from './SettingsChoiceRow';
import { SettingsSection } from './SettingsSection';

interface Props { selected: AppLanguage; onSelect: (language: AppLanguage) => void; t: TFunction }

const LANGUAGE_CHOICES = APP_LANGUAGES.map((language) => ({ label: LANGUAGE_LABELS[language], value: language }));

export function LanguageSettings({ selected, onSelect, t }: Props) {
  return (
    <SettingsSection label={t('settings.language')}>
      <SettingsChoiceRow choices={LANGUAGE_CHOICES} selected={selected} onSelect={onSelect} />
    </SettingsSection>
  );
}
