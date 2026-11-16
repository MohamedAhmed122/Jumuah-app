import { StyleSheet, type ViewStyle } from 'react-native';

const percentEntries: Record<string, ViewStyle> = Object.fromEntries(
  Array.from({ length: 101 }, (_, percent) => [String(percent), { width: `${percent}%` }]),
);

export const percentWidthStyles = StyleSheet.create(percentEntries);

export function percentWidth(percent: number): ViewStyle {
  return percentWidthStyles[String(Math.max(0, Math.min(100, Math.round(percent))))];
}
