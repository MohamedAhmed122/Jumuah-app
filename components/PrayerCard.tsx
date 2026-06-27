import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Colors } from '@constants/Colors';
import type { PrayerName } from '@constants/prayerMethods';

interface Props {
  prayer: PrayerName;
  time: Date;
  isActive: boolean;
  isNext: boolean;
  hasPassed: boolean;
  status: 'prayed' | 'missed' | null;
  adhanEnabled: boolean;
  reminderEnabled: boolean;
  onAdhanToggle: () => void;
  onReminderToggle: () => void;
  onLog: (prayed: boolean) => void;
}

export function PrayerCard({
  prayer, time, isActive, isNext, hasPassed, status,
  adhanEnabled, reminderEnabled, onAdhanToggle, onReminderToggle, onLog,
}: Props) {
  const { t } = useTranslation();

  const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={[styles.card, isActive && styles.cardActive, isNext && styles.cardNext]}>
      {isActive && <View style={styles.activePulse} />}

      <View style={styles.left}>
        <Text style={[styles.name, isActive && styles.nameActive]}>
          {t(`prayer.${prayer}`)}
        </Text>
        <Text style={[styles.time, isActive && styles.timeActive]}>{timeStr}</Text>
      </View>

      <View style={styles.right}>
        {/* Logging buttons: show after time passes and not yet logged */}
        {hasPassed && status === null && (
          <View style={styles.logRow}>
            <TouchableOpacity style={styles.logYes} onPress={() => onLog(true)}>
              <Text style={styles.logYesText}>{t('tracker.yes')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logNo} onPress={() => onLog(false)}>
              <Text style={styles.logNoText}>{t('tracker.no')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Status indicator: show after logged */}
        {status === 'prayed' && (
          <MaterialCommunityIcons name="check-circle" size={22} color={Colors.accent} style={styles.statusIcon} />
        )}
        {status === 'missed' && (
          <MaterialCommunityIcons name="close-circle" size={22} color={Colors.error} style={styles.statusIcon} />
        )}

        {/* Notification toggles */}
        <View style={styles.toggles}>
          <TouchableOpacity onPress={onAdhanToggle} style={styles.toggleBtn} hitSlop={8}>
            <MaterialCommunityIcons
              name={adhanEnabled ? 'bell' : 'bell-off'}
              size={18}
              color={adhanEnabled ? Colors.accent : Colors.border}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onReminderToggle} style={styles.toggleBtn} hitSlop={8}>
            <MaterialCommunityIcons
              name={reminderEnabled ? 'clock' : 'clock-outline'}
              size={18}
              color={reminderEnabled ? Colors.accentSoft : Colors.border}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    overflow: 'hidden',
  },
  cardActive: {
    borderColor: Colors.accent,
    backgroundColor: Colors.surfaceElevated,
  },
  cardNext: {
    borderColor: Colors.accentSoft,
  },
  activePulse: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: Colors.accent,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  left: { flex: 1, gap: 2 },
  name: { fontSize: 16, fontWeight: '600', color: Colors.textSecondary },
  nameActive: { color: Colors.textPrimary },
  time: { fontSize: 22, fontWeight: '700', color: Colors.textSecondary },
  timeActive: { color: Colors.accent },
  right: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logRow: { flexDirection: 'row', gap: 8 },
  logYes: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logYesText: { color: Colors.background, fontWeight: '700', fontSize: 13 },
  logNo: {
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  logNoText: { color: Colors.error, fontWeight: '600', fontSize: 13 },
  statusIcon: { marginRight: 4 },
  toggles: { flexDirection: 'row', gap: 6 },
  toggleBtn: { padding: 4 },
});
