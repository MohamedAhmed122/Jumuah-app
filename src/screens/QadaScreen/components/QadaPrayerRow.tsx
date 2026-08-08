import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '@constants/Colors';

import type { QadaPrayerViewModel } from '../QadaScreen.types';
import { styles } from './QadaPrayerRow.styles';

export function QadaPrayerRow({ prayer }: { prayer: QadaPrayerViewModel }) {
  return (
    <View style={styles.row}>
      <Text style={styles.prayerName}>{prayer.label}</Text>
      <View style={styles.controls}>
        <TouchableOpacity
          disabled={prayer.decrementDisabled}
          onPress={prayer.onDecrement}
          style={[styles.button, prayer.decrementDisabled && styles.buttonDisabled]}
        >
          <MaterialCommunityIcons
            color={prayer.decrementDisabled ? Colors.border : Colors.error}
            name="minus"
            size={20}
          />
        </TouchableOpacity>
        <Text style={styles.count}>{prayer.count}</Text>
        <TouchableOpacity onPress={prayer.onIncrement} style={styles.button}>
          <MaterialCommunityIcons name="plus" size={20} color={Colors.accent} />
        </TouchableOpacity>
      </View>
      <Text style={styles.outstanding}>{prayer.outstandingLabel}</Text>
    </View>
  );
}
