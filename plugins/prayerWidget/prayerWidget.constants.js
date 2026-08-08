function buildPackageConstants(packageName) {
  return {
    packageName,
    javaPackagePath: packageName.replace(/\./g, '/'),
    receiverName: `${packageName}.PrayerWidgetProvider`,
  };
}

module.exports = { buildPackageConstants };
