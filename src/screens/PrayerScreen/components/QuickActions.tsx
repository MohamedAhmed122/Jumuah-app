import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import { QUICK_ACTIONS } from '../PrayerScreen.constants';
import type { AppVisibility } from '@src/stores/settingsStore';
import { styles } from './QuickActions.styles';

interface Props { t: TFunction; visibility: AppVisibility }

export function QuickActions({ t, visibility }: Props) {
  const actions = QUICK_ACTIONS.filter(({ visibilityKey }) => !visibilityKey || visibility[visibilityKey]);
  return (
    <View style={styles.container}>
      {actions.map(({ route, icon, labelKey }) => (
        <TouchableOpacity key={route} style={styles.button} onPress={() => router.push(route)}>
          <MaterialCommunityIcons name={icon} size={22} color={Colors.accent} />
          <Text style={styles.label}>{t(labelKey)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
