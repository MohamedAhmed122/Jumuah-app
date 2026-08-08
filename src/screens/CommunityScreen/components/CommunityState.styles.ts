import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 32 },
  listCentered: { alignItems: 'center', justifyContent: 'center', gap: 12, padding: 48 },
  loading: { color: Colors.textSecondary, fontSize: 14 },
  error: { color: Colors.textSecondary, fontSize: 15, textAlign: 'center' },
  icon: {
    width: 68, height: 68, borderRadius: 34, alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.accent + '18', borderWidth: 1, borderColor: Colors.accent + '44',
  },
  title: { fontSize: 19, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' },
  text: { color: Colors.textSecondary, fontSize: 14, lineHeight: 20, textAlign: 'center' },
  button: {
    marginTop: 4, paddingHorizontal: 24, paddingVertical: 11,
    borderRadius: 20, backgroundColor: Colors.accent,
  },
  buttonText: { color: Colors.background, fontWeight: '700', fontSize: 14 },
});
