const { AndroidConfig, withAndroidManifest } = require('@expo/config-plugins');
const { buildPackageConstants } = require('./prayerWidget.constants');

function withPrayerWidgetManifest(config, packageName) {
  const { receiverName } = buildPackageConstants(packageName);
  return withAndroidManifest(config, (manifestConfig) => {
    const application = AndroidConfig.Manifest.getMainApplicationOrThrow(manifestConfig.modResults);
    application.receiver = application.receiver || [];
    const exists = application.receiver.some(
      (receiver) => receiver.$?.['android:name'] === receiverName,
    );
    if (!exists) application.receiver.push(createReceiver(receiverName));
    return manifestConfig;
  });
}

function createReceiver(receiverName) {
  return {
    $: {
      'android:name': receiverName,
      'android:exported': 'true',
      'android:label': 'Next Prayer',
    },
    'intent-filter': [{
      action: [{ $: { 'android:name': 'android.appwidget.action.APPWIDGET_UPDATE' } }],
    }],
    'meta-data': [{
      $: {
        'android:name': 'android.appwidget.provider',
        'android:resource': '@xml/prayer_widget_info',
      },
    }],
  };
}

module.exports = { withPrayerWidgetManifest };
