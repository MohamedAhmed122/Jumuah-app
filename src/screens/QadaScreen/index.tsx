import { View } from 'react-native';

import { QadaHeader } from './components/QadaHeader';
import { QadaPrayerList } from './components/QadaPrayerList';
import { QadaTotalCard } from './components/QadaTotalCard';
import { useQadaScreen } from './hooks/QadaScreen.hooks';
import { styles } from './QadaScreen.styles';

export default function QadaScreen() {
  const screen = useQadaScreen();

  return (
    <View style={[styles.root, screen.rootStyle]}>
      <QadaHeader onBack={screen.onBack} title={screen.title} />
      <QadaTotalCard label={screen.totalLabel} total={screen.total} />
      <QadaPrayerList prayers={screen.prayers} />
    </View>
  );
}
