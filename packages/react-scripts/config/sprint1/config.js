'use strict';
const path = require('path');
const paths = require('../paths');
const packageJsonObject = require(paths.appPackageJson);
function getNodeModulePathsToTranspile() {
  if (
    packageJsonObject.typeScriptNodeModulePathsToTranspile &&
    Array.isArray(packageJsonObject.typeScriptNodeModulePathsToTranspile)
  ) {
    const pathsToInclude =
      packageJsonObject.typeScriptNodeModulePathsToTranspile.map(
        modulePathInPackageJson => {
          return path.resolve('node_modules', modulePathInPackageJson);
        }
      );
    return pathsToInclude;
  } else {
    return [];
  }
}

function getNodeModulePathsToResolve() {
  if (
    packageJsonObject.typeScriptNodeModulePathsToTranspile &&
    Array.isArray(packageJsonObject.typeScriptNodeModulePathsToTranspile)
  ) {
    const pathsToInclude =
      packageJsonObject.typeScriptNodeModulePathsToTranspile.map(
        modulePathInPackageJson => {
          return path.resolve('node_modules', modulePathInPackageJson, 'src');
        }
      );
    return pathsToInclude;
  } else {
    return [];
  }
}

module.exports = {
  getNodeModulePathsToTranspile: getNodeModulePathsToTranspile,
  getNodeModulePathsToResolve: getNodeModulePathsToResolve,
};
