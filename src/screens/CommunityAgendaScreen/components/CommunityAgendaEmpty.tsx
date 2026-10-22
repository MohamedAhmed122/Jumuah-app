import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './CommunityAgendaEmpty.styles';

export function CommunityAgendaEmpty({ t }: { t: TFunction }) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  return <View style={styles.container}><MaterialCommunityIcons name="calendar-blank-outline" size={42} color={colors.border} /><Text style={styles.text}>{t('community.no_agenda_items')}</Text></View>;
}
