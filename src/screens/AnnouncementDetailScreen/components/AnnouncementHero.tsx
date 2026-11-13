import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, View } from 'react-native';
import { resolveMediaUrl } from '@src/api/media';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './AnnouncementHero.styles';

export function AnnouncementHero({ image }: { image?: string }) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  if (image) return <Image source={{ uri: resolveMediaUrl(image) }} style={styles.hero} resizeMode="cover" />;
  return (
    <View style={styles.placeholder}>
      <MaterialCommunityIcons name="bulletin-board" size={48} color={colors.border} />
    </View>
  );
}
