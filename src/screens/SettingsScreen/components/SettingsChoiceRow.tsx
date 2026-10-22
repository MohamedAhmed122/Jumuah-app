import { Text, TouchableOpacity, View } from 'react-native';

import { useThemedStyles } from '@src/hooks/useTheme';

import type { SettingsChoice } from '../SettingsScreen.types';
import { themedStyles } from './SettingsChoiceRow.styles';

interface Props<T extends string> {
  choices: SettingsChoice<T>[];
  onSelect: (value: T) => void;
  selected: T;
}

export function SettingsChoiceRow<T extends string>({ choices, onSelect, selected }: Props<T>) {
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={styles.row}>
      {choices.map((choice) => (
        <TouchableOpacity
          key={choice.value}
          style={[styles.button, selected === choice.value && styles.buttonActive]}
          onPress={() => onSelect(choice.value)}
        >
          <Text style={[styles.text, selected === choice.value && styles.textActive]}>
            {choice.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
