import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceElevated, borderColor: Colors.accent, borderWidth: 1,
    borderRadius: 16, alignItems: 'center', paddingVertical: 20, marginBottom: 16,
  },
  label: { fontSize: 12, color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  prayer: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, marginTop: 4 },
  timer: { fontSize: 38, fontWeight: '200', color: Colors.accent, letterSpacing: 2, marginTop: 6 },
});
