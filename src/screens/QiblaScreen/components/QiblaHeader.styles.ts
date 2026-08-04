import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
    padding: 16,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 32,
  },
});
