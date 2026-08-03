import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import { styles } from './DirectionsButton.styles';

interface Props { onPress: () => void; t: TFunction }

export function DirectionsButton({ onPress, t }: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <MaterialCommunityIcons name="navigation-variant" size={18} color={Colors.background} />
        <Text style={styles.text}>{t('map.directions')}</Text>
      </TouchableOpacity>
    </View>
  );
}
