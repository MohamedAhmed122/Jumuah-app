import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  clock: { color: colors.textPrimary, fontSize: 72, fontVariant: ['tabular-nums'], fontWeight: '700' },
  clockRow: { alignItems: 'baseline', flexDirection: 'row' },
  clockSeconds: { color: colors.textSecondary, fontSize: 34, fontVariant: ['tabular-nums'] },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  mosque: { color: colors.textPrimary, flexShrink: 1, fontSize: 40, fontWeight: '700' },
}));
