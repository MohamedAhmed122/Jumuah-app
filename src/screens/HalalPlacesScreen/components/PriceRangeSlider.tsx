import { useMemo, useRef, useState } from 'react';
import { PanResponder, View } from 'react-native';
import { PRICE_MAX, PRICE_MIN } from '../HalalPlacesScreen.constants';
import { createPositionStyle, styles } from './PriceRangeSlider.styles';

interface Props { low: number; high: number; onChange: (low: number, high: number) => void }

export function PriceRangeSlider({ low, high, onChange }: Props) {
  const [width, setWidth] = useState(1);
  const lowStart = useRef(low);
  const highStart = useRef(high);
  const lowResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => { lowStart.current = low; },
    onPanResponderMove: (_event, gesture) => {
      const next = Math.max(PRICE_MIN, Math.min(high - 1, Math.round(lowStart.current + (gesture.dx / width) * PRICE_MAX)));
      onChange(next, high);
    },
  }), [high, low, onChange, width]);
  const highResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => { highStart.current = high; },
    onPanResponderMove: (_event, gesture) => {
      const next = Math.min(PRICE_MAX, Math.max(low + 1, Math.round(highStart.current + (gesture.dx / width) * PRICE_MAX)));
      onChange(low, next);
    },
  }), [high, low, onChange, width]);
  const positions = createPositionStyle(low, high);

  return (
    <View style={styles.wrap} onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
      <View style={styles.track} />
      <View style={[styles.fill, positions.fill]} />
      <View {...lowResponder.panHandlers} style={[styles.touch, positions.low]} accessibilityRole="adjustable" accessibilityLabel={`Minimum price €${low}`}>
        <View style={styles.thumb} />
      </View>
      <View {...highResponder.panHandlers} style={[styles.touch, positions.high]} accessibilityRole="adjustable" accessibilityLabel={`Maximum price €${high}`}>
        <View style={styles.thumb} />
      </View>
    </View>
  );
}
