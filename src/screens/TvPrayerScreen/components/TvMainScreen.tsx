import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { TFunction } from 'i18next';
import { Text, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import type { TvCardView, TvHeaderView, TvNextView } from '../TvPrayerScreen.types';
import { themedStyles } from './TvMainScreen.styles';
import { TvFocusable } from './TvFocusable';
import { TvPrayerTile } from './TvPrayerTile';

interface Props {
  header: TvHeaderView;
  next: TvNextView;
  cards: TvCardView[];
  menuOpen: boolean;
  onOpenMenu: () => void;
  t: TFunction;
}

export function TvMainScreen({ header, next, cards, menuOpen, onOpenMenu, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.mosqueLine} numberOfLines={1}>{header.mosqueLine}</Text>
          <Text style={styles.dateLine} numberOfLines={1}>{header.dateLine}</Text>
          {header.offline ? (
            <View style={styles.offline}>
              <MaterialCommunityIcons name="wifi-off" size={26} color={colors.textSecondary} />
              <Text style={styles.offlineText}>{t('tv.offline')}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.headerRight}>
          <View style={styles.clockRow}>
            <Text style={styles.clock}>{header.clock}</Text>
            <Text style={styles.clockSeconds}>{header.seconds}</Text>
          </View>
          <TvFocusable shape="pill" onPress={onOpenMenu} disabled={menuOpen} preferredFocus={!menuOpen}>
            <View style={styles.menuButton}>
              <MaterialCommunityIcons name="menu" size={36} color={colors.textPrimary} />
              <Text style={styles.menuLabel}>{t('tv.menu')}</Text>
            </View>
          </TvFocusable>
        </View>
      </View>
      <View style={styles.center}>
        <Text style={styles.nextLabel}>{t('tv.next_prayer')}</Text>
        <Text style={styles.nextName} numberOfLines={1}>{next.name}</Text>
        <Text style={styles.nextCountdown}>{`${t('tv.in')} ${next.countdown}`}</Text>
      </View>
      <View style={styles.cards}>
        {cards.map((card) => <TvPrayerTile key={card.key} card={card} />)}
      </View>
    </View>
  );
}
