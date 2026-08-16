import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import { styles } from './CommunityState.styles';

interface Props { type: 'mosque' | 'loading' | 'error' | 'empty' | 'emptyEvents'; onAction?: () => void; t: TFunction }

export function CommunityState({ type, onAction, t }: Props) {
  if (type === 'loading') {
    return <View style={styles.centered}><ActivityIndicator color={Colors.accent} size="large" /><Text style={styles.loading}>{t('community.loading')}</Text></View>;
  }
  if (type === 'empty' || type === 'emptyEvents') {
    const events = type === 'emptyEvents';
    return <View style={styles.listCentered}><MaterialCommunityIcons name={events ? 'calendar-blank-outline' : 'bulletin-board'} size={48} color={Colors.border} /><Text style={styles.text}>{t(events ? 'community.no_events' : 'community.no_posts')}</Text></View>;
  }
  if (type === 'error') {
    return <View style={styles.centered}><MaterialCommunityIcons name="wifi-off" size={44} color={Colors.textSecondary} /><Text style={styles.error}>{t('errors.network')}</Text><Action label={t('errors.retry')} onPress={onAction} /></View>;
  }
  return (
    <View style={styles.centered}>
      <View style={styles.icon}><MaterialCommunityIcons name="mosque" size={38} color={Colors.accent} /></View>
      <Text style={styles.title}>{t('community.select_mosque_title')}</Text>
      <Text style={styles.text}>{t('community.select_mosque_body')}</Text>
      <Action label={t('community.select_mosque_action')} onPress={onAction} />
    </View>
  );
}

function Action({ label, onPress }: { label: string; onPress?: () => void }) {
  return <TouchableOpacity style={styles.button} onPress={onPress}><Text style={styles.buttonText}>{label}</Text></TouchableOpacity>;
}
