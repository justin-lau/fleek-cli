"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPersonalAccessTokensActionHandler = exports.listPersonalAccessTokensAction = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const listPersonalAccessTokensAction = async ({ sdk, }) => {
    const personalAccessTokens = await sdk.user().listPersonalAccessTokens();
    if (personalAccessTokens.length === 0) {
        cli_1.output.warn((0, translation_1.t)('noYYet', { name: (0, translation_1.t)('personalAccessToken') }));
        return;
    }
    cli_1.output.table(personalAccessTokens.map(({ id, createdAt, name, maskedToken }) => ({
        ID: id,
        'Created At': createdAt,
        Name: name ?? '',
        Token: maskedToken,
    })));
};
exports.listPersonalAccessTokensAction = listPersonalAccessTokensAction;
exports.listPersonalAccessTokensActionHandler = (0, withGuards_1.withGuards)(exports.listPersonalAccessTokensAction, {
    scopes: {
        authenticated: true,
        project: false,
        site: false,
    },
});
//# sourceMappingURL=list.js.map