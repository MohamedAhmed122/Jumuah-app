import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 14, borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.surface },
  count: { color: Colors.textPrimary, fontSize: 18, fontWeight: '800' },
  label: { color: Colors.textSecondary, fontSize: 11 },
  button: { minWidth: 110, minHeight: 44, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, borderRadius: 12, backgroundColor: Colors.accent },
  joined: { backgroundColor: Colors.accentSoft },
  buttonDisabled: { backgroundColor: Colors.surfaceElevated },
  buttonText: { color: Colors.background, fontSize: 13, fontWeight: '800' },
  disabledText: { color: Colors.textSecondary },
});
