import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  banner: {
    alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 28, borderWidth: 2,
    flexDirection: 'row', gap: 20, justifyContent: 'center', paddingHorizontal: 40, paddingVertical: 26,
  },
  bannerText: { color: colors.textPrimary, fontSize: 42, fontWeight: '500' },
  bar: { backgroundColor: colors.accent, borderRadius: 9, height: 18 },
  center: { alignItems: 'center', flexGrow: 1, gap: 4, justifyContent: 'center' },
  clock: { color: colors.textPrimary, fontSize: 72, fontVariant: ['tabular-nums'], fontWeight: '700' },
  clockRow: { alignItems: 'baseline', flexDirection: 'row' },
  clockSeconds: { color: colors.textSecondary, fontSize: 34, fontVariant: ['tabular-nums'] },
  countdown: { color: colors.accent, fontSize: 340, fontVariant: ['tabular-nums'], fontWeight: '900', lineHeight: 360 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  iqamaIn: { color: colors.textPrimary, fontSize: 72, fontWeight: '700', letterSpacing: 4, textTransform: 'uppercase' },
  iqamaTime: { color: colors.textSecondary, fontSize: 40, fontVariant: ['tabular-nums'], marginTop: 16 },
  mosque: { color: colors.textPrimary, flexShrink: 1, fontSize: 40, fontWeight: '700' },
  prayerLine: { color: colors.textSecondary, fontSize: 56, fontVariant: ['tabular-nums'], fontWeight: '500' },
  screen: { backgroundColor: colors.background, flex: 1, paddingBottom: 72, paddingHorizontal: 72, paddingTop: 56 },
  track: { backgroundColor: colors.surface, borderRadius: 9, height: 18, marginTop: 36, overflow: 'hidden', width: 1200 },
}));
