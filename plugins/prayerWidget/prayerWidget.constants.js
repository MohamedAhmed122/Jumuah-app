const packageName = 'com.muslimcommunity.lithuania';

module.exports = {
  packageName,
  javaPackagePath: packageName.replace(/\./g, '/'),
  receiverName: `${packageName}.PrayerWidgetProvider`,
};
