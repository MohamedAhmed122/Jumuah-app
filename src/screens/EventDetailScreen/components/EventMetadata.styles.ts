import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  date: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  dateText: { color: Colors.accent, fontSize: 13, fontWeight: '700' },
  title: { color: Colors.textPrimary, fontSize: 27, lineHeight: 34, fontWeight: '800' },
  location: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  locationText: { flex: 1, color: Colors.accentSoft, fontSize: 14 },
  endDate: { color: Colors.textSecondary, fontSize: 12 },
});
