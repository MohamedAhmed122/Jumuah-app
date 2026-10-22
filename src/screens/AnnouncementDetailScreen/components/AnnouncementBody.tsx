import { Text, View } from 'react-native';
import { useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './AnnouncementBody.styles';

export function AnnouncementBody({ paragraphs }: { paragraphs: string[] }) {
  const styles = useThemedStyles(themedStyles);
  return (
    <>
      <View style={styles.divider} />
      {paragraphs.map((paragraph, index) => (
        <Text key={index} style={styles.paragraph}>{paragraph}</Text>
      ))}
    </>
  );
}
