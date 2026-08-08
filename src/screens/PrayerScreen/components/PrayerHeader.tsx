import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@constants/Colors';
import type { HijriDate } from '@src/prayer/hijri';
import { styles } from './PrayerHeader.styles';

interface Props { hijriDate: HijriDate; gregorianDate: string }

export function PrayerHeader({ hijriDate, gregorianDate }: Props) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.hijri}>{hijriDate.day} {hijriDate.monthName} {hijriDate.year}</Text>
        <Text style={styles.gregorian}>{gregorianDate}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => router.push('/qibla')} style={styles.button}>
          <MaterialCommunityIcons name="compass" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/calendar')} style={styles.button}>
          <MaterialCommunityIcons name="calendar-month" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
