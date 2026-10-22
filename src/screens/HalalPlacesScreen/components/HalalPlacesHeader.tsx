import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './HalalPlacesHeader.styles';

interface Props {
  city: string;
  onCityPress: () => void;
  t: TFunction;
}

export function HalalPlacesHeader({ city, onCityPress, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>{t('map.halal_food')}</Text>
        <Text style={styles.title}>{t('map.places_title')}</Text>
      </View>
      <TouchableOpacity style={styles.cityButton} onPress={onCityPress}>
        <MaterialCommunityIcons name="map-marker-radius" size={17} color={colors.accent} />
        <Text style={styles.cityButtonText} numberOfLines={1}>{city}</Text>
        <MaterialCommunityIcons name="chevron-down" size={18} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}
