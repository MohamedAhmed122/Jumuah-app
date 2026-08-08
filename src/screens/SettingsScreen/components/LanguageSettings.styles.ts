import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10, padding: 12 },
  button: {
    flex: 1, paddingVertical: 10, borderRadius: 10,
    borderWidth: 1.5, borderColor: Colors.border, alignItems: 'center',
  },
  buttonActive: { borderColor: Colors.accent, backgroundColor: Colors.surfaceElevated },
  text: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  textActive: { color: Colors.textPrimary },
});
