const fs = require('fs');
const path = require('path');
const { buildPackageConstants } = require('./prayerWidget.constants');
const { injectJavaPackage, injectKotlinPackage } = require('./prayerWidget.registration');

const templatesRoot = path.join(__dirname, 'templates');
const nativeFiles = [
  ['PrayerWidgetDataModule.java', 'java/PrayerWidgetDataModule.java'],
  ['PrayerWidgetPackage.java', 'java/PrayerWidgetPackage.java'],
  ['PrayerWidgetProvider.java', 'java/PrayerWidgetProvider.java'],
  ['prayer_widget.xml', 'res/layout/prayer_widget.xml'],
  ['prayer_widget_background.xml', 'res/drawable/prayer_widget_background.xml'],
  ['prayer_widget_progress.xml', 'res/drawable/prayer_widget_progress.xml'],
  ['prayer_widget_info.xml', 'res/xml/prayer_widget_info.xml'],
];

function writePrayerWidgetFiles(projectRoot, packageName) {
  const { javaPackagePath } = buildPackageConstants(packageName);
  const mainSource = path.join(projectRoot, 'android/app/src/main');
  const javaRoot = path.join(mainSource, 'java', javaPackagePath);
  for (const [templateName, target] of nativeFiles) {
    const targetPath = target.startsWith('java/')
      ? path.join(javaRoot, path.basename(target))
      : path.join(mainSource, target);
    writeTemplate(templateName, targetPath, packageName);
  }
  injectKotlinPackage(path.join(javaRoot, 'MainApplication.kt'), packageName);
  injectJavaPackage(path.join(javaRoot, 'MainApplication.java'), packageName);
}

function writeTemplate(templateName, targetPath, packageName) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  const source = fs.readFileSync(path.join(templatesRoot, templateName), 'utf8');
  const content = templateName.endsWith('.java')
    ? source.replace(/^package [^;]+;/, `package ${packageName};`)
    : source;
  fs.writeFileSync(targetPath, content);
}

module.exports = { writePrayerWidgetFiles };
