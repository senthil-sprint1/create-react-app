'use strict';
const path = require('path');

//-------------Copied from paths.js
const fs = require('fs');
// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
//-------------Copied from paths.js

function getModules() {
  const sprintPkgSrcPath = 'src/@sprint1/pkg/src';
  const modules = [];

  if (fs.existsSync(resolveApp(sprintPkgSrcPath))) {
    modules.push(resolveApp(sprintPkgSrcPath));
  } else {
    const nodeModuleSprintPkgPath = resolveApp(
      'node_modules/' + sprintPkgSrcPath
    );
    if (fs.existsSync(nodeModuleSprintPkgPath)) {
      modules.push(nodeModuleSprintPkgPath);
    }
  }
  console.log('modules', modules);
  return modules;
}

function getAlias(isProductionEnv) {
  const aliasName = '@sprint1/pkg';
  const sprintPkgPath = 'src/@sprint1/pkg';
  const alias = {};

  if (fs.existsSync(resolveApp(sprintPkgPath))) {
    alias[aliasName] = resolveApp(sprintPkgPath);
  }
  if (isProductionEnv) {
    // Disables packing translation files as part of production build
    alias['locale/en/translation.json'] = false;
  }
  console.log('alias', alias);
  return alias;
}

function getPathsToProcessByBabel() {
  const sprintPkgLocalSrcPath = 'src/@sprint1/pkg/src';
  const sprintPkgSrcPath = '@sprint1/pkg/src';

  const pathsToProcess = [];

  if (fs.existsSync(resolveApp(sprintPkgLocalSrcPath))) {
    pathsToProcess.push(fs.realpathSync(resolveApp(sprintPkgSrcPath)));
  } else {
    const nodeModuleSprintPkgPath = resolveApp(
      'node_modules/' + sprintPkgSrcPath
    );
    if (fs.existsSync(nodeModuleSprintPkgPath)) {
      pathsToProcess.push(nodeModuleSprintPkgPath);
    }
  }

  console.log('pathtoProcess', pathsToProcess);
  return pathsToProcess;
}

module.exports = {
  getAlias: getAlias,
  getModules: getModules,
  getPathsToProcessByBabel: getPathsToProcessByBabel,
};
