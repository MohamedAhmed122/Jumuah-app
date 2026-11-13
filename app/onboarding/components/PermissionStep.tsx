import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import type { ComponentProps } from 'react';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import type { ActionStepProps } from '../OnboardingScreen.types';
import { OnboardingButton } from './OnboardingButton';
import { themedStyles } from './OnboardingStep.styles';

interface Props extends ActionStepProps {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  titleKey: string;
  bodyKey: string;
  allowKey: string;
  skipKey: string;
}

export function PermissionStep(props: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  const { icon, titleKey, bodyKey, allowKey, skipKey, onAllow, onSkip, t } = props;
  return (
    <View style={styles.step}>
      <MaterialCommunityIcons name={icon} size={64} color={colors.accent} style={styles.icon} />
      <Text style={styles.title}>{t(titleKey)}</Text>
      <Text style={styles.body}>{t(bodyKey)}</Text>
      <OnboardingButton label={t(allowKey)} onPress={onAllow} />
      <OnboardingButton label={t(skipKey)} onPress={onSkip} variant="secondary" />
    </View>
  );
}
