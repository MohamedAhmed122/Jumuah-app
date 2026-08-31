import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  header: { marginBottom: 24 },
  backButton: { alignSelf: 'flex-start', paddingVertical: 16 },
  title: { color: Colors.textPrimary, fontSize: 28, fontWeight: '700', marginTop: 12 },
  subtitle: { color: Colors.textSecondary, fontSize: 14, lineHeight: 21, marginTop: 8 },
});
