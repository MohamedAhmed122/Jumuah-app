import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '@constants/Colors';

import { styles } from './MonthNavigator.styles';

interface MonthNavigatorProps {
  gregorianMonth: string;
  hijriMonth: string;
  onNext: () => void;
  onPrevious: () => void;
}

export function MonthNavigator(props: MonthNavigatorProps) {
  return (
    <View style={styles.navigation}>
      <TouchableOpacity hitSlop={12} onPress={props.onPrevious}>
        <MaterialCommunityIcons name="chevron-left" size={28} color={Colors.textPrimary} />
      </TouchableOpacity>
      <View style={styles.labels}>
        <Text style={styles.gregorian}>{props.gregorianMonth}</Text>
        <Text style={styles.hijri}>{props.hijriMonth}</Text>
      </View>
      <TouchableOpacity hitSlop={12} onPress={props.onNext}>
        <MaterialCommunityIcons name="chevron-right" size={28} color={Colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}
