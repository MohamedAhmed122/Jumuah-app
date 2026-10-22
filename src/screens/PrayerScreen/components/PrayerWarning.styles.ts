import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  container: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.surfaceElevated,
    borderColor: colors.accentSoft, borderWidth: 1, borderRadius: 12,
    padding: 14, marginBottom: 14, gap: 12,
  },
  text: { flex: 1 },
  title: { fontSize: 13, fontWeight: '700', color: colors.accentSoft, marginBottom: 2 },
  body: { fontSize: 12, color: colors.textSecondary, lineHeight: 17 },
}));
