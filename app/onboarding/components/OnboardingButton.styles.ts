import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  primary: {
    width: '100%', backgroundColor: Colors.accent, borderRadius: 14,
    paddingVertical: 16, alignItems: 'center', marginTop: 8,
  },
  primaryText: { fontSize: 16, fontWeight: '700', color: Colors.background },
  secondary: { paddingVertical: 14, marginTop: 4 },
  secondaryText: { fontSize: 15, color: Colors.textSecondary },
});
