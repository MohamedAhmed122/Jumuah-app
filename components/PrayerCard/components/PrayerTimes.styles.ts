import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  iqamaBlock: { borderLeftColor: Colors.border, borderLeftWidth: 1, paddingLeft: 12 },
  iqamaTime: { color: Colors.accentSoft, fontSize: 18, fontWeight: '700' },
  label: {
    color: Colors.textSecondary,
    fontSize: 9,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  row: { alignItems: 'flex-end', flexDirection: 'row', gap: 18, marginTop: 8 },
  time: { color: Colors.textSecondary, fontSize: 22, fontWeight: '700' },
  timeActive: { color: Colors.accent },
});
