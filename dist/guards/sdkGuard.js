"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sdkGuard = exports.getSdkClient = void 0;
const node_1 = require("@fleek-platform/sdk/node");
const defined_1 = require("../defined");
const cli_1 = require("../cli");
const config_1 = require("../config");
const translation_1 = require("../utils/translation");
const loginGuard_1 = require("./loginGuard");
const getSdkClient = () => {
    const personalAccessToken = config_1.config.personalAccessToken.get();
    const projectId = config_1.config.projectId.get();
    if (!personalAccessToken) {
        cli_1.output.error((0, translation_1.t)('missingPersonalAccessToken'));
        process.exit(1);
    }
    const accessTokenService = new node_1.PersonalAccessTokenService({
        projectId,
        personalAccessToken,
    });
    const sdk = new node_1.FleekSdk({
        accessTokenService,
        graphqlServiceApiUrl: (0, defined_1.getDefined)('SDK__GRAPHQL_API_URL'),
        ipfsStorageApiUrl: (0, defined_1.getDefined)('SDK__IPFS__STORAGE_API_URL'),
        uploadProxyApiUrl: (0, defined_1.getDefined)('SDK__UPLOAD_PROXY_API_URL'),
    });
    return sdk;
};
exports.getSdkClient = getSdkClient;
const sdkGuard = (func) => {
    return async (args = {}) => {
        await (0, loginGuard_1.loginGuard)();
        const sdk = (0, exports.getSdkClient)();
        if (!sdk) {
            cli_1.output.error((0, translation_1.t)('failedAuthentication'));
            process.exit(1);
        }
        try {
            await func({ sdk, args });
        }
        catch (error) {
            if (error instanceof Error) {
                cli_1.output.error(error?.toString());
                process.exit(1);
            }
            cli_1.output.error(`Unknown Error: ${JSON.stringify(error)}`);
            process.exit(1);
        }
    };
};
exports.sdkGuard = sdkGuard;
//# sourceMappingURL=sdkGuard.js.map