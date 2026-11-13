import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  container: {
    height: 40,
    paddingHorizontal: 12,
    justifyContent: "center",
    // backgroundColor: colors.surface,
  },
  back: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: colors.surfaceElevated,
  },
}));
