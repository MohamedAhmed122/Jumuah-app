import { Text, View } from 'react-native';
import type { StepProps } from '../OnboardingScreen.types';
import { OnboardingButton } from './OnboardingButton';
import { stepStyles, styles } from './WelcomeStep.styles';

interface Props extends StepProps { onNext: () => void }

export function WelcomeStep({ onNext, t }: Props) {
  return (
    <View style={stepStyles.step}>
      <View style={styles.content}>
        <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
        <Text style={styles.appName}>Muslim Community</Text>
        <Text style={styles.appNameSub}>Lithuania</Text>
        <Text style={styles.subtitle}>{t('onboarding.welcome_subtitle')}</Text>
      </View>
      <OnboardingButton label={t('onboarding.get_started')} onPress={onNext} />
    </View>
  );
}
