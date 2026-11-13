import { View } from 'react-native';

import { useThemedStyles } from '@src/hooks/useTheme';
import { TrackerHeader } from './components/TrackerHeader';
import { TrackerList } from './components/TrackerList';
import { useTrackerScreen } from './hooks/TrackerScreen.hooks';
import { themedStyles } from './TrackerScreen.styles';

export default function TrackerScreen() {
  const styles = useThemedStyles(themedStyles);
  const screen = useTrackerScreen();

  return (
    <View style={[styles.root, screen.rootStyle]}>
      <TrackerHeader onBack={screen.onBack} title={screen.title} />
      <TrackerList days={screen.days} onToggle={screen.onToggle} />
    </View>
  );
}
