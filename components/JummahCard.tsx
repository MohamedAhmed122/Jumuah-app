import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@constants/Colors';

interface Props {
  times: Date[];
  isNext: boolean;
}

const serviceKeys = ['first_jummah', 'second_jummah', 'third_jummah'] as const;

export function JummahCard({ times, isNext }: Props) {
  const { t } = useTranslation();

  return (
    <View style={[styles.card, isNext && styles.cardNext]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <MaterialCommunityIcons name="mosque" size={20} color={Colors.accent} />
          <Text style={styles.title}>{t('prayer.jummah')}</Text>
        </View>
        <Text style={styles.fridayLabel}>{t('prayer.friday')}</Text>
      </View>

      <View style={styles.services}>
        {times.map((time, index) => (
          <View key={`${time.toISOString()}-${index}`} style={styles.service}>
            <Text style={styles.serviceLabel}>{t(`prayer.${serviceKeys[index]}`)}</Text>
            <Text style={styles.time}>
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
  },
  cardNext: {
    borderColor: Colors.accent,
    backgroundColor: Colors.surfaceElevated,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary },
  fridayLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  services: { flexDirection: 'row', gap: 8 },
  service: {
    flex: 1,
    minWidth: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  serviceLabel: { fontSize: 10, color: Colors.textSecondary, marginBottom: 4 },
  time: { fontSize: 18, fontWeight: '700', color: Colors.accentSoft },
});
