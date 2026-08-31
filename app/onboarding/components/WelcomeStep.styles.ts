import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { styles as stepStyles } from './OnboardingStep.styles';

export { stepStyles };
export const styles = StyleSheet.create({
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  bismillah: { fontSize: 28, color: Colors.accent, textAlign: 'center', marginBottom: 8, lineHeight: 44 },
  appName: { fontSize: 32, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' },
  appNameSub: {
    fontSize: 20, fontWeight: '300', color: Colors.accentSoft,
    letterSpacing: 4, textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 15, color: Colors.textSecondary, textAlign: 'center',
    marginTop: 8, lineHeight: 22,
  },
  privacyLink: {
    fontSize: 13, color: Colors.accentSoft, textAlign: 'center',
    textDecorationLine: 'underline', marginTop: 16,
  },
});
