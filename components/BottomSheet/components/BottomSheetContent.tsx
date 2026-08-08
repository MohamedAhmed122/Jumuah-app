import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';

import type { BottomSheetAnimation } from '../BottomSheet.types';
import { styles } from './BottomSheetContent.styles';

interface BottomSheetContentProps {
  animatedStyle: BottomSheetAnimation['animatedStyle'];
  children: ReactNode;
}

export function BottomSheetContent({ animatedStyle, children }: BottomSheetContentProps) {
  return (
    <Animated.View style={[styles.sheet, animatedStyle]}>
      <View style={styles.handle} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </Animated.View>
  );
}
