"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@fleek-platform/errors");
const defined_1 = require("../../defined");
const translation_1 = require("../../utils/translation");
const create_1 = require("./create");
const delete_1 = require("./delete");
const list_1 = require("./list");
exports.default = (program) => {
    const cmd = program.command('pat').description((0, translation_1.t)('patDescription'));
    cmd
        .command('list')
        .description((0, translation_1.t)('patListDesc'))
        .action(list_1.listPersonalAccessTokensActionHandler);
    cmd
        .command('create')
        .description((0, translation_1.t)('createNewPat'))
        .option('-n, --name <name>', (0, translation_1.t)('patName'))
        .action(async (args) => {
        const uiAppUrl = (0, defined_1.getDefined)('UI__APP_URL');
        const authApiUrl = (0, defined_1.getDefined)('SDK__GRAPHQL_API_URL');
        if (!uiAppUrl || !authApiUrl) {
            throw new errors_1.MissingExpectedDataError();
        }
        await (0, create_1.createPersonalAccessTokenActionHandler)({
            uiAppUrl,
            authApiUrl,
            ...args,
        });
    });
    cmd
        .command('delete')
        .description((0, translation_1.t)('patDelete'))
        .argument('<personalAccessTokenId>', (0, translation_1.t)('commonNameOfSubjectToAction', {
        name: (0, translation_1.t)('id'),
        subject: (0, translation_1.t)('personalAccessToken'),
        action: (0, translation_1.t)('delete'),
    }))
        .action((personalAccessTokenId) => (0, delete_1.deletePersonalAccessTokenActionHandler)({ personalAccessTokenId }));
    return cmd;
};
//# sourceMappingURL=index.js.map