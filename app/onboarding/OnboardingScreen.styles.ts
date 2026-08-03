import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const createRootInsets = (top: number, bottom: number) => StyleSheet.create({
  insets: { paddingTop: top, paddingBottom: bottom },
}).insets;

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  pager: { flex: 1 },
});
