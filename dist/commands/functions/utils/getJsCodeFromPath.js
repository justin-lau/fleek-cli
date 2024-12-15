"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsCodeFromPath = exports.getFileLikeObject = void 0;
const fs = __importStar(require("node:fs"));
const os = __importStar(require("node:os"));
// TODO: These error messages should be revised
// e.g. FleekFunctionPathNotValidError happens regardless of bundling
const errors_1 = require("@fleek-platform/errors");
const cli_progress_1 = __importDefault(require("cli-progress"));
const esbuild_1 = require("esbuild");
const files_from_path_1 = require("files-from-path");
const cli_1 = require("../../../cli");
const translation_1 = require("../../../utils/translation");
const showUnsupportedModules = (args) => {
    const unsupportedModulesUsed = Array.from(args.unsupportedModulesUsed);
    if (unsupportedModulesUsed.length) {
        cli_1.output.printNewLine();
        for (const packageName of unsupportedModulesUsed) {
            cli_1.output.mistake((0, translation_1.t)('unsupportedPackage', { packageName }));
        }
        cli_1.output.log((0, translation_1.t)('showUnsupportedModulesDocLink'));
        cli_1.output.link('https://fleek.xyz/docs');
        cli_1.output.printNewLine();
    }
};
const buildEnvVars = (args) => {
    return Object.entries(args.env)
        .map(([key, value]) => `${key}: "${value}"`)
        .join(',');
};
const transpileCode = async (args) => {
    const { createFleekBuildConfig, nodeProtocolImportSpecifier, moduleChecker, unsupportedRuntimeModules, } = await import('@fleek-platform/functions-esbuild-config');
    const { filePath, bundle, env, assetsCid } = args;
    const progressBar = new cli_progress_1.default.SingleBar({
        format: (0, translation_1.t)('uploadProgress', {
            action: (0, translation_1.t)(bundle ? 'bundlingCode' : 'transformingCode'),
        }),
    }, cli_progress_1.default.Presets.shades_grey);
    let tempDir;
    if (!cli_1.output.debugEnabled) {
        tempDir = os.tmpdir();
    }
    else {
        tempDir = '.fleek';
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }
    }
    const outFile = `${tempDir}/function.js`;
    const unsupportedModulesUsed = new Set();
    const plugins = [
        moduleChecker({
            unsupportedModulesUsed: new Set(unsupportedRuntimeModules),
        }),
        {
            name: 'ProgressBar',
            setup: (build) => {
                build.onStart(() => {
                    progressBar.start(100, 10);
                });
            },
        },
    ];
    if (bundle) {
        plugins.push(nodeProtocolImportSpecifier({
            // Handle the error gracefully
            onError: () => cli_1.output.error((0, translation_1.t)('failedToApplyNodeImportProtocol')),
        }));
    }
    let adaptedEnv = env;
    if (assetsCid) {
        adaptedEnv = {
            ...env,
            ASSETS_CID: assetsCid,
        };
    }
    const buildConfig = createFleekBuildConfig({
        filePath,
        bundle,
        env: adaptedEnv,
    });
    try {
        await (0, esbuild_1.build)({
            ...buildConfig,
            outfile: outFile,
            plugins,
            minify: !!bundle,
        });
        progressBar.update(100);
        progressBar.stop();
    }
    catch (e) {
        progressBar.stop();
        const errorMessage = e &&
            typeof e === 'object' &&
            'message' in e &&
            typeof e.message === 'string'
            ? e.message
            : (0, translation_1.t)('unknownTransformError');
        const transpileResponse = {
            path: filePath,
            unsupportedModules: unsupportedModulesUsed,
            success: false,
            error: errorMessage,
        };
        return transpileResponse;
    }
    const transpileResponse = {
        path: outFile,
        unsupportedModules: unsupportedModulesUsed,
        success: true,
    };
    return transpileResponse;
};
const getFileLikeObject = async (path) => {
    const files = await (0, files_from_path_1.filesFromPaths)([path]);
    if (!files.length) {
        throw new errors_1.FleekFunctionPathNotValidError({ path });
    }
    return files[0];
};
exports.getFileLikeObject = getFileLikeObject;
// TODO: Create a process to validate the user source code
// using placeholder for the moment
const checkUserSourceCodeSupport = async (filePath) => {
    const reRequireSyntax = /require\s*\([^)]*\)/g;
    const buffer = await fs.promises.readFile(filePath);
    const contents = buffer.toString();
    return reRequireSyntax.test(contents);
};
const getJsCodeFromPath = async (args) => {
    const { filePath, bundle, env, assetsCid } = args;
    if (!fs.existsSync(filePath)) {
        throw new errors_1.FleekFunctionPathNotValidError({ path: filePath });
    }
    const isUserSourceCodeSupported = await checkUserSourceCodeSupport(filePath);
    if (isUserSourceCodeSupported) {
        cli_1.output.error((0, translation_1.t)('requireDeprecatedUseES6Syntax'));
    }
    const transpileResponse = await transpileCode({
        filePath,
        bundle,
        env,
        assetsCid,
    });
    showUnsupportedModules({
        unsupportedModulesUsed: transpileResponse.unsupportedModules,
    });
    if (!transpileResponse.success) {
        if (!transpileResponse.error) {
            throw new errors_1.UnknownError();
        }
        throw new errors_1.FleekFunctionBundlingFailedError({
            error: transpileResponse.error,
        });
    }
    return transpileResponse.path;
};
exports.getJsCodeFromPath = getJsCodeFromPath;
//# sourceMappingURL=getJsCodeFromPath.js.map