import type { TFunction } from 'i18next';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useThemedStyles } from '@src/hooks/useTheme';
import { ARABIC_LINE_LIMITS } from '../TvPrayerScreen.constants';
import type { TvAdhkarItem } from '../TvPrayerScreen.adhkar.types';
import { arabicSizes, themedStyles, translationSizes } from './TvAdhkarCard.styles';
import { TvTasbihRow } from './TvTasbihRow';

interface Props {
  item: TvAdhkarItem;
  animatedStyle: StyleProp<ViewStyle>;
  t: TFunction;
}

export function TvAdhkarCard({ item, animatedStyle, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const sizeKey = item.key as keyof typeof arabicSizes;

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.tags}>
        <View style={styles.tag}><Text style={styles.tagText}>{item.tag}</Text></View>
        {item.repeat ? (
          <View style={styles.repeat}><Text style={styles.repeatText}>{`× 3 · ${t('tv.repeat_three')}`}</Text></View>
        ) : null}
      </View>
      {item.kind === 'tasbih' ? <TvTasbihRow /> : null}
      <Text
        style={[styles.arabic, arabicSizes[sizeKey]]}
        numberOfLines={ARABIC_LINE_LIMITS[item.kind]}
        adjustsFontSizeToFit
        minimumFontScale={0.5}
      >
        {item.arabic}
      </Text>
      {item.translation ? (
        <Text style={[styles.translation, translationSizes[sizeKey]]} numberOfLines={4}>{item.translation}</Text>
      ) : null}
    </Animated.View>
  );
}
