import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  card: {
    backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 28, borderWidth: 2,
    flex: 1, gap: 16, paddingHorizontal: 28, paddingVertical: 30,
  },
  cardNext: { backgroundColor: colors.surfaceElevated, borderColor: colors.accent, borderWidth: 4 },
  cardPassed: { opacity: 0.55 },
  group: { gap: 2 },
  label: { color: colors.textSecondary, fontSize: 22, fontWeight: '500', letterSpacing: 2, textTransform: 'uppercase' },
  name: { color: colors.textPrimary, fontSize: 40, fontWeight: '700' },
  nameNext: { color: colors.accent },
  primary: { color: colors.textPrimary, fontSize: 68, fontVariant: ['tabular-nums'], fontWeight: '700', lineHeight: 76 },
  secondary: { color: colors.textPrimary, fontSize: 48, fontVariant: ['tabular-nums'], fontWeight: '500', lineHeight: 54 },
  secondaryGroup: { borderTopColor: colors.border, borderTopWidth: 2, gap: 2, paddingTop: 16 },
}));
