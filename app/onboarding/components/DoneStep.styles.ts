import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { styles as stepStyles } from './OnboardingStep.styles';

export { stepStyles };
export const styles = StyleSheet.create({
  checkCircle: {
    width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.accent,
    alignItems: 'center', justifyContent: 'center', marginBottom: 28, marginTop: 16,
  },
  teaser: {
    backgroundColor: Colors.surface, borderColor: Colors.border, borderWidth: 1,
    borderRadius: 16, paddingVertical: 20, paddingHorizontal: 28,
    alignItems: 'center', marginBottom: 32, gap: 4,
  },
  teaserLabel: { fontSize: 13, color: Colors.textSecondary },
  teaserPrayer: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  teaserTime: { fontSize: 17, color: Colors.accent },
});
