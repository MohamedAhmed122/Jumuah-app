import { View } from 'react-native';
import { TOTAL_STEPS } from '../OnboardingScreen.constants';
import { styles } from './ProgressDots.styles';

interface Props { activeStep: number }

export function ProgressDots({ activeStep }: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
        <View key={index} style={[styles.dot, index === activeStep && styles.active]} />
      ))}
    </View>
  );
}
