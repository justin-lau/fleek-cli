"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApplicationActionHandler = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getApplicationOrPrompt_1 = require("./prompts/getApplicationOrPrompt");
const deleteApplicationAction = async ({ sdk, args }) => {
    const application = await (0, getApplicationOrPrompt_1.getApplicationOrPrompt)({ id: args.id, sdk });
    if (!application) {
        cli_1.output.error((0, translation_1.t)('expectedNotFoundGeneric', { name: 'application' }));
        return;
    }
    await sdk.applications().delete({ id: application.id });
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('commonItemActionSuccess', {
        subject: (0, translation_1.t)('clientId'),
        action: (0, translation_1.t)('deleted'),
    }));
};
exports.deleteApplicationActionHandler = (0, withGuards_1.withGuards)(deleteApplicationAction, {
    scopes: { authenticated: true, project: true, site: false },
});
//# sourceMappingURL=delete.js.map