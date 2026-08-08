import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const createRootInset = (top: number) => StyleSheet.create({ inset: { paddingTop: top } }).inset;

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 32 },
});
