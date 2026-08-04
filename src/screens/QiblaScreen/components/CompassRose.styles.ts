import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

import { ROSE_SIZE } from '../QiblaScreen.constants';

export const styles = StyleSheet.create({
  cardinal: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: '700',
  },
  cardinalContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    width: ROSE_SIZE,
  },
  cardinalNorth: { color: Colors.accent },
  rose: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderRadius: ROSE_SIZE / 2,
    borderWidth: 2,
    height: ROSE_SIZE,
    justifyContent: 'center',
    position: 'absolute',
    width: ROSE_SIZE,
  },
  tick: {
    backgroundColor: Colors.border,
    height: 10,
    position: 'absolute',
    top: 2,
    transformOrigin: `0.5px ${ROSE_SIZE / 2 - 2}px`,
    width: 1,
  },
  tickMajor: { backgroundColor: Colors.textSecondary, height: 14 },
  tickMid: { backgroundColor: Colors.border, height: 10 },
  tickMinor: { height: 6, opacity: 0.5 },
});

export const cardinalRotationStyles = Array.from({ length: 4 }, (_, index) =>
  StyleSheet.create({ rotation: { transform: [{ rotate: `${index * 90}deg` }] } }).rotation,
);

export const tickRotationStyles = Array.from({ length: 72 }, (_, index) =>
  StyleSheet.create({ rotation: { transform: [{ rotate: `${index * 5}deg` }] } }).rotation,
);
