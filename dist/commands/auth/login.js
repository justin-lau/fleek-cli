"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginActionHandler = void 0;
const node_1 = require("@fleek-platform/sdk/node");
const cli_1 = require("../../cli");
const config_1 = require("../../config");
const generateVerificationSessionId_1 = require("../../utils/token/generateVerificationSessionId");
const showVerificationSessionLink_1 = require("../../utils/token/showVerificationSessionLink");
const waitForPersonalAccessTokenFromVerificationSession_1 = require("../../utils/token/waitForPersonalAccessTokenFromVerificationSession");
const translation_1 = require("../../utils/translation");
const loginActionHandler = async ({ uiAppUrl, authApiUrl, }) => {
    const verificationSessionId = (0, generateVerificationSessionId_1.generateVerificationSessionId)();
    (0, showVerificationSessionLink_1.showVerificationSessionLink)({ output: cli_1.output, uiAppUrl, verificationSessionId });
    const client = (0, node_1.createClient)({ url: authApiUrl });
    const personalAccessToken = await (0, waitForPersonalAccessTokenFromVerificationSession_1.waitForPersonalAccessTokenFromVerificationSession)({
        verificationSessionId,
        client,
    });
    if (!personalAccessToken) {
        cli_1.output.error((0, translation_1.t)('timeoutPATfetch'));
        cli_1.output.printNewLine();
        return;
    }
    config_1.config.personalAccessToken.set(personalAccessToken);
    config_1.config.projectId.clear();
    cli_1.output.success((0, translation_1.t)('logged', { status: (0, translation_1.t)('loggedInTo') }));
    cli_1.output.printNewLine();
};
exports.loginActionHandler = loginActionHandler;
//# sourceMappingURL=login.js.map