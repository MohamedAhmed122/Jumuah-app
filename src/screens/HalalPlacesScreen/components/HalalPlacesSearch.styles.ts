import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  row: { flexDirection: 'row', paddingHorizontal: 16, gap: 10, marginBottom: 15 },
  box: {
    flex: 1, height: 50, borderRadius: 15, borderWidth: 1, borderColor: colors.border,
    backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, gap: 9,
  },
  input: { flex: 1, color: colors.textPrimary, fontSize: 14, paddingVertical: 0 },
  filterButton: {
    width: 50, height: 50, borderRadius: 15, backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  filterDot: {
    position: 'absolute', right: 7, top: 7, width: 8, height: 8, borderRadius: 4,
    backgroundColor: colors.error, borderWidth: 1, borderColor: colors.background,
  },
}));
