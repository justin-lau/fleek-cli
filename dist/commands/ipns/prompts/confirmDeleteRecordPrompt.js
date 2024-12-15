"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmDeleteRecordPrompt = void 0;
const confirmPrompt_1 = require("../../../prompts/confirmPrompt");
const confirmDeleteRecordPrompt = async () => (0, confirmPrompt_1.confirmPrompt)({
    message: 'Are you sure you want to delete the record?',
    initial: false,
});
exports.confirmDeleteRecordPrompt = confirmDeleteRecordPrompt;
//# sourceMappingURL=confirmDeleteRecordPrompt.js.map