import { Dimensions, StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

const width = Dimensions.get('window').width;

export const themedStyles = createThemedStyles((colors) => ({
  hero: { width, height: width * 0.66 },
  placeholder: { width, height: width * 0.66, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
}));
