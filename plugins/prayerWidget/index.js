const { withDangerousMod } = require('@expo/config-plugins');
const { writePrayerWidgetFiles } = require('./prayerWidget.files');
const { withPrayerWidgetManifest } = require('./prayerWidget.manifest');

function withPrayerWidget(config) {
  const withManifest = withPrayerWidgetManifest(config);
  return withDangerousMod(withManifest, ['android', async (modConfig) => {
    writePrayerWidgetFiles(modConfig.modRequest.projectRoot);
    return modConfig;
  }]);
}

module.exports = withPrayerWidget;
