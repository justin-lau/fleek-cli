"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEnvVarsAsKeyVal = void 0;
const errors_1 = require("@fleek-platform/errors");
// Replace global variables with specific values during build
const DEFAULT_ESBUILD_DEFINED_PROCESS_ENV_PREFIX = 'process.env.';
const parseEnvVarsAsKeyVal = ({ defined, keyPrefix = DEFAULT_ESBUILD_DEFINED_PROCESS_ENV_PREFIX, }) => {
    const keys = Object.keys(defined);
    if (!keys.length) {
        throw new errors_1.EnvNotSetError('');
    }
    return keys.reduce((define, envName) => {
        if (!defined[envName]) {
            throw new errors_1.EnvNotSetError(envName);
        }
        define[`${keyPrefix}${envName}`] = JSON.stringify(defined[envName]);
        return define;
    }, {});
};
exports.parseEnvVarsAsKeyVal = parseEnvVarsAsKeyVal;
//# sourceMappingURL=env.js.map