import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  hero: { width: '100%', height: 220, backgroundColor: colors.surfaceElevated },
  placeholder: {
    width: '100%', height: 220, backgroundColor: colors.surfaceElevated,
    alignItems: 'center', justifyContent: 'center',
  },
}));
