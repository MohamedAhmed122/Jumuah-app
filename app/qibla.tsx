import { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Magnetometer } from 'expo-sensors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@constants/Colors';
import { useSettingsStore } from '@src/stores/settingsStore';
import { calculateQiblaBearing, compassDirection } from '@src/prayer/qibla';

export default function QiblaScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { userCoordinates } = useSettingsStore();

  const [heading, setHeading] = useState(0);
  const [sensorAvailable, setSensorAvailable] = useState(true);
  const subscriptionRef = useRef<ReturnType<typeof Magnetometer.addListener> | null>(null);

  const qiblaBearing = calculateQiblaBearing(userCoordinates);

  const compassRot = useSharedValue(0);
  const needleRot = useSharedValue(qiblaBearing);

  const compassStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${compassRot.value}deg` }],
  }));

  const needleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${needleRot.value}deg` }],
  }));

  useEffect(() => {
    Magnetometer.isAvailableAsync().then((available) => {
      if (!available) { setSensorAvailable(false); return; }

      Magnetometer.setUpdateInterval(100);
      subscriptionRef.current = Magnetometer.addListener(({ x, y }) => {
        let angle = Math.atan2(y, x) * (180 / Math.PI);
        // iOS adjustment
        if (Platform.OS === 'ios') angle = angle + 90;
        const normalized = (360 - ((angle + 360) % 360)) % 360;
        setHeading(normalized);
        compassRot.value = withTiming(-normalized, { duration: 80 });
        needleRot.value = withTiming(qiblaBearing - normalized, { duration: 80 });
      });
    });

    return () => subscriptionRef.current?.remove();
  }, [qiblaBearing]);

  const relativeAngle = ((qiblaBearing - heading) % 360 + 360) % 360;
  const displayBearing = Math.round(relativeAngle);
  const dir = compassDirection(qiblaBearing);

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Back button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.textPrimary} />
      </TouchableOpacity>

      <Text style={styles.title}>Qibla</Text>

      {!sensorAvailable && (
        <View style={styles.sensorWarning}>
          <Text style={styles.sensorWarningText}>{t('errors.sensor_unavailable')}</Text>
        </View>
      )}

      {/* Compass */}
      <View style={styles.compassWrapper}>
        {/* Rotating compass rose */}
        <Animated.View style={[styles.compassRose, compassStyle]}>
          {(['N', 'E', 'S', 'W'] as const).map((label, i) => (
            <View key={label} style={[styles.cardinalContainer, { transform: [{ rotate: `${i * 90}deg` }] }]}>
              <Text style={[styles.cardinal, label === 'N' && styles.cardinalN]}>{label}</Text>
            </View>
          ))}
          {/* Degree ticks */}
          {Array.from({ length: 72 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.tick,
                { transform: [{ rotate: `${i * 5}deg` }] },
                i % 18 === 0 ? styles.tickMajor : i % 6 === 0 ? styles.tickMid : styles.tickMinor,
              ]}
            />
          ))}
        </Animated.View>

        {/* Static Qibla needle */}
        <Animated.View style={[styles.needleContainer, needleStyle]}>
          <View style={styles.needleTip} />
          <View style={styles.needleBody} />
          <MaterialCommunityIcons
            name="star-crescent"
            size={24}
            color={Colors.accent}
            style={styles.kaabaIcon}
          />
        </Animated.View>

        {/* Center dot */}
        <View style={styles.centerDot} />
      </View>

      {/* Bearing info */}
      <View style={styles.infoCard}>
        <Text style={styles.bearingDeg}>{displayBearing}° {dir}</Text>
        <Text style={styles.bearingLabel}>
          {t('map.qibla_bearing')}: {Math.round(qiblaBearing)}°
        </Text>
      </View>
    </View>
  );
}

const COMPASS_SIZE = 280;
const ROSE_SIZE = COMPASS_SIZE;
const NEEDLE_LENGTH = COMPASS_SIZE * 0.38;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background, alignItems: 'center' },
  backBtn: { alignSelf: 'flex-start', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, marginBottom: 32 },

  sensorWarning: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sensorWarningText: { color: Colors.error, textAlign: 'center', fontSize: 13 },

  compassWrapper: {
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassRose: {
    width: ROSE_SIZE,
    height: ROSE_SIZE,
    borderRadius: ROSE_SIZE / 2,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardinalContainer: {
    position: 'absolute',
    top: 10,
    alignItems: 'center',
    width: ROSE_SIZE,
  },
  cardinal: { fontSize: 16, fontWeight: '700', color: Colors.textSecondary },
  cardinalN: { color: Colors.accent },

  tick: {
    position: 'absolute',
    top: 2,
    width: 1,
    height: 10,
    backgroundColor: Colors.border,
    transformOrigin: `0.5px ${ROSE_SIZE / 2 - 2}px`,
  },
  tickMajor: { height: 14, backgroundColor: Colors.textSecondary },
  tickMid: { height: 10, backgroundColor: Colors.border },
  tickMinor: { height: 6, opacity: 0.5 },

  needleContainer: {
    position: 'absolute',
    width: 2,
    height: NEEDLE_LENGTH * 2,
    alignItems: 'center',
  },
  needleTip: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: NEEDLE_LENGTH,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.accent,
  },
  needleBody: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: NEEDLE_LENGTH,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.surfaceElevated,
  },
  kaabaIcon: {
    position: 'absolute',
    top: -36,
  },
  centerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.accent,
    position: 'absolute',
  },

  infoCard: {
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 40,
    paddingVertical: 18,
    gap: 4,
  },
  bearingDeg: { fontSize: 32, fontWeight: '700', color: Colors.accent },
  bearingLabel: { fontSize: 13, color: Colors.textSecondary },
});
