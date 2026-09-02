import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 18, paddingTop: 12, paddingBottom: 14,
  },
  eyebrow: {
    color: Colors.accent, fontSize: 11, fontWeight: '700', letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: { color: Colors.textPrimary, fontSize: 27, fontWeight: '800', marginTop: 2 },
  cityButton: {
    maxWidth: 165, flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 1,
    borderColor: Colors.border, borderRadius: 20, paddingHorizontal: 11, paddingVertical: 8,
    backgroundColor: Colors.surface,
  },
  cityButtonText: { flexShrink: 1, color: Colors.textPrimary, fontSize: 12, fontWeight: '600' },
});
