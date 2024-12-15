"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const conf_1 = __importDefault(require("conf"));
const secrets_1 = require("./secrets");
const schema = {
    personalAccessToken: { type: 'string' },
    projectId: { type: 'string' },
};
const conf = new conf_1.default({
    schema,
    projectName: 'fleek',
    configName: 'global',
});
exports.config = {
    personalAccessToken: {
        get: () => secrets_1.secrets.FLEEK_TOKEN ?? conf.get('personalAccessToken'),
        set: (value) => conf.set('personalAccessToken', value),
        clear: () => conf.delete('personalAccessToken'),
    },
    projectId: {
        get: () => secrets_1.secrets.FLEEK_PROJECT_ID ?? conf.get('projectId'),
        set: (value) => conf.set('projectId', value),
        clear: () => conf.delete('projectId'),
    },
    clear: () => conf.clear(),
};
//# sourceMappingURL=config.js.map