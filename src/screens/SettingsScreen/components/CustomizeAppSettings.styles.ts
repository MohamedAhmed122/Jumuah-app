import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  row: {
    alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: 1,
    flexDirection: 'row', minHeight: 54, paddingHorizontal: 16,
  },
  lastRow: { borderBottomWidth: 0 },
  label: { color: colors.textPrimary, flex: 1, fontSize: 15 },
  toggleFrame: { height: 31, justifyContent: 'center', width: 51 },
  toggle: { left: 0, position: 'absolute', top: 0 },
}));
