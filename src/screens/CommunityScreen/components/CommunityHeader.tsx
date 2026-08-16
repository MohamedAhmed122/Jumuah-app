import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import { styles } from './CommunityHeader.styles';

interface Props { city: string; t: TFunction }

export function CommunityHeader({ city, t }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('community.title')}</Text>
      {!!city && <Text style={styles.mosque}>{city}</Text>}
    </View>
  );
}
