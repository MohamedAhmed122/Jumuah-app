import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import { styles } from './CommunityHeader.styles';

interface Props { mosqueName: string; t: TFunction }

export function CommunityHeader({ mosqueName, t }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('community.announcements')}</Text>
      {!!mosqueName && <Text style={styles.mosque}>{mosqueName}</Text>}
    </View>
  );
}
