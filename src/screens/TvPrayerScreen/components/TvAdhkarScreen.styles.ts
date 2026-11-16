import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  header: { alignItems: 'center', flexDirection: 'row', gap: 40, justifyContent: 'space-between' },
  headerLeft: { alignItems: 'center', flexDirection: 'row', flexShrink: 1, gap: 20 },
  icon: { alignItems: 'center', backgroundColor: colors.selectedFill, borderRadius: 42, height: 84, justifyContent: 'center', width: 84 },
  screen: { backgroundColor: colors.background, flex: 1, gap: 28, paddingBottom: 52, paddingHorizontal: 72, paddingTop: 48 },
  stage: { borderRadius: 40, flexGrow: 1, overflow: 'hidden', width: 1776 },
  subtitle: { color: colors.textSecondary, fontSize: 26 },
  title: { color: colors.textPrimary, fontSize: 48, fontWeight: '700' },
  titleBlock: { flexShrink: 1, gap: 4 },
}));
