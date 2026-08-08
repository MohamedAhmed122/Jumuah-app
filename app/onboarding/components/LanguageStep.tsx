import { Text, TouchableOpacity, View } from 'react-native';
import { APP_LANGUAGES, LANGUAGE_LABELS } from '@src/i18n/languages';
import type { LanguageStepProps } from '../OnboardingScreen.types';
import { splitLanguageLabel } from '../OnboardingScreen.utils';
import { OnboardingButton } from './OnboardingButton';
import { stepStyles, styles } from './LanguageStep.styles';

export function LanguageStep({ selected, onSelect, onNext, t }: LanguageStepProps) {
  return (
    <View style={stepStyles.step}>
      <Text style={stepStyles.title}>{t('onboarding.select_language')}</Text>
      <View style={styles.row}>
        {APP_LANGUAGES.map((language) => {
          const { flag, label } = splitLanguageLabel(LANGUAGE_LABELS[language]);
          const active = selected === language;
          return (
            <TouchableOpacity
              key={language}
              style={[styles.card, active && styles.cardActive]}
              onPress={() => onSelect(language)}
              activeOpacity={0.8}
            >
              <Text style={styles.flag}>{flag}</Text>
              <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <OnboardingButton label={t('onboarding.get_started')} onPress={onNext} />
    </View>
  );
}
