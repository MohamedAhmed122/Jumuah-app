import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const createEventScreenStyles = (top: number, bottom: number) => StyleSheet.create({
  container: { paddingTop: top },
  scroll: { paddingBottom: bottom + 32 },
});

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, gap: 14 },
  divider: { height: 1, backgroundColor: Colors.border },
  paragraph: { color: Colors.textSecondary, fontSize: 15, lineHeight: 23 },
});
