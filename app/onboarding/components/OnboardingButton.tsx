import { Text, TouchableOpacity } from 'react-native';
import { styles } from './OnboardingButton.styles';

interface Props { label: string; onPress: () => void; variant?: 'primary' | 'secondary' }

export function OnboardingButton({ label, onPress, variant = 'primary' }: Props) {
  if (variant === 'secondary') {
    return (
      <TouchableOpacity style={styles.secondary} onPress={onPress} activeOpacity={0.7}>
        <Text style={styles.secondaryText}>{label}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styles.primary} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.primaryText}>{label}</Text>
    </TouchableOpacity>
  );
}
