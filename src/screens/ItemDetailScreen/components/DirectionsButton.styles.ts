import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  row: { marginTop: 4 },
  button: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    paddingVertical: 14, borderRadius: 14, backgroundColor: Colors.accent,
  },
  text: { color: Colors.background, fontSize: 15, fontWeight: '700' },
});
