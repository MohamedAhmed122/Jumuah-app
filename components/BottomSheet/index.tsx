import { Modal, View } from 'react-native';

import { BottomSheetBackdrop } from './components/BottomSheetBackdrop';
import { BottomSheetContent } from './components/BottomSheetContent';
import { useBottomSheetAnimation } from './hooks/useBottomSheetAnimation';
import { styles } from './BottomSheet.styles';
import type { BottomSheetProps } from './BottomSheet.types';

export function BottomSheet({ children, onClose, visible }: BottomSheetProps) {
  const animation = useBottomSheetAnimation(visible);

  return (
    <Modal
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible={animation.isOpen}
    >
      <View style={styles.overlay}>
        <BottomSheetBackdrop onPress={onClose} />
        <BottomSheetContent animatedStyle={animation.animatedStyle}>
          {children}
        </BottomSheetContent>
      </View>
    </Modal>
  );
}
