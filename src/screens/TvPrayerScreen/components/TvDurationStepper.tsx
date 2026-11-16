import { Text, View } from 'react-native';
import { useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './TvDurationStepper.styles';
import { TvFocusable } from './TvFocusable';

interface Props {
  enabled: boolean;
  value: string;
  note: string;
  defaultNote: string;
  decreaseLabel: string;
  increaseLabel: string;
  decrease: () => void;
  increase: () => void;
}

export function TvDurationStepper(props: Props) {
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.row}>
      <TvFocusable onPress={props.decrease} disabled={!props.enabled} accessibilityLabel={props.decreaseLabel}>
        <View style={styles.step}><Text style={styles.stepText}>−</Text></View>
      </TvFocusable>
      <View style={styles.value}><Text style={styles.valueText}>{props.value}</Text></View>
      <TvFocusable onPress={props.increase} disabled={!props.enabled} accessibilityLabel={props.increaseLabel}>
        <View style={styles.step}><Text style={styles.stepText}>+</Text></View>
      </TvFocusable>
      <Text style={styles.note}>{`${props.note}\n${props.defaultNote}`}</Text>
    </View>
  );
}
