import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@constants/Colors';
import { createTopInset } from '../SettingsScreen.styles';
import { styles } from './SettingsModal.styles';

interface Props { children: ReactNode; onClose: () => void; title: string; visible: boolean }

export function SettingsModal({ children, onClose, title, visible }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={[styles.root, createTopInset(insets.top)]}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.close} onPress={onClose} hitSlop={8}>
            <MaterialCommunityIcons name="close" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </View>
    </Modal>
  );
}
