import { Text, View } from 'react-native';

import { useThemedStyles } from '@src/hooks/useTheme';
import type { JummahServiceViewModel } from '../JummahCard.types';
import { themedStyles } from './JummahService.styles';

export function JummahService({ service }: { service: JummahServiceViewModel }) {
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={styles.service}>
      <Text style={styles.label}>{service.label}</Text>
      <Text style={styles.time}>{service.time}</Text>
    </View>
  );
}
