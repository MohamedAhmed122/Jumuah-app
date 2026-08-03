import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, View } from 'react-native';
import { Colors } from '@constants/Colors';
import type { ItemType } from '../ItemDetailScreen.types';
import { styles } from './DetailHero.styles';

interface Props { image?: string; type?: ItemType }

export function DetailHero({ image, type }: Props) {
  if (image) return <Image source={{ uri: image }} style={styles.hero} resizeMode="cover" />;
  return (
    <View style={styles.placeholder}>
      <MaterialCommunityIcons
        name={type === 'mosque' ? 'mosque' : 'storefront-outline'}
        size={56}
        color={Colors.border}
      />
    </View>
  );
}
