import { ScrollView, Text, View } from 'react-native';
import { PrivacyHeader } from './components/PrivacyHeader';
import { PrivacySection } from './components/PrivacySection';
import { usePrivacyScreen } from './hooks/PrivacyScreen.hooks';
import { createTopInset, styles } from './PrivacyScreen.styles';

export default function PrivacyScreen() {
  const { t, insets, sections, goBack } = usePrivacyScreen();

  return (
    <View style={[styles.root, createTopInset(insets.top)]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <PrivacyHeader title={t('privacy.title')} subtitle={t('privacy.summary')} onBack={goBack} />
        {sections.map((section) => <PrivacySection key={section.key} title={section.title} body={section.body} />)}
        <Text style={styles.footer}>{t('privacy.contact')}</Text>
      </ScrollView>
    </View>
  );
}
