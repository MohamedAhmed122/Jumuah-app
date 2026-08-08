import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { styles as stepStyles } from './OnboardingStep.styles';

export { stepStyles };
export const styles = StyleSheet.create({
  state: { width: '100%', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 20 },
  loading: { color: Colors.textSecondary, fontSize: 14 },
  error: { color: Colors.error, fontSize: 14, textAlign: 'center' },
  list: { width: '100%', flex: 1, marginBottom: 12 },
  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface,
    borderWidth: 1, borderColor: Colors.border, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, marginBottom: 10, gap: 10,
  },
  rowActive: { borderColor: Colors.accent, backgroundColor: Colors.surfaceElevated },
  rowText: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: Colors.textSecondary, marginBottom: 3 },
  nameActive: { color: Colors.textPrimary },
  address: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
  empty: { color: Colors.textSecondary, textAlign: 'center', paddingVertical: 20 },
});
