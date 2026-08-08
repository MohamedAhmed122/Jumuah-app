import { View } from 'react-native';

import type { QadaPrayerViewModel } from '../QadaScreen.types';
import { QadaPrayerRow } from './QadaPrayerRow';
import { styles } from './QadaPrayerList.styles';

export function QadaPrayerList({ prayers }: { prayers: QadaPrayerViewModel[] }) {
  return (
    <View style={styles.list}>
      {prayers.map((prayer) => <QadaPrayerRow key={prayer.prayer} prayer={prayer} />)}
    </View>
  );
}
