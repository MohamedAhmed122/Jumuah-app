import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  container: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  tabs: { flex: 1, flexDirection: 'row', padding: 3, borderRadius: 12, backgroundColor: colors.surface },
  tab: { flex: 1, minHeight: 36, paddingHorizontal: 8, alignItems: 'center', justifyContent: 'center', borderRadius: 9 },
  tabActive: { backgroundColor: colors.surfaceElevated },
  tabText: { fontSize: 12, color: colors.textSecondary, fontWeight: '600' },
  tabTextActive: { color: colors.textPrimary, fontWeight: '800' },
  filter: { minWidth: 64, minHeight: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3, borderWidth: 1, borderColor: colors.border, borderRadius: 12, backgroundColor: colors.surface },
  count: { color: colors.textPrimary, fontSize: 12, fontWeight: '800' },
}));
