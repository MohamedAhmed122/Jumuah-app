import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import { QUICK_ACTIONS } from '../PrayerScreen.constants';
import { styles } from './QuickActions.styles';

export function QuickActions({ t }: { t: TFunction }) {
  return (
    <View style={styles.container}>
      {QUICK_ACTIONS.map(({ route, icon, labelKey }) => (
        <TouchableOpacity key={route} style={styles.button} onPress={() => router.push(route)}>
          <MaterialCommunityIcons name={icon} size={22} color={Colors.accent} />
          <Text style={styles.label}>{t(labelKey)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
