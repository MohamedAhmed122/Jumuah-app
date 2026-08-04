import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  text: { fontSize: 12, color: Colors.textSecondary },
});
