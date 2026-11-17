const { AndroidConfig, withAndroidManifest } = require('@expo/config-plugins');
const {
  BANNER_RESOURCE, LEANBACK_FEATURE, LEANBACK_LAUNCHER, OPTIONAL_FEATURES, TV_ONLY_ENV,
} = require('./androidTv.constants');

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
  const tvOnly = process.env[TV_ONLY_ENV] === '1';
  for (const name of OPTIONAL_FEATURES) {
    const required = tvOnly && name === LEANBACK_FEATURE ? 'true' : 'false';
    const existing = manifest['uses-feature'].find((feature) => feature.$?.['android:name'] === name);
    if (existing) existing.$['android:required'] = required;
    else manifest['uses-feature'].push({ $: { 'android:name': name, 'android:required': required } });
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
