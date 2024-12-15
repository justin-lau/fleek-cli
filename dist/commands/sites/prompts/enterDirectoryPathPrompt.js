"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterDirectoryPathPrompt = void 0;
const node_path_1 = require("node:path");
const cli_1 = require("../../../cli");
const textPrompt_1 = require("../../../prompts/textPrompt");
const translation_1 = require("../../../utils/translation");
const directoryExists_1 = require("../utils/directoryExists");
const enterDirectoryPathPrompt = async ({ message, }) => {
    const path = await (0, textPrompt_1.textPrompt)({
        message,
        validate: async (path) => {
            if (!path) {
                return (0, translation_1.t)('specifyValidDir');
            }
            const isDirectory = await (0, directoryExists_1.directoryExists)((0, node_path_1.join)(process.cwd(), path));
            return isDirectory ? true : (0, translation_1.t)('specifyValidDir');
        },
        onCancel: () => {
            cli_1.output.warn((0, translation_1.t)('specifyValidDir'));
            cli_1.output.error((0, translation_1.t)('exiting'));
        },
    });
    return path;
};
exports.enterDirectoryPathPrompt = enterDirectoryPathPrompt;
//# sourceMappingURL=enterDirectoryPathPrompt.js.map