import { TouchableWithoutFeedback, View } from 'react-native';

import { styles } from '../BottomSheet.styles';

interface BottomSheetBackdropProps {
  onPress: () => void;
}

export function BottomSheetBackdrop({ onPress }: BottomSheetBackdropProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.backdrop} />
    </TouchableWithoutFeedback>
  );
}
