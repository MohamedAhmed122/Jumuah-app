import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  container: {
    alignSelf: 'stretch',
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    gap: 10,
  },
  message: { color: colors.textSecondary, fontSize: 14 },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  buttonText: { color: colors.onAccent, fontWeight: '600', fontSize: 13 },
}));
