import { View } from 'react-native';

import type { JummahServiceViewModel } from '../JummahCard.types';
import { JummahService } from './JummahService';
import { styles } from './JummahServiceList.styles';

export function JummahServiceList({ services }: { services: JummahServiceViewModel[] }) {
  return (
    <View style={styles.list}>
      {services.map((service) => <JummahService key={service.key} service={service} />)}
    </View>
  );
}
