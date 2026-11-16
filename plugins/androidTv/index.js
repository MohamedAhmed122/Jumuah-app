const fs = require('fs');
const path = require('path');
const { withDangerousMod } = require('@expo/config-plugins');
const { BANNER_SOURCE, BANNER_TARGET } = require('./androidTv.constants');
const { withAndroidTvManifest } = require('./androidTv.manifest');

function withAndroidTv(config) {
  return withDangerousMod(withAndroidTvManifest(config), ['android', async (modConfig) => {
    const projectRoot = modConfig.modRequest.projectRoot;
    const target = path.join(projectRoot, 'android/app/src/main', BANNER_TARGET);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(projectRoot, BANNER_SOURCE), target);
    return modConfig;
  }]);
}

module.exports = withAndroidTv;
