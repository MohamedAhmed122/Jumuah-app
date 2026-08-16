import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, padding: 28, backgroundColor: Colors.background },
  text: { color: Colors.textSecondary, fontSize: 14, textAlign: 'center' },
});
