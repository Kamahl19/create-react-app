'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

module.exports = () => {
  const pkg = fs.existsSync(paths.appPackageJson) ? require(paths.appPackageJson) : {};

  let modifyVars = {};

  if (pkg.theme) {
    if (typeof pkg.theme === 'string') {
      if (pkg.theme.charAt(0) === '.') {
        pkg.theme = path.resolve(paths.appPath, pkg.theme);
      }
      modifyVars = require(pkg.theme)();
    }
    else if (typeof pkg.theme === 'object') {
      modifyVars = pkg.theme;
    }
  }

  return modifyVars;
};