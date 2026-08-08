import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { AnimatedStyle } from 'react-native-reanimated';

export interface BottomSheetProps {
  children: ReactNode;
  onClose: () => void;
  visible: boolean;
}

export interface BottomSheetAnimation {
  animatedStyle: AnimatedStyle<ViewStyle>;
  isOpen: boolean;
}
