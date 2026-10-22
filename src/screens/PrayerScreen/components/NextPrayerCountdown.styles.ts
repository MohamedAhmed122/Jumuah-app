import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  card: {
    backgroundColor: colors.surfaceElevated, borderColor: colors.accent, borderWidth: 1,
    borderRadius: 16, alignItems: 'center', paddingVertical: 20, marginBottom: 16,
  },
  label: { fontSize: 12, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  prayer: { fontSize: 22, fontWeight: '700', color: colors.textPrimary, marginTop: 4 },
  timer: { fontSize: 38, fontWeight: '200', color: colors.accent, letterSpacing: 2, marginTop: 6 },
}));
