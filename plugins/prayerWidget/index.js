const { withDangerousMod } = require('@expo/config-plugins');
const { writePrayerWidgetFiles } = require('./prayerWidget.files');
const { withPrayerWidgetManifest } = require('./prayerWidget.manifest');

function withPrayerWidget(config) {
  const packageName = config.android?.package;
  if (!packageName) {
    throw new Error('withPrayerWidget requires "android.package" to be set in app.json');
  }
  const withManifest = withPrayerWidgetManifest(config, packageName);
  return withDangerousMod(withManifest, ['android', async (modConfig) => {
    writePrayerWidgetFiles(modConfig.modRequest.projectRoot, packageName);
    return modConfig;
  }]);
}

module.exports = withPrayerWidget;
