"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginGuard = void 0;
const errors_1 = require("@fleek-platform/errors");
const cli_1 = require("../cli");
const login_1 = require("../commands/auth/login");
const config_1 = require("../config");
const defined_1 = require("../defined");
const translation_1 = require("../utils/translation");
const loginGuard = async () => {
    const uiAppUrl = (0, defined_1.getDefined)('UI__APP_URL');
    const authApiUrl = (0, defined_1.getDefined)('SDK__GRAPHQL_API_URL');
    if (!uiAppUrl || !authApiUrl) {
        throw new errors_1.MissingExpectedDataError();
    }
    const accessToken = config_1.config.personalAccessToken.get();
    if (accessToken) {
        return;
    }
    cli_1.output.warn((0, translation_1.t)('authReqStartLogginFlow'));
    cli_1.output.printNewLine();
    await (0, login_1.loginActionHandler)({
        uiAppUrl,
        authApiUrl,
    });
};
exports.loginGuard = loginGuard;
//# sourceMappingURL=loginGuard.js.map