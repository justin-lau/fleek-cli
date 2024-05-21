#!/usr/bin/env node

'use strict';
/* eslint-disable @typescript-eslint/no-var-requires */

const semver = require('semver');

// The `dist/bundle` is a temporary version
// should use the version `dist/cli` instead
const { asyncParser, init } = require('../dist/bundle');
const { loadJSONFromPackageRoot } = require('../dist/utils/json');
const { checkForPackageUpdates } = require('../dist/utils/update-notifier');

const pkgJson = loadJSONFromPackageRoot('package.json');
const pkgVersion = pkgJson.version;
const requiredVersion = pkgJson.engines.node;

if (!semver.satisfies(process.version, requiredVersion)) {
  // TODO: Pick text from locales
  console.error(`⚠️ You are using Node ${process.version}. We require Node ${requiredVersion} or higher!`);
  process.exit(1);
}

// Inform users of updates in a non-blocking manner
checkForPackageUpdates(pkgJson);

// Catch uncaught exception(s)
process.once('uncaughtException', (error) => {
  throw error;
});

// Initialise
init({ version: pkgVersion, parser: asyncParser });
