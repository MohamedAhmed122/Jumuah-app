import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  button: {
    position: 'absolute', right: 18, bottom: 18, width: 58, height: 58,
    alignItems: 'center', justifyContent: 'center', borderRadius: 29,
    backgroundColor: Colors.accent, borderWidth: 3, borderColor: Colors.background,
    shadowColor: '#000000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3,
    shadowRadius: 7, elevation: 8,
  },
});
