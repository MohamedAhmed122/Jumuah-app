import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  text: { flex: 1, fontSize: 14, color: Colors.accentSoft, lineHeight: 20 },
  endDate: { fontSize: 12, color: Colors.textSecondary },
});
