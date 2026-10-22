import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, View } from 'react-native';
import { resolveMediaUrl } from '@src/api/media';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import type { ItemType } from '../ItemDetailScreen.types';
import { themedStyles } from './DetailHero.styles';

interface Props { image?: string; type?: ItemType }

export function DetailHero({ image, type }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  if (image) return <Image source={{ uri: resolveMediaUrl(image) }} style={styles.hero} resizeMode="cover" />;
  return (
    <View style={styles.placeholder}>
      <MaterialCommunityIcons
        name={type === 'mosque' ? 'mosque' : 'storefront-outline'}
        size={56}
        color={colors.border}
      />
    </View>
  );
}
