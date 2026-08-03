import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  section: { gap: 12 },
  title: { color: Colors.textPrimary, fontSize: 16, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  pill: {
    paddingHorizontal: 14, paddingVertical: 12, borderRadius: 14,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, minWidth: 130,
  },
  label: { color: Colors.textSecondary, fontSize: 12 },
  time: { marginTop: 4, color: Colors.textPrimary, fontSize: 16, fontWeight: '700' },
});
