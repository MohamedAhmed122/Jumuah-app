import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { PRICE_MAX } from '../HalalPlacesScreen.constants';

export const createPositionStyle = (low: number, high: number) => {
  const lowPercent = (low / PRICE_MAX) * 100;
  const highPercent = (high / PRICE_MAX) * 100;
  return StyleSheet.create({
    fill: { left: `${lowPercent}%`, width: `${highPercent - lowPercent}%` },
    low: { left: `${lowPercent}%`, transform: [{ translateX: -18 }] },
    high: { left: `${highPercent}%`, transform: [{ translateX: -18 }] },
  });
};

export const styles = StyleSheet.create({
  wrap: { height: 54, marginHorizontal: 10, marginTop: 10, justifyContent: 'center' },
  track: { height: 5, borderRadius: 3, backgroundColor: Colors.border },
  fill: { position: 'absolute', height: 5, borderRadius: 3, backgroundColor: Colors.accent },
  touch: { position: 'absolute', width: 36, height: 48, alignItems: 'center', justifyContent: 'center' },
  thumb: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.accent,
    borderWidth: 3, borderColor: Colors.surface,
  },
});
