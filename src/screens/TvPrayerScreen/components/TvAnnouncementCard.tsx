import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useThemedStyles } from '@src/hooks/useTheme';
import type { TvAnnouncementSlide } from '../TvPrayerScreen.types';
import { themedStyles } from './TvAnnouncementCard.styles';

interface Props {
  slide: TvAnnouncementSlide;
  animatedStyle: StyleProp<ViewStyle>;
}

export function TvAnnouncementCard({ slide, animatedStyle }: Props) {
  const styles = useThemedStyles(themedStyles);

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.tag}>
        <Text style={styles.tagText}>{slide.tag}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.8}>{slide.title}</Text>
      <Text style={styles.body} numberOfLines={4}>{slide.body}</Text>
      <View style={styles.details}>
        {slide.details.map((detail) => (
          <View key={detail} style={styles.detail}>
            <View style={styles.detailDot} />
            <Text style={styles.detailText}>{detail}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
}
