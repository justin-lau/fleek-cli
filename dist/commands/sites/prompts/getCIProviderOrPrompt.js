"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCIProviderOrPrompt = void 0;
const selectPrompt_1 = require("../../../prompts/selectPrompt");
const translation_1 = require("../../../utils/translation");
const providerChoices = [
    {
        title: 'GitHub Actions',
        description: (0, translation_1.t)('githubActionGenDescription'),
        value: 'github',
    },
];
const getCIProviderOrPrompt = async (args) => {
    if (args?.provider) {
        return args.provider;
    }
    const provider = await (0, selectPrompt_1.selectPrompt)({
        message: `${(0, translation_1.t)('selectProviderForBuildDeploySite')}:`,
        choices: providerChoices,
        initial: 0,
    });
    return provider;
};
exports.getCIProviderOrPrompt = getCIProviderOrPrompt;
//# sourceMappingURL=getCIProviderOrPrompt.js.map