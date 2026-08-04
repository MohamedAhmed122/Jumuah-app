import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  root: { backgroundColor: Colors.background, flex: 1 },
});

export function createSafeAreaStyle(top: number) {
  return StyleSheet.create({ root: { paddingTop: top } }).root;
}
