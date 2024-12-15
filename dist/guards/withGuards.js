"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withGuards = void 0;
const cli_1 = require("../cli");
const translation_1 = require("../utils/translation");
const loginGuard_1 = require("./loginGuard");
const projectGuard_1 = require("./projectGuard");
const sdkGuard_1 = require("./sdkGuard");
const sitesGuard_1 = require("./sitesGuard");
const withGuards = (handler, { scopes }) => {
    return async (args = {}) => {
        if (scopes.authenticated) {
            await (0, loginGuard_1.loginGuard)();
        }
        if (scopes.project) {
            await (0, projectGuard_1.projectGuard)();
        }
        if (scopes.site) {
            await (0, sitesGuard_1.sitesGuard)(args);
        }
        try {
            const action = (0, sdkGuard_1.sdkGuard)(handler);
            await action(args);
        }
        catch (error) {
            if (error instanceof Error) {
                cli_1.output.error(error?.message);
                return;
            }
            cli_1.output.error(`${(0, translation_1.t)('unexpectedError')} ${JSON.stringify(error)}`);
        }
    };
};
exports.withGuards = withGuards;
//# sourceMappingURL=withGuards.js.map