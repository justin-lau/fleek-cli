"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersonalAccessTokenNameOrPrompt = void 0;
const textPrompt_1 = require("../../prompts/textPrompt");
const getPersonalAccessTokenNameOrPrompt = async ({ name, }) => {
    if (name) {
        return name;
    }
    const personalAccessTokenName = await (0, textPrompt_1.textPrompt)({
        message: 'Do you want to name your new personal access token? Keep empty to skip.',
    });
    return personalAccessTokenName;
};
exports.getPersonalAccessTokenNameOrPrompt = getPersonalAccessTokenNameOrPrompt;
//# sourceMappingURL=getPersonalAccessTokenNameOrPrompt.js.map