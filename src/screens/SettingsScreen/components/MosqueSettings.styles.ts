import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  notice: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  noticeText: { color: Colors.error, fontSize: 13 },
  option: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: 1,
    borderBottomColor: Colors.border, gap: 10,
  },
  optionActive: { backgroundColor: 'rgba(61,214,140,0.07)' },
  optionText: { flex: 1 },
  optionLabel: { fontSize: 15, color: Colors.textSecondary },
  optionLabelActive: { color: Colors.textPrimary, fontWeight: '600' },
  optionSub: { fontSize: 11, color: Colors.textSecondary, marginTop: 2, opacity: 0.75 },
});
