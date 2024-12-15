"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostnameOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const utils_validation_1 = require("@fleek-platform/utils-validation");
const textPrompt_1 = require("../../../prompts/textPrompt");
const translation_1 = require("../../../utils/translation");
const getHostnameOrPrompt = async ({ hostname, }) => {
    if (hostname && (0, utils_validation_1.isHostnameValid)({ hostname })) {
        return hostname;
    }
    if (hostname && !(0, utils_validation_1.isHostnameValid)({ hostname })) {
        throw new errors_1.DomainHostnameInvalidError({ hostname });
    }
    return (0, textPrompt_1.textPrompt)({
        message: `${(0, translation_1.t)('enterDomainName')}:`,
        validate: (partialHostname) => (0, utils_validation_1.isHostnameValid)({ hostname: partialHostname }) ||
            (0, translation_1.t)('hostnameIncorrectForm'),
    });
};
exports.getHostnameOrPrompt = getHostnameOrPrompt;
//# sourceMappingURL=getHostnameOrPrompt.js.map