"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrivateGatewayNameOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const utils_validation_1 = require("@fleek-platform/utils-validation");
const textPrompt_1 = require("../../../prompts/textPrompt");
const translation_1 = require("../../../utils/translation");
const getPrivateGatewayNameOrPrompt = async ({ name, }) => {
    if (name && (0, utils_validation_1.isPrivateGatewayNameValid)({ name })) {
        return name;
    }
    if (name && !(0, utils_validation_1.isPrivateGatewayNameValid)({ name })) {
        throw new errors_1.PrivateGatewayNameInvalidError({ name });
    }
    return (0, textPrompt_1.textPrompt)({
        message: (0, translation_1.t)('gatewayEnterName'),
        validate: (partialName) => (0, utils_validation_1.isPrivateGatewayNameValid)({ name: partialName }) ||
            (0, translation_1.t)('gatewayNameIncorrectForm'),
    });
};
exports.getPrivateGatewayNameOrPrompt = getPrivateGatewayNameOrPrompt;
//# sourceMappingURL=getPrivateGatewayNameOrPrompt.js.map