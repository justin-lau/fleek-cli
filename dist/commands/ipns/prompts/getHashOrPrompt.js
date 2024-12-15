"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHashOrPrompt = void 0;
const textPrompt_1 = require("../../../prompts/textPrompt");
const translation_1 = require("../../../utils/translation");
const getHashOrPrompt = async ({ hash }) => {
    if (hash) {
        return hash;
    }
    return (0, textPrompt_1.textPrompt)({ message: `${(0, translation_1.t)('ipnsTypeValidIPFSHash')}:` });
};
exports.getHashOrPrompt = getHashOrPrompt;
//# sourceMappingURL=getHashOrPrompt.js.map