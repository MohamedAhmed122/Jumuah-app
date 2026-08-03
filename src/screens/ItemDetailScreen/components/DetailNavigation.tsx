import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { Colors } from '@constants/Colors';
import { styles } from './DetailNavigation.styles';

interface Props { onBack: () => void; onShare: () => void }

export function DetailNavigation({ onBack, onShare }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onBack}>
        <MaterialCommunityIcons name="arrow-left" size={22} color={Colors.textPrimary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onShare}>
        <MaterialCommunityIcons name="share-variant" size={20} color={Colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}
