import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  cards: { flexDirection: 'row', gap: 24 },
  center: { alignItems: 'center', flexGrow: 1, gap: 8, justifyContent: 'center' },
  clock: { color: colors.textPrimary, fontSize: 104, fontVariant: ['tabular-nums'], fontWeight: '700', lineHeight: 112 },
  clockRow: { alignItems: 'baseline', flexDirection: 'row' },
  clockSeconds: { color: colors.textSecondary, fontSize: 44, fontVariant: ['tabular-nums'], fontWeight: '500' },
  dateLine: { color: colors.textSecondary, fontSize: 28 },
  header: { alignItems: 'flex-start', flexDirection: 'row', gap: 40, justifyContent: 'space-between' },
  headerLeft: { flexShrink: 1, gap: 10 },
  headerRight: { alignItems: 'center', flexDirection: 'row', gap: 32 },
  menuButton: {
    alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 44,
    borderWidth: 2, flexDirection: 'row', gap: 14, height: 88, paddingHorizontal: 36,
  },
  menuLabel: { color: colors.textPrimary, fontSize: 34, fontWeight: '500' },
  mosqueLine: { color: colors.textPrimary, fontSize: 44, fontWeight: '700' },
  nextCountdown: { color: colors.textPrimary, fontSize: 64, fontVariant: ['tabular-nums'], fontWeight: '500' },
  nextLabel: { color: colors.textSecondary, fontSize: 34, fontWeight: '500', letterSpacing: 3, textTransform: 'uppercase' },
  nextName: { color: colors.accent, fontSize: 150, fontWeight: '900', lineHeight: 158 },
  offline: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  offlineText: { color: colors.textSecondary, fontSize: 24 },
  screen: { flex: 1, gap: 40, paddingBottom: 72, paddingHorizontal: 72, paddingTop: 56 },
}));
