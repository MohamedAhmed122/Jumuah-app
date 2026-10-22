import { createThemedStyles } from '@src/theme';

import { COMPASS_SIZE } from '../QiblaScreen.constants';

export const themedStyles = createThemedStyles((colors) => ({
  centerDot: {
    backgroundColor: colors.accent,
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
}));
