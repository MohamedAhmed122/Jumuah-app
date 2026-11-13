import { createThemedStyles } from '@src/theme';

import { HERO_HEIGHT, HERO_WIDTH } from '../AnnouncementDetailScreen.constants';

export const themedStyles = createThemedStyles((colors) => ({
  hero: { width: HERO_WIDTH, height: HERO_HEIGHT },
  placeholder: {
    width: HERO_WIDTH, height: HERO_HEIGHT, backgroundColor: colors.surfaceElevated,
    alignItems: 'center', justifyContent: 'center',
  },
}));
