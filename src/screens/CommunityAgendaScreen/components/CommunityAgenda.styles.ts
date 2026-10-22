import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  provider: { flex: 1, backgroundColor: colors.background },
  week: { borderBottomWidth: 1, borderBottomColor: colors.border },
  content: { flexGrow: 1, paddingBottom: 112 },
  section: {
    color: colors.textPrimary, backgroundColor: colors.surfaceElevated,
    paddingTop: 22, paddingBottom: 16, paddingHorizontal: 22,
  },
  sectionGap: { height: 30 },
  todayButton: { backgroundColor: colors.accent },
}));
