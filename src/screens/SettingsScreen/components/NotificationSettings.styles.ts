import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16,
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  headerLeft: { flex: 1 },
  headerRight: { width: 70, textAlign: 'center', fontSize: 11, color: colors.textSecondary },
  row: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16,
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  label: { flex: 1, fontSize: 15, color: colors.textPrimary },
}));
