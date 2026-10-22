import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import type { HijriDate } from '@src/prayer/hijri';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './PrayerHeader.styles';

interface Props { hijriDate: HijriDate; gregorianDate: string }

export function PrayerHeader({ hijriDate, gregorianDate }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.hijri}>{hijriDate.day} {hijriDate.monthName} {hijriDate.year}</Text>
        <Text style={styles.gregorian}>{gregorianDate}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => router.push('/qibla')} style={styles.button}>
          <MaterialCommunityIcons name="compass" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/calendar')} style={styles.button}>
          <MaterialCommunityIcons name="calendar-month" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
