import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import { styles } from './HalalCityModal.styles';

interface Props {
  visible: boolean;
  cities: string[];
  selectedCity: string;
  onClose: () => void;
  onCurrentCity: () => void;
  onSelectCity: (city: string) => void;
  t: TFunction;
}

export function HalalCityModal(props: Props) {
  const { visible, cities, selectedCity, onClose, onCurrentCity, onSelectCity, t } = props;
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('map.select_city')}</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons name="close" size={22} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.currentRow} onPress={onCurrentCity}>
            <MaterialCommunityIcons name="crosshairs-gps" size={20} color={Colors.accent} />
            <Text style={styles.currentText}>{t('map.current_location')}</Text>
          </TouchableOpacity>
          <FlatList
            data={cities}
            keyExtractor={(city) => city}
            style={styles.list}
            renderItem={({ item: city }) => (
              <TouchableOpacity style={styles.row} onPress={() => onSelectCity(city)}>
                <Text style={[styles.city, selectedCity === city && styles.cityActive]}>{city}</Text>
                {selectedCity === city && <MaterialCommunityIcons name="check" size={20} color={Colors.accent} />}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
