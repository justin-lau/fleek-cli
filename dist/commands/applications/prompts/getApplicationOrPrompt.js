"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const selectPrompt_1 = require("../../../prompts/selectPrompt");
const translation_1 = require("../../../utils/translation");
const getApplicationOrPrompt = async ({ id, sdk, }) => {
    if (id) {
        return sdk.applications().get({ id });
    }
    const applications = await sdk.applications().list();
    if (applications.length === 0) {
        throw new errors_1.ApplicationsNotFoundError({});
    }
    const selectedApplicationId = await (0, selectPrompt_1.selectPrompt)({
        message: `${(0, translation_1.t)('selectApp')}:`,
        choices: applications.map((application) => ({
            title: application.name,
            value: application.id,
        })),
    });
    const appMatch = applications.find((application) => application.id === selectedApplicationId);
    if (!appMatch)
        return;
    return appMatch;
};
exports.getApplicationOrPrompt = getApplicationOrPrompt;
//# sourceMappingURL=getApplicationOrPrompt.js.map