import { StyleSheet } from 'react-native';
import { createThemedStyles } from '@src/theme';
import { STAGE_HEIGHT, STAGE_WIDTH } from './TvPrayerScreen.constants';

export const themedStyles = createThemedStyles((colors) => ({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    overflow: 'hidden',
  },
}));

export function createStageStyles(width: number, height: number) {
  const scale = width > 0 && height > 0 ? Math.min(width / STAGE_WIDTH, height / STAGE_HEIGHT) : 0;
  return StyleSheet.create({
    stage: {
      height: STAGE_HEIGHT,
      left: (width - STAGE_WIDTH) / 2,
      position: 'absolute',
      top: (height - STAGE_HEIGHT) / 2,
      transform: [{ scale }],
      width: STAGE_WIDTH,
    },
  });
}
