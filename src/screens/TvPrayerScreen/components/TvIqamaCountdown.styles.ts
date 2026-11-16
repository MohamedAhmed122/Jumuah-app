import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  bar: { backgroundColor: colors.accent, borderRadius: 9, height: 18 },
  center: { alignItems: 'center', flexGrow: 1, gap: 4, justifyContent: 'center' },
  countdown: { color: colors.accent, fontSize: 340, fontVariant: ['tabular-nums'], fontWeight: '900', lineHeight: 360 },
  iqamaIn: { color: colors.textPrimary, fontSize: 72, fontWeight: '700', letterSpacing: 4, textTransform: 'uppercase' },
  iqamaTime: { color: colors.textSecondary, fontSize: 40, fontVariant: ['tabular-nums'], marginTop: 16 },
  prayerLine: { color: colors.textSecondary, fontSize: 56, fontVariant: ['tabular-nums'], fontWeight: '500' },
  screen: { backgroundColor: colors.background, flex: 1, paddingBottom: 72, paddingHorizontal: 72, paddingTop: 56 },
  track: { backgroundColor: colors.surface, borderRadius: 9, height: 18, marginTop: 36, overflow: 'hidden', width: 1200 },
}));
