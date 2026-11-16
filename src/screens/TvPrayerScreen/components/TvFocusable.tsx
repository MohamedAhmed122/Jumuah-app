import type { ReactNode } from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { useThemedStyles } from '@src/hooks/useTheme';
import { useFocusState } from '../hooks/useFocusState';
import { themedStyles } from './TvFocusable.styles';

interface Props {
  children: ReactNode;
  onPress: () => void;
  accessibilityLabel?: string;
  selected?: boolean;
  disabled?: boolean;
  preferredFocus?: boolean;
  shape?: 'option' | 'pill' | 'round';
  style?: StyleProp<ViewStyle>;
}

export function TvFocusable(props: Props) {
  const { children, onPress, accessibilityLabel, selected = false, disabled = false } = props;
  const styles = useThemedStyles(themedStyles);
  const { focused, onFocus, onBlur } = useFocusState();
  const shape = props.shape === 'pill' ? styles.ringPill : props.shape === 'round' ? styles.ringRound : null;

  return (
    <Pressable
      accessible={!disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      focusable={!disabled}
      hasTVPreferredFocus={props.preferredFocus}
      onBlur={onBlur}
      onFocus={onFocus}
      onPress={onPress}
      style={[styles.ring, shape, focused && styles.ringFocused, props.style]}
    >
      {children}
    </Pressable>
  );
}
