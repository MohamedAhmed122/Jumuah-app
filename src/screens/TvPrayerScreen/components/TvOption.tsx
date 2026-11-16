import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { TvFocusable } from './TvFocusable';
import { themedStyles } from './TvOption.styles';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
  sub?: string;
  variant?: 'compact' | 'list';
  preferredFocus?: boolean;
}

export function TvOption({ label, selected, onPress, sub, variant = 'compact', preferredFocus }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  const list = variant === 'list';

  return (
    <TvFocusable onPress={onPress} selected={selected} preferredFocus={preferredFocus} style={!list && styles.fill}>
      <View style={[list ? styles.list : styles.compact, styles.option, selected && styles.selected]}>
        <View style={styles.labelRow}>
          <Text style={[styles.label, list && styles.listLabel, selected && styles.labelSelected]} numberOfLines={1}>
            {label}
          </Text>
          {sub ? <Text style={styles.sub} numberOfLines={1}>{sub}</Text> : null}
        </View>
        {list && selected ? <MaterialCommunityIcons name="check" size={32} color={colors.accent} /> : null}
      </View>
    </TvFocusable>
  );
}
