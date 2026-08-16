import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, View } from 'react-native';
import { Colors } from '@constants/Colors';
import { resolveMediaUrl } from '@src/api/media';
import { styles } from './EventHero.styles';

export function EventHero({ image }: { image?: string }) {
  if (image) return <Image source={{ uri: resolveMediaUrl(image) }} style={styles.hero} resizeMode="cover" />;
  return <View style={styles.placeholder}><MaterialCommunityIcons name="calendar-star" size={48} color={Colors.border} /></View>;
}
