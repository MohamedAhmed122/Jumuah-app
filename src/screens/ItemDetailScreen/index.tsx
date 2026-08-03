import { ScrollView, View } from 'react-native';
import { DetailHeading } from './components/DetailHeading';
import { DetailHero } from './components/DetailHero';
import { DetailNavigation } from './components/DetailNavigation';
import { DetailState } from './components/DetailState';
import { DirectionsButton } from './components/DirectionsButton';
import { HalalDetailsSection } from './components/HalalDetailsSection';
import { InfoGrid } from './components/InfoGrid';
import { MosqueJummahSection } from './components/MosqueJummahSection';
import { useItemDetailScreen } from './hooks/ItemDetailScreen.hooks';
import { createScreenStyles, styles } from './ItemDetailScreen.styles';

export default function ItemDetailScreen() {
  const screen = useItemDetailScreen();
  const { data, actions, insets, t } = screen;
  if (data.loading) return <DetailState type="loading" topInset={insets.top} onBack={actions.goBack} t={t} />;
  if (data.error || !data.item) return <DetailState type="error" topInset={insets.top} onBack={actions.goBack} t={t} />;
  const dynamicStyles = createScreenStyles(insets.top, insets.bottom);
  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <DetailNavigation onBack={actions.goBack} onShare={actions.share} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={dynamicStyles.content}>
        <DetailHero image={data.item.image} type={data.type} />
        <View style={styles.content}>
          <DetailHeading item={data.item} type={data.type} openStatus={screen.openStatus} t={t} />
          <InfoGrid item={data.item} halalPlace={data.halalPlace} />
          <MosqueJummahSection mosque={data.mosque} t={t} />
          <HalalDetailsSection place={data.halalPlace} description={screen.description} t={t} />
          <DirectionsButton onPress={actions.openDirections} t={t} />
        </View>
      </ScrollView>
    </View>
  );
}
