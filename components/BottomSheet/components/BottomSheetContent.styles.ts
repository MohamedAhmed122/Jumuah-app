import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

import { BOTTOM_SHEET_MAX_HEIGHT } from '../BottomSheet.constants';

export const styles = StyleSheet.create({
  handle: {
    alignSelf: 'center',
    backgroundColor: Colors.border,
    borderRadius: 2,
    height: 4,
    marginVertical: 12,
    width: 40,
  },
  scrollContent: { paddingBottom: 36, paddingHorizontal: 20 },
  sheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: BOTTOM_SHEET_MAX_HEIGHT,
  },
});
