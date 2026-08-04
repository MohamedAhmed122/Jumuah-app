import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  activeIndicator: {
    backgroundColor: Colors.accent,
    borderBottomLeftRadius: 14,
    borderTopLeftRadius: 14,
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 3,
  },
  card: {
    alignItems: 'stretch',
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardActive: { backgroundColor: Colors.surfaceElevated, borderColor: Colors.accent },
  cardNext: { borderColor: Colors.accentSoft },
});
