import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold', color: Colors.textPrimary },
  link: { marginTop: 15, paddingVertical: 15 },
  linkText: { fontSize: 14, color: Colors.accent },
});
