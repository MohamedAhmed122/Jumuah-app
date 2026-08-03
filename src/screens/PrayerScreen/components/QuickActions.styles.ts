import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 10, marginTop: 8 },
  button: {
    flex: 1, backgroundColor: Colors.surface, borderColor: Colors.border, borderWidth: 1,
    borderRadius: 12, alignItems: 'center', paddingVertical: 14, gap: 6,
  },
  label: { fontSize: 11, color: Colors.textSecondary, textAlign: 'center' },
});
