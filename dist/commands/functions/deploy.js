"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployActionHandler = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const cli_progress_1 = __importDefault(require("cli-progress"));
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const blake3_1 = require("../../utils/blake3");
const translation_1 = require("../../utils/translation");
const getFunctionOrPrompt_1 = require("./prompts/getFunctionOrPrompt");
const getFunctionPathOrPrompt_1 = require("./prompts/getFunctionPathOrPrompt");
const getJsCodeFromPath_1 = require("./utils/getJsCodeFromPath");
const parseEnvironmentVariables_1 = require("./utils/parseEnvironmentVariables");
const upload_1 = require("./utils/upload");
const waitUntilFileAvailable_1 = require("./wait/waitUntilFileAvailable");
const getWasmCodeFromPath_1 = require("./utils/getWasmCodeFromPath");
const uploadFunctionAssets_1 = require("./utils/uploadFunctionAssets");
const deployAction = async ({ sdk, args, }) => {
    const env = (0, parseEnvironmentVariables_1.getEnvironmentVariables)({ env: args.env, envFile: args.envFile });
    const functionToDeploy = await (0, getFunctionOrPrompt_1.getFunctionOrPrompt)({ name: args.name, sdk });
    const filePath = await (0, getFunctionPathOrPrompt_1.getFunctionPathOrPrompt)({ path: args.filePath });
    const assetsPath = args.assetsPath;
    const bundle = args.bundle !== 'false';
    const isSGX = !!args.sgx;
    const isTrustedPrivateEnvironment = isSGX && args.private;
    const isUntrustedPublicEnvironment = !isSGX && !args.private;
    if (isTrustedPrivateEnvironment) {
        cli_1.output.error((0, translation_1.t)('pvtFunctionInSgxNotSupported', { name: 'function' }));
        return;
    }
    if (!functionToDeploy) {
        cli_1.output.error((0, translation_1.t)('expectedNotFoundGeneric', { name: 'function' }));
        return;
    }
    if (assetsPath && isSGX) {
        cli_1.output.error((0, translation_1.t)('assetsNotSupportedInSgx'));
        return;
    }
    const assetsCid = await (0, uploadFunctionAssets_1.uploadFunctionAssets)({
        sdk,
        assetsPath,
        functionName: functionToDeploy.name,
    });
    const updatedEnv = {
        FLEEK_URL: functionToDeploy.invokeUrl,
        ...env,
    };
    const filePathToUpload = isSGX
        ? await (0, getWasmCodeFromPath_1.getWasmCodeFromPath)({ filePath })
        : await (0, getJsCodeFromPath_1.getJsCodeFromPath)({
            filePath,
            bundle,
            env: updatedEnv,
            assetsCid,
        });
    cli_1.output.printNewLine();
    const progressBar = new cli_progress_1.default.SingleBar({
        format: (0, translation_1.t)('uploadProgress', { action: (0, translation_1.t)('uploadCodeToIpfs') }),
    }, cli_progress_1.default.Presets.shades_grey);
    const uploadResult = await (0, upload_1.getUploadResult)({
        filePath: filePathToUpload,
        functionName: functionToDeploy.name,
        isPrivate: args.private,
        progressBar,
        sdk,
        onFailure: () => {
            progressBar.stop();
        },
    });
    if (!uploadResult) {
        cli_1.output.error((0, translation_1.t)('commonFunctionActionFailure', {
            action: 'deploy',
            tryAgain: (0, translation_1.t)('tryAgain'),
            message: (0, translation_1.t)('uploadToIpfsFailed'),
        }));
        return;
    }
    const blake3Hash = isSGX
        ? await (0, blake3_1.calculateBlake3Hash)({
            filePath: filePathToUpload,
            onFailure: () => {
                cli_1.output.error((0, translation_1.t)('failedCalculateBlake3Hash'));
                process.exit(1);
            },
        })
        : undefined;
    if (!cli_1.output.debugEnabled && !args.bundle) {
        node_fs_1.default.rmSync(filePathToUpload);
    }
    if (!uploadResult.pin.cid) {
        cli_1.output.error((0, translation_1.t)('commonFunctionActionFailure', {
            action: 'deploy',
            tryAgain: (0, translation_1.t)('tryAgain'),
            message: (0, translation_1.t)('uploadToIpfsFailed'),
        }));
        return;
    }
    if (uploadResult.duplicate &&
        functionToDeploy.currentDeployment &&
        uploadResult.pin &&
        functionToDeploy.currentDeployment.cid === uploadResult.pin.cid) {
        cli_1.output.chore((0, translation_1.t)('noChangesDetected'));
        return;
    }
    if (!args.private) {
        cli_1.output.printNewLine();
        cli_1.output.spinner((0, translation_1.t)('runningAvailabilityCheck'));
        const isAvailable = await (0, waitUntilFileAvailable_1.waitUntilFileAvailable)({
            cid: uploadResult.pin.cid,
        });
        if (!isAvailable) {
            cli_1.output.error((0, translation_1.t)('availabilityCheckFailed'));
            return;
        }
    }
    try {
        await sdk.functions().deploy({
            functionId: functionToDeploy.id,
            cid: uploadResult.pin.cid,
            sgx: isSGX,
            blake3Hash,
            assetsCid,
        });
    }
    catch {
        cli_1.output.error((0, translation_1.t)('failedDeployFleekFunction'));
        process.exit(1);
    }
    // TODO: This should probably happen just after uploadResult
    // looks more like a post upload process due to propagation
    if (isSGX) {
        // We need to make a request to the network so the network can have a mapping to the blake3 hash.
        // this is a temporarily hack until dalton comes up with a fix on network
        // TODO: Check status of supposed fix
        cli_1.output.spinner((0, translation_1.t)('networkFetchMappings'));
        try {
            // TODO: The `fleek-test` address should be an env var
            await fetch(`https://fleek-test.network/services/0/ipfs/${uploadResult.pin.cid}`);
        }
        catch {
            cli_1.output.error((0, translation_1.t)('networkFetchFailed'));
            return;
        }
    }
    cli_1.output.success((0, translation_1.t)('commonNameCreateSuccess', { name: 'deployment' }));
    cli_1.output.printNewLine();
    cli_1.output.log((0, translation_1.t)('callFleekFunctionByUrlReq'));
    cli_1.output.link(functionToDeploy.invokeUrl);
    if (isSGX) {
        cli_1.output.log((0, translation_1.t)('callFleekFunctionByNetworkUrlReq'));
        cli_1.output.link('https://fleek-test.network/services/3');
        cli_1.output.printNewLine();
        cli_1.output.log(`Blake3 Hash: ${blake3Hash} `);
        cli_1.output.log(`Invoke by sending request to https://fleek-test.network/services/3 with payload of {hash: <Blake3Hash>, decrypt: true, inputs: "foo"}`);
        cli_1.output.printNewLine();
        cli_1.output.hint(`Here's an example:`);
        cli_1.output.link(`curl ${functionToDeploy.invokeUrl} --data '{"hash": "${blake3Hash}", "decrypt": true, "input": "foo"}'`);
    }
    if (isUntrustedPublicEnvironment) {
        cli_1.output.log((0, translation_1.t)('callFleekFunctionByNetworkUrlReq'));
        cli_1.output.link(`https://fleek-test.network/services/1/ipfs/${uploadResult.pin.cid}`);
    }
};
exports.deployActionHandler = (0, withGuards_1.withGuards)(deployAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=deploy.js.map