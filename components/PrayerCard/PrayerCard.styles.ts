import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  activeIndicator: {
    backgroundColor: colors.accent,
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
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardActive: { backgroundColor: colors.surfaceElevated, borderColor: colors.accent },
  cardNext: { borderColor: colors.accentSoft },
}));
