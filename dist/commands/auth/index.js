"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@fleek-platform/errors");
const defined_1 = require("../../defined");
const translation_1 = require("../../utils/translation");
const login_1 = require("./login");
const logout_1 = require("./logout");
exports.default = (cmd) => {
    cmd
        .command('login')
        .description((0, translation_1.t)('cmdAuthLoginDescription'))
        .action(() => {
        const uiAppUrl = (0, defined_1.getDefined)('UI__APP_URL');
        const authApiUrl = (0, defined_1.getDefined)('SDK__GRAPHQL_API_URL');
        if (!uiAppUrl || !authApiUrl) {
            throw new errors_1.MissingExpectedDataError();
        }
        return (0, login_1.loginActionHandler)({
            uiAppUrl,
            authApiUrl,
        });
    });
    cmd
        .command('logout')
        .description((0, translation_1.t)('cmdAuthLogoutDescription'))
        .action(logout_1.logoutActionHandler);
    return cmd;
};
//# sourceMappingURL=index.js.map