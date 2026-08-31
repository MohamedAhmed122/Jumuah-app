import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.surface, borderColor: Colors.border, borderRadius: 14,
    borderWidth: 1, marginBottom: 12, padding: 18,
  },
  title: { color: Colors.accentSoft, fontSize: 16, fontWeight: '700', marginBottom: 8 },
  body: { color: Colors.textPrimary, fontSize: 14, lineHeight: 21 },
});
