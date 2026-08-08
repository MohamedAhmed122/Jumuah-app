import { Text, View } from 'react-native';

import { styles } from './SensorWarning.styles';

interface SensorWarningProps {
  message: string;
}

export function SensorWarning({ message }: SensorWarningProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
