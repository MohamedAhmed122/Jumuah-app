import { Text, View } from 'react-native';
import { useThemedStyles } from '@src/hooks/useTheme';
import { percentWidth } from './TvProgress.styles';
import { themedStyles } from './TvProgressFooter.styles';

interface Props {
  keys: string[];
  index: number;
  progressPercent: number;
  counter: string;
}

export function TvProgressFooter({ keys, index, progressPercent, counter }: Props) {
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.footer}>
      <View style={styles.dots}>
        {keys.map((key, position) => (
          <View key={key} style={[styles.dot, position === index && styles.dotActive]} />
        ))}
      </View>
      <View style={styles.right}>
        <View style={styles.track}>
          <View style={[styles.bar, percentWidth(progressPercent)]} />
        </View>
        <Text style={styles.counter}>{counter}</Text>
      </View>
    </View>
  );
}
