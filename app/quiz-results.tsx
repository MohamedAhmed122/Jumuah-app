import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export default function QuizResultsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Quiz Results — Phase 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' },
  text: { color: Colors.textPrimary },
});
