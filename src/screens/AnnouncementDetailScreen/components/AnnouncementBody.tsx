import { Text, View } from 'react-native';
import { styles } from './AnnouncementBody.styles';

export function AnnouncementBody({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      <View style={styles.divider} />
      {paragraphs.map((paragraph, index) => (
        <Text key={index} style={styles.paragraph}>{paragraph}</Text>
      ))}
    </>
  );
}
