import { createThemedStyles } from '@src/theme';

import { StyleSheet } from "react-native";

export const themedStyles = createThemedStyles((colors) => ({
  backButton: { padding: 16 },
  title: {
    // color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
}));
