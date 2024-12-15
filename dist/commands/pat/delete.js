"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePersonalAccessTokenActionHandler = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const deletePersonalAccessToken_1 = require("./utils/deletePersonalAccessToken");
const deletePersonalAccessTokenAction = async ({ sdk, args }) => {
    await (0, deletePersonalAccessToken_1.deletePersonalAccessToken)({
        id: args.personalAccessTokenId,
        output: cli_1.output,
        sdk,
    });
};
exports.deletePersonalAccessTokenActionHandler = (0, withGuards_1.withGuards)(deletePersonalAccessTokenAction, {
    scopes: {
        authenticated: true,
        project: false,
        site: false,
    },
});
//# sourceMappingURL=delete.js.map