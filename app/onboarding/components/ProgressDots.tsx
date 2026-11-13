import { View } from 'react-native';
import { useThemedStyles } from '@src/hooks/useTheme';
import { TOTAL_STEPS } from '../OnboardingScreen.constants';
import { themedStyles } from './ProgressDots.styles';

interface Props { activeStep: number }

export function ProgressDots({ activeStep }: Props) {
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={styles.container}>
      {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
        <View key={index} style={[styles.dot, index === activeStep && styles.active]} />
      ))}
    </View>
  );
}
