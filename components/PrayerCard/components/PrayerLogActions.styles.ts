import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  missedButton: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.error,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  missedText: { color: colors.error, fontSize: 13, fontWeight: '600' },
  prayedButton: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  prayedText: { color: colors.onAccent, fontSize: 13, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 8 },
}));
