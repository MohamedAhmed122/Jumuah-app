import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
  },
});

export function createSafeAreaStyle(top: number, bottom: number) {
  return StyleSheet.create({ root: { paddingBottom: bottom, paddingTop: top } }).root;
}
