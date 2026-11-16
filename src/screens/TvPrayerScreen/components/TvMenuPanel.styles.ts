import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  backdrop: { backgroundColor: 'rgba(0,0,0,0.55)', bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
  closeButton: {
    alignItems: 'center', borderColor: colors.border, borderRadius: 36, borderWidth: 2,
    height: 72, justifyContent: 'center', width: 72,
  },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  hint: { color: colors.textSecondary, fontSize: 22, marginTop: 'auto' },
  mosqueList: { maxHeight: 372 },
  mosqueListContent: { gap: 8 },
  panel: {
    backgroundColor: colors.surface, borderLeftColor: colors.border, borderLeftWidth: 2, bottom: 0, gap: 22,
    paddingHorizontal: 52, paddingVertical: 36, position: 'absolute', right: 0, top: 0, width: 760,
  },
  pairRow: { flexDirection: 'row', gap: 24 },
  row: { flexDirection: 'row', gap: 10 },
  title: { color: colors.textPrimary, fontSize: 52, fontWeight: '700' },
}));
