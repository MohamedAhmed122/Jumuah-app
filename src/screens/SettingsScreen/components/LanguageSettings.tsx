import { Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { APP_LANGUAGES, LANGUAGE_LABELS, type AppLanguage } from '@src/i18n/languages';
import { SettingsSection } from './SettingsSection';
import { styles } from './LanguageSettings.styles';

interface Props { selected: AppLanguage; onSelect: (language: AppLanguage) => void; t: TFunction }

export function LanguageSettings({ selected, onSelect, t }: Props) {
  return (
    <SettingsSection label={t('settings.language')}>
      <View style={styles.row}>
        {APP_LANGUAGES.map((language) => (
          <TouchableOpacity
            key={language}
            style={[styles.button, selected === language && styles.buttonActive]}
            onPress={() => onSelect(language)}
          >
            <Text style={[styles.text, selected === language && styles.textActive]}>
              {LANGUAGE_LABELS[language]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SettingsSection>
  );
}
