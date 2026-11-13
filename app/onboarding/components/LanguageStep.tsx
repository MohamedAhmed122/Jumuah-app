import { Text, View } from 'react-native';
import { APP_LANGUAGES, LANGUAGE_LABELS } from '@src/i18n/languages';
import { useThemedStyles } from '@src/hooks/useTheme';
import type { LanguageStepProps } from '../OnboardingScreen.types';
import { splitLanguageLabel } from '../OnboardingScreen.utils';
import { ChoiceCard } from './ChoiceCard';
import { OnboardingButton } from './OnboardingButton';
import { themedChoiceStyles, themedStepStyles, themedStyles } from './LanguageStep.styles';

export function LanguageStep({ selected, onSelect, onNext, t }: LanguageStepProps) {
  const stepStyles = useThemedStyles(themedStepStyles);
  const choiceStyles = useThemedStyles(themedChoiceStyles);
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={stepStyles.step}>
      <Text style={stepStyles.title}>{t('onboarding.select_language')}</Text>
      <View style={choiceStyles.row}>
        {APP_LANGUAGES.map((language) => {
          const { flag, label } = splitLanguageLabel(LANGUAGE_LABELS[language]);
          return (
            <ChoiceCard key={language} active={selected === language} label={label} onPress={() => onSelect(language)}>
              <Text style={styles.flag}>{flag}</Text>
            </ChoiceCard>
          );
        })}
      </View>
      <OnboardingButton label={t('onboarding.get_started')} onPress={onNext} />
    </View>
  );
}
