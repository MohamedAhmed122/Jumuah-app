import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { styles as stepStyles } from './OnboardingStep.styles';

export { stepStyles };
export const styles = StyleSheet.create({
  row: { width: '100%', gap: 12, marginVertical: 32 },
  card: {
    backgroundColor: Colors.surface, borderWidth: 1.5, borderColor: Colors.border,
    borderRadius: 16, paddingVertical: 18, paddingHorizontal: 18, alignItems: 'center', gap: 8,
  },
  cardActive: { borderColor: Colors.accent, backgroundColor: Colors.surfaceElevated },
  flag: { fontSize: 40 },
  label: { fontSize: 17, fontWeight: '600', color: Colors.textSecondary },
  labelActive: { color: Colors.textPrimary },
});
