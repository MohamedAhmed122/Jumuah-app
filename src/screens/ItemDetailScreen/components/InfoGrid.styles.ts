import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  grid: { gap: 10 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12,
    paddingHorizontal: 14, borderRadius: 12, backgroundColor: Colors.surface,
    borderWidth: 1, borderColor: Colors.border,
  },
  text: { flex: 1, color: Colors.textPrimary, fontSize: 14 },
});
