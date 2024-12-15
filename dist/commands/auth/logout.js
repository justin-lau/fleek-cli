"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutActionHandler = void 0;
const cli_1 = require("../../cli");
const config_1 = require("../../config");
const translation_1 = require("../../utils/translation");
const logoutActionHandler = async () => {
    const secretToken = config_1.config.personalAccessToken.get();
    if (!secretToken) {
        return;
    }
    config_1.config.clear();
    cli_1.output.success((0, translation_1.t)('logged', { status: (0, translation_1.t)('loggedOutOf') }));
};
exports.logoutActionHandler = logoutActionHandler;
//# sourceMappingURL=logout.js.map