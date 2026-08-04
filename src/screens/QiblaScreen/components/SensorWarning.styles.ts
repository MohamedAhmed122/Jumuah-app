import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 10,
    marginBottom: 24,
    marginHorizontal: 24,
    padding: 12,
  },
  text: {
    color: Colors.error,
    fontSize: 13,
    textAlign: 'center',
  },
});
