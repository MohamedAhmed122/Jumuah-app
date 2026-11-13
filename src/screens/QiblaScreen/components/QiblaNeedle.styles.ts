import { createThemedStyles } from '@src/theme';

import { NEEDLE_LENGTH } from '../QiblaScreen.constants';

export const themedStyles = createThemedStyles((colors) => ({
  body: {
    borderLeftColor: 'transparent',
    borderLeftWidth: 6,
    borderRightColor: 'transparent',
    borderRightWidth: 6,
    borderTopColor: colors.surfaceElevated,
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
    borderBottomColor: colors.accent,
    borderBottomWidth: NEEDLE_LENGTH,
    borderLeftColor: 'transparent',
    borderLeftWidth: 6,
    borderRightColor: 'transparent',
    borderRightWidth: 6,
    height: 0,
    width: 0,
  },
}));
