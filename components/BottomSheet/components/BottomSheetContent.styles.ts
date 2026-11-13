import { createThemedStyles } from '@src/theme';

import { BOTTOM_SHEET_MAX_HEIGHT } from '../BottomSheet.constants';

export const themedStyles = createThemedStyles((colors) => ({
  handle: {
    alignSelf: 'center',
    backgroundColor: colors.border,
    borderRadius: 2,
    height: 4,
    marginVertical: 12,
    width: 40,
  },
  scrollContent: { paddingBottom: 36, paddingHorizontal: 20 },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: BOTTOM_SHEET_MAX_HEIGHT,
  },
}));
