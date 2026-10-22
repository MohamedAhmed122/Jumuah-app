import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  container: {
    flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surface,
    borderColor: colors.border, borderWidth: 1, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 10, marginBottom: 14,
  },
  text: { flex: 1 },
  name: { fontSize: 13, fontWeight: '700', color: colors.textPrimary },
  detail: { fontSize: 11, color: colors.textSecondary, marginTop: 1 },
}));
