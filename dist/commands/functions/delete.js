"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActionHandler = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getFunctionOrPrompt_1 = require("./prompts/getFunctionOrPrompt");
const deleteAction = async ({ sdk, args, }) => {
    const functionToDelete = await (0, getFunctionOrPrompt_1.getFunctionOrPrompt)({ name: args.name, sdk });
    if (!functionToDelete) {
        cli_1.output.error((0, translation_1.t)('expectedNotFoundGeneric', { name: 'function' }));
        return;
    }
    await sdk.functions().delete({ id: functionToDelete.id });
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('commonNameDeleteSuccess', { name: 'function' }));
    cli_1.output.printNewLine();
};
exports.deleteActionHandler = (0, withGuards_1.withGuards)(deleteAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=delete.js.map