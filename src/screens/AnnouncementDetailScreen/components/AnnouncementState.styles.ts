import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 32 },
  error: { color: Colors.textSecondary, fontSize: 15, textAlign: 'center' },
  button: {
    marginTop: 4, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20,
    backgroundColor: Colors.surfaceElevated, borderWidth: 1, borderColor: Colors.border,
  },
  buttonText: { color: Colors.textPrimary, fontWeight: '600', fontSize: 14 },
});
