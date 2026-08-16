import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  hero: { width, height: width * 0.66 },
  placeholder: { width, height: width * 0.66, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.surface },
});
