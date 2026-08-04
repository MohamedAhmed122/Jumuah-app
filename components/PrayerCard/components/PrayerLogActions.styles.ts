import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  missedButton: {
    backgroundColor: Colors.surfaceElevated,
    borderColor: Colors.error,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  missedText: { color: Colors.error, fontSize: 13, fontWeight: '600' },
  prayedButton: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  prayedText: { color: Colors.background, fontSize: 13, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 8 },
});
