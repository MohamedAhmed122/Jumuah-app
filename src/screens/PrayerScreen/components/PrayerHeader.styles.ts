import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingHorizontal: 20, paddingVertical: 14,
  },
  hijri: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  gregorian: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  actions: { flexDirection: 'row', gap: 12 },
  button: { padding: 6 },
});
