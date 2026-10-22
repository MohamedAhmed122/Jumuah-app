import { Text, View } from 'react-native';
import { useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './PrivacySection.styles';

interface Props { title: string; body: string }

export function PrivacySection({ title, body }: Props) {
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}
