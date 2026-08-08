import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const createTopInset = (top: number) => StyleSheet.create({ inset: { paddingTop: top } }).inset;

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: 16, paddingBottom: 40 },
});
