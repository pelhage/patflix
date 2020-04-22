var path = require('path');

function resolveApp(relativePath) {
  return path.resolve(relativePath);
}

// after eject: we're in ./config/
module.exports = {
  appBuild: resolveApp('dist'),
  appHtml: resolveApp('index.html'),
  appSass: resolveApp('src/scss'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src/'),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveApp('node_modules')
}
