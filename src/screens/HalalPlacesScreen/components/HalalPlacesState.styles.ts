import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 32 },
  text: { color: colors.textSecondary, textAlign: 'center' },
  retry: { backgroundColor: colors.accent, paddingHorizontal: 22, paddingVertical: 10, borderRadius: 20 },
  retryText: { color: colors.onAccent, fontWeight: '700' },
  empty: { alignItems: 'center', justifyContent: 'center', gap: 8, paddingTop: 80 },
  emptyTitle: { color: colors.textPrimary, fontSize: 17, fontWeight: '700' },
  emptyBody: { color: colors.textSecondary, fontSize: 13 },
}));
