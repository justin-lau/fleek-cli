import { FleekFunctionBundlingFailedError, FleekFunctionPathNotValidError } from '@fleek-platform/errors';
import cliProgress from 'cli-progress';
import { build, BuildOptions, Plugin } from 'esbuild';
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { filesFromPaths } from 'files-from-path';
import * as fs from 'fs';
import os from 'os';

import { output } from '../../../cli';
import { t } from '../../../utils/translation';
import { EnvironmentVariables } from './parseEnvironmentVariables';
import { asyncLocalStoragePolyfill } from './plugins/asyncLocalStoragePolyfill';
import { moduleChecker } from './plugins/moduleChecker';

type BundlingResponse = {
  path: string;
  unsupportedModules: string[];
};

const showUnsupportedModules = (unsupportedModulesUsed: string[]) => {
  if (unsupportedModulesUsed.length) {
    output.printNewLine();
    unsupportedModulesUsed.forEach((val) => {
      output.mistake(t('unsupportedPackage', { packageName: val }));
    });
    output.log(t('showUnsupportedModulesDocLink'));
    output.link('https://fleek.xyz/docs');
    output.printNewLine();
  }
};

type BundleCodeArgs = {
  filePath: string;
  noBundle: boolean;
  env: EnvironmentVariables;
};

const bundleCode = async (args: BundleCodeArgs) => {
  const { filePath, noBundle, env } = args;

  const progressBar = new cliProgress.SingleBar(
    {
      format: t('uploadProgress', { action: t('bundlingCode') }),
    },
    cliProgress.Presets.shades_grey
  );

  const tempDir = os.tmpdir();
  const outFile = tempDir + '/function.js';
  const unsupportedModulesUsed: string[] = [];

  const plugins: Plugin[] = [
    moduleChecker({ unsupportedModulesUsed }),
    {
      name: 'ProgressBar',
      setup: (build) => {
        build.onStart(() => {
          if (!noBundle) {
            progressBar.start(100, 10);
          }
        });
      },
    },
  ];

  if (!noBundle) {
    plugins.push(
      nodeModulesPolyfillPlugin({
        globals: { Buffer: true },
        modules: {
          async_hooks: false,
          buffer: true,
          events: true,
          string_decoder: true,
          http: true,
        },
      }),
      asyncLocalStoragePolyfill()
    );
  }

  const buildOptions: BuildOptions = {
    entryPoints: [filePath],
    bundle: true,
    logLevel: 'silent',
    platform: 'neutral',
    outfile: outFile,
    minify: true,
    plugins,
  };

  if (Object.keys(env).length) {
    buildOptions.banner = {
      js: `
    globalThis.fleek = {
      env: {
        ${Object.entries(env)
          .map(([key, value]) => `${key}: "${value}"`)
          .join(',\n')}
      }
    }
    `,
    };
  }

  try {
    await build(buildOptions);
  } catch (e) {
    progressBar.stop();
    // @ts-expect-error error object is unknown
    output.debug(e.message);

    if (!noBundle) {
      showUnsupportedModules(unsupportedModulesUsed);
      throw new FleekFunctionBundlingFailedError({});
    }

    const bundlingResponse: BundlingResponse = {
      path: filePath,
      unsupportedModules: unsupportedModulesUsed,
    };

    return bundlingResponse;
  }

  progressBar.update(100);
  progressBar.stop();

  const bundlingResponse: BundlingResponse = {
    path: noBundle ? filePath : outFile,
    unsupportedModules: unsupportedModulesUsed,
  };

  return bundlingResponse;
};

export const getFileLikeObject = async (path: string) => {
  const files = await filesFromPaths([path]);

  if (!files.length) {
    throw new FleekFunctionPathNotValidError({ path });
  }

  return files[0];
};

export const getCodeFromPath = async (args: { path: string; noBundle: boolean; env: EnvironmentVariables }) => {
  const { path, noBundle, env } = args;

  let filePath: string;

  if (fs.existsSync(path)) {
    filePath = path;
  } else {
    throw new FleekFunctionPathNotValidError({ path });
  }

  const bundlingResponse = await bundleCode({ filePath, noBundle, env });
  showUnsupportedModules(bundlingResponse.unsupportedModules);

  return bundlingResponse.path;
};
