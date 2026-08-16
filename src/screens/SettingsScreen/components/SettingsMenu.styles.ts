import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  row: {
    alignItems: 'center', flexDirection: 'row', gap: 14,
    minHeight: 58, paddingHorizontal: 16,
  },
  divider: { borderBottomColor: Colors.border, borderBottomWidth: 1 },
  copy: { flex: 1 },
  title: { color: Colors.textPrimary, fontSize: 16, fontWeight: '600' },
  description: { color: Colors.textSecondary, fontSize: 12, marginTop: 3 },
});
