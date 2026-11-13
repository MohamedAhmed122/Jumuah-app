import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

import { ROSE_SIZE } from '../QiblaScreen.constants';

export const themedStyles = createThemedStyles((colors) => ({
  cardinal: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '700',
  },
  cardinalContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    width: ROSE_SIZE,
  },
  cardinalNorth: { color: colors.accent },
  rose: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: ROSE_SIZE / 2,
    borderWidth: 2,
    height: ROSE_SIZE,
    justifyContent: 'center',
    position: 'absolute',
    width: ROSE_SIZE,
  },
  tick: {
    backgroundColor: colors.border,
    height: 10,
    position: 'absolute',
    top: 2,
    transformOrigin: `0.5px ${ROSE_SIZE / 2 - 2}px`,
    width: 1,
  },
  tickMajor: { backgroundColor: colors.textSecondary, height: 14 },
  tickMid: { backgroundColor: colors.border, height: 10 },
  tickMinor: { height: 6, opacity: 0.5 },
}));

export const cardinalRotationStyles = Array.from({ length: 4 }, (_, index) =>
  StyleSheet.create({ rotation: { transform: [{ rotate: `${index * 90}deg` }] } }).rotation,
);

export const tickRotationStyles = Array.from({ length: 72 }, (_, index) =>
  StyleSheet.create({ rotation: { transform: [{ rotate: `${index * 5}deg` }] } }).rotation,
);
