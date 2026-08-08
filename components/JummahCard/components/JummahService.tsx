import { Text, View } from 'react-native';

import type { JummahServiceViewModel } from '../JummahCard.types';
import { styles } from './JummahService.styles';

export function JummahService({ service }: { service: JummahServiceViewModel }) {
  return (
    <View style={styles.service}>
      <Text style={styles.label}>{service.label}</Text>
      <Text style={styles.time}>{service.time}</Text>
    </View>
  );
}
