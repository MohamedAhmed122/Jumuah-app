import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import type { ThemeStepProps } from '../OnboardingScreen.types';
import { THEME_CHOICES } from '../OnboardingScreen.constants';
import { ChoiceCard } from './ChoiceCard';
import { themedStyles as themedChoiceStyles } from './ChoiceCard.styles';
import { OnboardingButton } from './OnboardingButton';
import { themedStyles as themedStepStyles } from './OnboardingStep.styles';

export function ThemeStep({ selected, onSelect, onNext, t }: ThemeStepProps) {
  const stepStyles = useThemedStyles(themedStepStyles);
  const choiceStyles = useThemedStyles(themedChoiceStyles);
  const colors = useThemeColors();
  return (
    <View style={stepStyles.step}>
      <Text style={stepStyles.title}>{t('onboarding.select_theme')}</Text>
      <Text style={stepStyles.body}>{t('onboarding.select_theme_body')}</Text>
      <View style={choiceStyles.row}>
        {THEME_CHOICES.map((choice) => {
          const active = selected === choice.theme;
          return (
            <ChoiceCard key={choice.theme} active={active} label={t(`settings.theme_${choice.theme}`)} onPress={() => onSelect(choice.theme)}>
              <MaterialCommunityIcons name={choice.icon} size={40} color={active ? colors.accent : colors.textSecondary} />
            </ChoiceCard>
          );
        })}
      </View>
      <OnboardingButton label={t('onboarding.get_started')} onPress={onNext} />
    </View>
  );
}
