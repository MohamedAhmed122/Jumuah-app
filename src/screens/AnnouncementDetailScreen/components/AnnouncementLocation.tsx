import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import type { AnnouncementLocationProps } from '../AnnouncementDetailScreen.types';
import { themedStyles } from './AnnouncementLocation.styles';

interface Props extends AnnouncementLocationProps { endDate?: string; t: TFunction }

export function AnnouncementLocation(props: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  const { locationType, outsideAddress, mosqueName, endDate, t } = props;
  const location = locationType === 'outside' ? outsideAddress : mosqueName || t('community.at_mosque');
  return (
    <>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name={locationType === 'outside' ? 'map-marker-outline' : 'mosque'}
          size={18}
          color={colors.accentSoft}
        />
        <Text style={styles.text}>{location}</Text>
      </View>
      {!!endDate && <Text style={styles.endDate}>{t('community.ends_on', { date: endDate })}</Text>}
    </>
  );
}
