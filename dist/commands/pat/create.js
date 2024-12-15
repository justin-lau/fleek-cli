"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPersonalAccessTokenActionHandler = void 0;
const node_1 = require("@fleek-platform/sdk/node");
const cli_1 = require("../../cli");
const getPersonalAccessTokenNameOrPrompt_1 = require("../../utils/prompts/getPersonalAccessTokenNameOrPrompt");
const generateVerificationSessionId_1 = require("../../utils/token/generateVerificationSessionId");
const showVerificationSessionLink_1 = require("../../utils/token/showVerificationSessionLink");
const waitForPersonalAccessTokenFromVerificationSession_1 = require("../../utils/token/waitForPersonalAccessTokenFromVerificationSession");
const translation_1 = require("../../utils/translation");
const createPersonalAccessTokenActionHandler = async ({ uiAppUrl, authApiUrl, ...args }) => {
    const verificationSessionId = (0, generateVerificationSessionId_1.generateVerificationSessionId)();
    const name = await (0, getPersonalAccessTokenNameOrPrompt_1.getPersonalAccessTokenNameOrPrompt)({
        name: args?.name,
    });
    cli_1.output.printNewLine();
    (0, showVerificationSessionLink_1.showVerificationSessionLink)({ output: cli_1.output, uiAppUrl, verificationSessionId });
    const personalAccessToken = await (0, waitForPersonalAccessTokenFromVerificationSession_1.waitForPersonalAccessTokenFromVerificationSession)({
        verificationSessionId,
        client: (0, node_1.createClient)({ url: authApiUrl }),
        name,
    });
    if (!personalAccessToken) {
        cli_1.output.error((0, translation_1.t)('patFetchTimeout'));
        return;
    }
    cli_1.output.success((0, translation_1.t)('newPatIs', { pat: cli_1.output.textColor(personalAccessToken, 'redBright') }));
};
exports.createPersonalAccessTokenActionHandler = createPersonalAccessTokenActionHandler;
//# sourceMappingURL=create.js.map