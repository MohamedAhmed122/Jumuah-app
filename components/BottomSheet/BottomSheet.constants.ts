import { Dimensions } from 'react-native';

export const BOTTOM_SHEET_MAX_HEIGHT = Dimensions.get('window').height * 0.75;
export const BOTTOM_SHEET_CLOSE_DURATION = 260;
export const BOTTOM_SHEET_SPRING_CONFIG = { damping: 18, stiffness: 100 } as const;
