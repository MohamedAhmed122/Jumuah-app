import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  backdrop: { flex: 1, justifyContent: 'flex-end', padding: 16, backgroundColor: '#00000099' },
  sheet: { maxHeight: '72%', padding: 18, gap: 14, borderRadius: 18, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { color: colors.textPrimary, fontSize: 19, fontWeight: '800' },
  city: { color: colors.accentSoft, fontSize: 12, marginTop: 2 },
  row: { minHeight: 58, flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  check: { width: 22, height: 22, alignItems: 'center', justifyContent: 'center', borderRadius: 7, borderWidth: 1, borderColor: colors.border },
  checkActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  copy: { flex: 1 },
  name: { color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  address: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  hint: { color: colors.textSecondary, fontSize: 11, textAlign: 'center' },
}));
