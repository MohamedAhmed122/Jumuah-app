import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import type { Mosque } from '@src/api/locations';
import { Colors } from '@constants/Colors';
import { OnboardingButton } from './OnboardingButton';
import { stepStyles, styles } from './MosqueStep.styles';

interface Props {
  mosques: Mosque[];
  loading: boolean;
  error: boolean;
  selected: string | null;
  onRetry: () => void;
  onSelect: (id: string | null) => void;
  onNext: () => void;
  t: TFunction;
}

export function MosqueStep(props: Props) {
  const { mosques, loading, error, selected, onRetry, onSelect, onNext, t } = props;
  return (
    <View style={stepStyles.step}>
      <MaterialCommunityIcons name="mosque" size={64} color={Colors.accent} style={stepStyles.icon} />
      <Text style={stepStyles.title}>{t('onboarding.select_mosque_title')}</Text>
      <Text style={stepStyles.body}>{t('onboarding.select_mosque_body')}</Text>
      {loading && <MosqueLoading t={t} />}
      {!loading && error && <MosqueError onRetry={onRetry} t={t} />}
      {!loading && !error && (
        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {mosques.map((mosque) => (
            <TouchableOpacity
              key={mosque.id}
              style={[styles.row, selected === mosque.id && styles.rowActive]}
              onPress={() => onSelect(mosque.id)}
              activeOpacity={0.8}
            >
              <View style={styles.rowText}>
                <Text style={[styles.name, selected === mosque.id && styles.nameActive]}>{mosque.name}</Text>
                <Text style={styles.address}>{mosque.address}</Text>
              </View>
              {selected === mosque.id && <MaterialCommunityIcons name="check-circle" size={22} color={Colors.accent} />}
            </TouchableOpacity>
          ))}
          {mosques.length === 0 && <Text style={styles.empty}>{t('onboarding.no_mosques')}</Text>}
        </ScrollView>
      )}
      <OnboardingButton label={selected ? t('onboarding.get_started') : t('onboarding.skip_mosque')} onPress={onNext} />
    </View>
  );
}

function MosqueLoading({ t }: { t: TFunction }) {
  return <View style={styles.state}><ActivityIndicator color={Colors.accent} /><Text style={styles.loading}>{t('onboarding.loading_mosques')}</Text></View>;
}

function MosqueError({ onRetry, t }: { onRetry: () => void; t: TFunction }) {
  return <View style={styles.state}><Text style={styles.error}>{t('errors.api_failed')}</Text><OnboardingButton label={t('errors.retry')} onPress={onRetry} variant="secondary" /></View>;
}
