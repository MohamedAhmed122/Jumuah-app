import { Pressable, Text, View } from 'react-native';
import { useThemedStyles } from '@src/hooks/useTheme';
import type { StepProps } from '../OnboardingScreen.types';
import { OnboardingButton } from './OnboardingButton';
import { themedStepStyles, themedStyles } from './WelcomeStep.styles';

interface Props extends StepProps { onNext: () => void; onPrivacyPress: () => void }

export function WelcomeStep({ onNext, onPrivacyPress, t }: Props) {
  const stepStyles = useThemedStyles(themedStepStyles);
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={stepStyles.step}>
      <View style={styles.content}>
        <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
        <Text style={styles.appName}>{t('onboarding.app_name')}</Text>
        <Text style={styles.appNameSub}>{t('onboarding.app_name_sub')}</Text>
        <Text style={styles.subtitle}>{t('onboarding.welcome_subtitle')}</Text>
      </View>
      <OnboardingButton label={t('onboarding.get_started')} onPress={onNext} />
      <Pressable onPress={onPrivacyPress} hitSlop={12}>
        <Text style={styles.privacyLink}>{t('onboarding.privacy_link')}</Text>
      </Pressable>
    </View>
  );
}
