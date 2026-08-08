import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Colors.surface,
    borderColor: Colors.border, borderWidth: 1, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 10, marginBottom: 14,
  },
  text: { flex: 1 },
  name: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  detail: { fontSize: 11, color: Colors.textSecondary, marginTop: 1 },
});
