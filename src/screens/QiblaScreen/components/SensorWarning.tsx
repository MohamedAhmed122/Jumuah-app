import { Text, View } from 'react-native';

import { useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './SensorWarning.styles';

interface SensorWarningProps {
  message: string;
}

export function SensorWarning({ message }: SensorWarningProps) {
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
