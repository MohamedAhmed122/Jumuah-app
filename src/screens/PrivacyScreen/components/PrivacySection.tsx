import { Text, View } from 'react-native';
import { styles } from './PrivacySection.styles';

interface Props { title: string; body: string }

export function PrivacySection({ title, body }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}
