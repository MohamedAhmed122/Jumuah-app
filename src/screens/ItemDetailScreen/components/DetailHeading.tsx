import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import type { DetailItem, ItemType } from '../ItemDetailScreen.types';
import { createStatusStyles, styles } from './DetailHeading.styles';

interface Props { item: DetailItem; type?: ItemType; openStatus: boolean | null; t: TFunction }

export function DetailHeading({ item, type, openStatus, t }: Props) {
  const statusStyles = createStatusStyles(openStatus === true);
  return (
    <View style={styles.container}>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.address}</Text>
      </View>
      {type === 'halal' && openStatus !== null && (
        <View style={[styles.statusPill, statusStyles.pill]}>
          <Text style={[styles.statusText, statusStyles.text]}>
            {openStatus ? t('map.open_now') : t('map.closed')}
          </Text>
        </View>
      )}
    </View>
  );
}
