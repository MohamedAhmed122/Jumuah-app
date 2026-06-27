import { useState, useEffect, type ReactNode } from 'react';
import {
  Modal,
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';
import { Colors } from '@constants/Colors';

const MAX_HEIGHT = Dimensions.get('window').height * 0.75;

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const translateY = useSharedValue(MAX_HEIGHT);

  useEffect(() => {
    cancelAnimation(translateY);
    if (visible) {
      setIsOpen(true);
      translateY.value = withSpring(0, { damping: 18, stiffness: 100 });
    } else {
      translateY.value = withTiming(MAX_HEIGHT, { duration: 260 }, (finished) => {
        if (finished) runOnJS(setIsOpen)(false);
      });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={StyleSheet.absoluteFill} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.sheet, animatedStyle]}>
          <View style={styles.handle} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: MAX_HEIGHT,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
});
