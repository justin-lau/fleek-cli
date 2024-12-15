"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prompt = void 0;
// eslint-disable-next-line no-restricted-imports
const prompts_1 = __importDefault(require("prompts"));
const prompt = async ({ onCancel, ...args }) => {
    const { value } = await (0, prompts_1.default)({
        ...args,
        name: 'value',
    }, {
        onCancel: () => {
            onCancel?.();
            process.exit(0);
        },
    });
    return value;
};
exports.prompt = prompt;
//# sourceMappingURL=prompt.js.map