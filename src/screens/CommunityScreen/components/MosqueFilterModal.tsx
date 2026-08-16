import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import type { Mosque } from '@src/api/locations';
import { styles } from './MosqueFilterModal.styles';

interface Props { visible: boolean; city: string; mosques: Mosque[]; selectedIds: string[]; onToggle: (id: string) => void; onClose: () => void; t: TFunction }

export function MosqueFilterModal({ visible, city, mosques, selectedIds, onToggle, onClose, t }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => undefined}>
          <View style={styles.header}><View><Text style={styles.title}>{t('community.select_mosques')}</Text><Text style={styles.city}>{city}</Text></View><TouchableOpacity onPress={onClose} hitSlop={10}><MaterialCommunityIcons name="close" size={22} color={Colors.textPrimary} /></TouchableOpacity></View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {mosques.map((mosque) => {
              const selected = selectedIds.includes(mosque.id);
              return <TouchableOpacity key={mosque.id} style={styles.row} onPress={() => onToggle(mosque.id)}><View style={[styles.check, selected && styles.checkActive]}>{selected && <MaterialCommunityIcons name="check" size={15} color={Colors.background} />}</View><View style={styles.copy}><Text style={styles.name}>{mosque.name}</Text><Text style={styles.address} numberOfLines={1}>{mosque.address}</Text></View></TouchableOpacity>;
            })}
          </ScrollView>
          <Text style={styles.hint}>{t('community.mosque_filter_hint')}</Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
