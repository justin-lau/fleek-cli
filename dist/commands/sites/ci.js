"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ciActionHandler = void 0;
const cli_1 = require("../../cli");
const config_1 = require("../../config");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getCIProviderOrPrompt_1 = require("./prompts/getCIProviderOrPrompt");
const prepareGitHubActionsIntegration_1 = require("./utils/prepareGitHubActionsIntegration");
const ciAction = async ({ args }) => {
    const provider = await (0, getCIProviderOrPrompt_1.getCIProviderOrPrompt)({
        provider: args?.provider,
    });
    const personalAccessToken = config_1.config.personalAccessToken.get();
    const projectId = config_1.config.projectId.get();
    if (!personalAccessToken) {
        cli_1.output.error((0, translation_1.t)('noPatFoundUnexpectedly'));
        return;
    }
    if (!projectId) {
        cli_1.output.error((0, translation_1.t)('noProjectIdFoundUnexpectedly'));
        return;
    }
    switch (provider) {
        case 'github':
            await (0, prepareGitHubActionsIntegration_1.prepareGitHubActionsIntegration)({
                projectId,
                personalAccessToken,
                fleekConfigPath: args.predefinedConfigPath,
                output: cli_1.output,
            });
            break;
        default:
            cli_1.output.error((0, translation_1.t)('providerNotSupported'));
            return;
    }
};
exports.ciActionHandler = (0, withGuards_1.withGuards)(ciAction, {
    scopes: {
        project: true,
        site: true,
        authenticated: true,
    },
});
//# sourceMappingURL=ci.js.map