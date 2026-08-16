import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import { styles } from './CommunityAgendaEmpty.styles';

export function CommunityAgendaEmpty({ t }: { t: TFunction }) {
  return <View style={styles.container}><MaterialCommunityIcons name="calendar-blank-outline" size={42} color={Colors.border} /><Text style={styles.text}>{t('community.no_agenda_items')}</Text></View>;
}
