import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const createTopInset = (top: number) => StyleSheet.create({ inset: { paddingTop: top } }).inset;

export const styles = StyleSheet.create({
  root: { backgroundColor: Colors.background, flex: 1 },
  content: { paddingBottom: 40, paddingHorizontal: 20 },
  footer: { color: Colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 8 },
});
