import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import type { AnnouncementLocationProps } from '../AnnouncementDetailScreen.types';
import { styles } from './AnnouncementLocation.styles';

interface Props extends AnnouncementLocationProps { endDate?: string; t: TFunction }

export function AnnouncementLocation(props: Props) {
  const { locationType, outsideAddress, mosqueName, endDate, t } = props;
  const location = locationType === 'outside' ? outsideAddress : mosqueName || t('community.at_mosque');
  return (
    <>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name={locationType === 'outside' ? 'map-marker-outline' : 'mosque'}
          size={18}
          color={Colors.accentSoft}
        />
        <Text style={styles.text}>{location}</Text>
      </View>
      {!!endDate && <Text style={styles.endDate}>{t('community.ends_on', { date: endDate })}</Text>}
    </>
  );
}
