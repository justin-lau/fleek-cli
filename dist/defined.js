"use strict";
/* eslint-disable no-process-env */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefined = exports.defined = void 0;
// WARNING: Those values will be visible in public source code pushed to NPM
exports.defined = {
    UI__APP_URL: "https://app.fleek.xyz",
    SDK__GRAPHQL_API_URL: "https://graphql.service.fleek.xyz/graphql",
    SDK__AUTH_APPS_URL: "https://auth-apps.service.fleek.xyz",
    SDK__IPFS__STORAGE_API_URL: "https://storage-ipfs.service.fleek.xyz",
    SDK__UPLOAD_PROXY_API_URL: "https://uploads.service.fleek.xyz",
};
// The variables are parsed at build time, in order to ensure
// that the override is intentional we should stick
// with the application prefix to avoid unexpected behaviour for
// polluted environments that might have similar env vars
// e.g. FLEEK__UI_APP_URL
const override_env_var_prefix = '';
const getDefined = (key) => process.env[`${override_env_var_prefix}${key}`] || exports.defined[key];
exports.getDefined = getDefined;
//# sourceMappingURL=defined.js.map