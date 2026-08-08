import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingVertical: 20 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.border },
  active: { backgroundColor: Colors.accent, width: 22 },
});
