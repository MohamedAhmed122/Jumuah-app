import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
