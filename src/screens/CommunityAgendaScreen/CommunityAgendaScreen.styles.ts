import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const createAgendaInset = (top: number) => StyleSheet.create({ inset: { paddingTop: top } }).inset;

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
});
