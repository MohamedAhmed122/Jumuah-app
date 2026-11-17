const BANNER_SOURCE = 'assets/images/tv-banner.png';
const BANNER_TARGET = 'res/drawable-xhdpi/tv_banner.png';
const BANNER_RESOURCE = '@drawable/tv_banner';
const LEANBACK_LAUNCHER = 'android.intent.category.LEANBACK_LAUNCHER';
const LEANBACK_FEATURE = 'android.software.leanback';
const TV_ONLY_ENV = 'EXPO_TV';

const OPTIONAL_FEATURES = [
  'android.software.leanback',
  'android.hardware.touchscreen',
  'android.hardware.screen.portrait',
  'android.hardware.location',
  'android.hardware.location.gps',
  'android.hardware.location.network',
  'android.hardware.sensor.accelerometer',
  'android.hardware.sensor.compass',
];

module.exports = {
  BANNER_RESOURCE, BANNER_SOURCE, BANNER_TARGET, LEANBACK_FEATURE, LEANBACK_LAUNCHER, OPTIONAL_FEATURES, TV_ONLY_ENV,
};
