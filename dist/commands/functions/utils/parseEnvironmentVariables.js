"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentVariables = exports.parseEnvironmentVariables = exports.parseEnvironmentVariablesFile = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const cli_1 = require("../../../cli");
const translation_1 = require("../../../utils/translation");
const parseEnvironmentVariablesFile = (args) => {
    const { envFile } = args;
    if (!node_fs_1.default.statSync(envFile).isFile()) {
        cli_1.output.mistake((0, translation_1.t)('filePathNotFound', { envFile }));
        return {};
    }
    try {
        const envFileContent = node_fs_1.default.readFileSync(envFile);
        const config = dotenv_1.default.parse(envFileContent);
        return config;
    }
    catch (err) {
        cli_1.output.mistake((0, translation_1.t)('envFileParseError', { envFile }));
        return {};
    }
};
exports.parseEnvironmentVariablesFile = parseEnvironmentVariablesFile;
const parseEnvironmentVariables = (args) => {
    const { env } = args;
    return env.reduce((acc, curr) => {
        const [key, value] = curr.split('=');
        let varValue = value;
        if (!varValue) {
            // eslint-disable-next-line no-process-env
            const envValue = process.env[key];
            if (!envValue) {
                cli_1.output.mistake((0, translation_1.t)('missingEnvVar', { key }));
                return acc;
            }
            varValue = envValue;
        }
        acc[key] = varValue;
        return acc;
    }, {});
};
exports.parseEnvironmentVariables = parseEnvironmentVariables;
const getEnvironmentVariables = (args) => {
    const { env, envFile } = args;
    const environmentVariables = (0, exports.parseEnvironmentVariables)({ env });
    let envFileContent = {};
    if (envFile) {
        envFileContent = (0, exports.parseEnvironmentVariablesFile)({ envFile });
    }
    return { ...envFileContent, ...environmentVariables };
};
exports.getEnvironmentVariables = getEnvironmentVariables;
//# sourceMappingURL=parseEnvironmentVariables.js.map