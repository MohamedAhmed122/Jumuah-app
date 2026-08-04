import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

import { COMPASS_SIZE } from '../QiblaScreen.constants';

export const styles = StyleSheet.create({
  centerDot: {
    backgroundColor: Colors.accent,
    borderRadius: 7,
    height: 14,
    position: 'absolute',
    width: 14,
  },
  wrapper: {
    alignItems: 'center',
    height: COMPASS_SIZE,
    justifyContent: 'center',
    width: COMPASS_SIZE,
  },
});
