import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  provider: { flex: 1, backgroundColor: Colors.background },
  week: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  content: { flexGrow: 1, paddingBottom: 112 },
  section: {
    color: Colors.textPrimary, backgroundColor: Colors.surfaceElevated,
    paddingTop: 22, paddingBottom: 16, paddingHorizontal: 22,
  },
  sectionGap: { height: 30 },
  todayButton: { backgroundColor: Colors.accent },
});
