const fs = require('fs');

function injectKotlinPackage(mainApplicationPath) {
  if (!fs.existsSync(mainApplicationPath)) return;
  const source = fs.readFileSync(mainApplicationPath, 'utf8');
  if (source.includes('PrayerWidgetPackage')) return;
  const withImport = source.replace(
    /package [^\n]+\n/,
    (match) => `${match}\nimport com.muslimcommunity.lithuania.PrayerWidgetPackage\n`,
  );
  const registered = withImport.replace(
    /PackageList\(this\)\.packages\.apply \{/,
    'PackageList(this).packages.apply {\n          add(PrayerWidgetPackage())',
  );
  fs.writeFileSync(mainApplicationPath, registered);
}

function injectJavaPackage(mainApplicationPath) {
  if (!fs.existsSync(mainApplicationPath)) return;
  const source = fs.readFileSync(mainApplicationPath, 'utf8');
  if (source.includes('PrayerWidgetPackage')) return;
  const withImport = source.replace(
    /package [^;]+;\n/,
    (match) => `${match}\nimport com.muslimcommunity.lithuania.PrayerWidgetPackage;\n`,
  );
  const registered = withImport.replace(
    /List<ReactPackage> packages = new PackageList\(this\)\.getPackages\(\);/,
    'List<ReactPackage> packages = new PackageList(this).getPackages();\n          packages.add(new PrayerWidgetPackage());',
  );
  fs.writeFileSync(mainApplicationPath, registered);
}

module.exports = { injectJavaPackage, injectKotlinPackage };
