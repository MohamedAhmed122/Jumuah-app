const { AndroidConfig, withAndroidManifest } = require('@expo/config-plugins');
const { BANNER_RESOURCE, LEANBACK_LAUNCHER, OPTIONAL_FEATURES } = require('./androidTv.constants');

function withAndroidTvManifest(config) {
  return withAndroidManifest(config, (manifestConfig) => {
    const manifest = manifestConfig.modResults.manifest;
    addOptionalFeatures(manifest);
    const application = AndroidConfig.Manifest.getMainApplicationOrThrow(manifestConfig.modResults);
    application.$['android:banner'] = BANNER_RESOURCE;
    const activity = AndroidConfig.Manifest.getMainActivityOrThrow(manifestConfig.modResults);
    addLeanbackLauncher(activity);
    return manifestConfig;
  });
}

function addOptionalFeatures(manifest) {
  manifest['uses-feature'] = manifest['uses-feature'] || [];
  for (const name of OPTIONAL_FEATURES) {
    const existing = manifest['uses-feature'].find((feature) => feature.$?.['android:name'] === name);
    if (existing) existing.$['android:required'] = 'false';
    else manifest['uses-feature'].push({ $: { 'android:name': name, 'android:required': 'false' } });
  }
}

function addLeanbackLauncher(activity) {
  const launcherFilter = (activity['intent-filter'] || []).find((filter) =>
    (filter.action || []).some((action) => action.$?.['android:name'] === 'android.intent.action.MAIN'),
  );
  if (!launcherFilter) throw new Error('withAndroidTv could not find the main launcher intent filter');
  launcherFilter.category = launcherFilter.category || [];
  const exists = launcherFilter.category.some((category) => category.$?.['android:name'] === LEANBACK_LAUNCHER);
  if (!exists) launcherFilter.category.push({ $: { 'android:name': LEANBACK_LAUNCHER } });
}

module.exports = { withAndroidTvManifest };
