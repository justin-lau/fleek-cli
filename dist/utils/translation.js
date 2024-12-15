"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = void 0;
const json_1 = require("./json");
const en = (0, json_1.loadJSONFromPackageRoot)('locales/en.json');
const chalk_1 = __importDefault(require("chalk"));
// TODO: Refactor the color system to be stricter to a small amount of well defined colours and meanings. See `Output.ts`, `update-notifier.ts` and wherever its applied
// Ansi escape code handlers
// these are ansi level, so do not confuse with the
// cli `Output.ts`
const _b = (text) => chalk_1.default.bold(text);
const _t = (key, values) => {
    const txt = en[key];
    if (!txt) {
        console.error(`Missing ${key}`);
        return `[ERROR: Missing ${key}]`;
    }
    const matches = [...txt.matchAll(/{(.*?)}/g)];
    let transl = txt;
    if (matches.length && values) {
        transl = matches.reduce((acc, curr) => {
            const txt = values[curr[1]];
            // Skip non-matches
            // e.g. the update-notifier uses the same placeholder
            // convention as the localization as {placeholder}
            if (typeof txt !== 'string') {
                return acc;
            }
            const val = values?.options?.bold ? _b(txt) : txt;
            return acc.replace(curr[0], val);
        }, txt);
    }
    return transl;
};
// TODO: create util for plural e.g. project -> projects
const t = (key, values) => _t(key, values);
exports.t = t;
//# sourceMappingURL=translation.js.map