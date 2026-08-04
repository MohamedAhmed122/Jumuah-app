import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

import { NEEDLE_LENGTH } from '../QiblaScreen.constants';

export const styles = StyleSheet.create({
  body: {
    borderLeftColor: 'transparent',
    borderLeftWidth: 6,
    borderRightColor: 'transparent',
    borderRightWidth: 6,
    borderTopColor: Colors.surfaceElevated,
    borderTopWidth: NEEDLE_LENGTH,
    height: 0,
    width: 0,
  },
  container: {
    alignItems: 'center',
    height: NEEDLE_LENGTH * 2,
    position: 'absolute',
    width: 2,
  },
  icon: { position: 'absolute', top: -36 },
  tip: {
    borderBottomColor: Colors.accent,
    borderBottomWidth: NEEDLE_LENGTH,
    borderLeftColor: 'transparent',
    borderLeftWidth: 6,
    borderRightColor: 'transparent',
    borderRightWidth: 6,
    height: 0,
    width: 0,
  },
});
