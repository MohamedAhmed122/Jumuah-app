import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: 1,
    flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 14,
    paddingHorizontal: 20,
  },
  title: { color: colors.textPrimary, fontSize: 22, fontWeight: '700' },
  close: {
    alignItems: 'center', backgroundColor: colors.surfaceElevated,
    borderRadius: 20, height: 40, justifyContent: 'center', width: 40,
  },
  scroll: { padding: 20, paddingBottom: 48 },
}));
