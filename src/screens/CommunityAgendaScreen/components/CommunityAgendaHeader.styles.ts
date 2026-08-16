import { Colors } from "@constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 40,
    paddingHorizontal: 12,
    justifyContent: "center",
    // backgroundColor: Colors.surface,
  },
  back: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: Colors.surfaceElevated,
  },
});
