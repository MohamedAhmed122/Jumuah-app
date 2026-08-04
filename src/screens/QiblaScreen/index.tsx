import { View } from 'react-native';

import { BearingInfo } from './components/BearingInfo';
import { Compass } from './components/Compass';
import { QiblaHeader } from './components/QiblaHeader';
import { SensorWarning } from './components/SensorWarning';
import { useQiblaScreen } from './hooks/QiblaScreen.hooks';
import { styles } from './QiblaScreen.styles';

export default function QiblaScreen() {
  const screen = useQiblaScreen();

  return (
    <View style={[styles.root, screen.rootStyle]}>
      <QiblaHeader onBack={screen.onBack} />
      {!screen.sensorAvailable && <SensorWarning message={screen.sensorWarning} />}
      <Compass compassStyle={screen.compassStyle} needleStyle={screen.needleStyle} />
      <BearingInfo
        direction={screen.direction}
        displayBearing={screen.displayBearing}
        displayQiblaBearing={screen.displayQiblaBearing}
        label={screen.bearingLabel}
      />
    </View>
  );
}
