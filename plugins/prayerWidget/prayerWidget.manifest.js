const { AndroidConfig, withAndroidManifest } = require('@expo/config-plugins');
const { receiverName } = require('./prayerWidget.constants');

function withPrayerWidgetManifest(config) {
  return withAndroidManifest(config, (manifestConfig) => {
    const manifest = manifestConfig.modResults.manifest;
    const application = AndroidConfig.Manifest.getMainApplicationOrThrow(manifest);
    application.receiver = application.receiver || [];
    const exists = application.receiver.some(
      (receiver) => receiver.$?.['android:name'] === receiverName,
    );
    if (!exists) application.receiver.push(createReceiver());
    return manifestConfig;
  });
}

function createReceiver() {
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
