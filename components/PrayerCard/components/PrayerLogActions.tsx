import { Text, TouchableOpacity, View } from 'react-native';

import { useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './PrayerLogActions.styles';

interface PrayerLogActionsProps {
  missedLabel: string;
  onMissed: () => void;
  onPrayed: () => void;
  prayedLabel: string;
}

export function PrayerLogActions(props: PrayerLogActionsProps) {
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={props.onPrayed} style={styles.prayedButton}>
        <Text style={styles.prayedText}>{props.prayedLabel}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onMissed} style={styles.missedButton}>
        <Text style={styles.missedText}>{props.missedLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
