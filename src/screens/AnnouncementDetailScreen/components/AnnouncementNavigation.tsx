import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { Colors } from '@constants/Colors';
import { styles } from './AnnouncementNavigation.styles';

interface Props { canShare: boolean; onBack: () => void; onShare: () => void }

export function AnnouncementNavigation({ canShare, onBack, onShare }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onBack}>
        <MaterialCommunityIcons name="arrow-left" size={22} color={Colors.textPrimary} />
      </TouchableOpacity>
      {canShare && (
        <TouchableOpacity style={styles.button} onPress={onShare}>
          <MaterialCommunityIcons name="share-variant" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      )}
    </View>
  );
}
