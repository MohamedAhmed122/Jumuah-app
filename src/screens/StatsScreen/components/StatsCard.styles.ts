import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface, borderRadius: 16, borderWidth: 1,
    borderColor: Colors.border, padding: 16, marginBottom: 14,
  },
  title: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary, marginBottom: 14 },
});
