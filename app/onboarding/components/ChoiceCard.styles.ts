import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  row: { width: '100%', gap: 12, marginVertical: 32 },
  card: {
    backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border,
    borderRadius: 16, paddingVertical: 18, paddingHorizontal: 18, alignItems: 'center', gap: 8,
  },
  cardActive: { borderColor: colors.accent, backgroundColor: colors.surfaceElevated },
  label: { fontSize: 17, fontWeight: '600', color: colors.textSecondary },
  labelActive: { color: colors.textPrimary },
}));
