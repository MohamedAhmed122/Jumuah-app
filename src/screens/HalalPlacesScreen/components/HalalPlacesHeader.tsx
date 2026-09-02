import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import { styles } from './HalalPlacesHeader.styles';

interface Props {
  city: string;
  onCityPress: () => void;
  t: TFunction;
}

export function HalalPlacesHeader({ city, onCityPress, t }: Props) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>{t('map.halal_food')}</Text>
        <Text style={styles.title}>{t('map.places_title')}</Text>
      </View>
      <TouchableOpacity style={styles.cityButton} onPress={onCityPress}>
        <MaterialCommunityIcons name="map-marker-radius" size={17} color={Colors.accent} />
        <Text style={styles.cityButtonText} numberOfLines={1}>{city}</Text>
        <MaterialCommunityIcons name="chevron-down" size={18} color={Colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}
