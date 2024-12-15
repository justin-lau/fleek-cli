"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActionHandler = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getFunctionNameOrPrompt_1 = require("./prompts/getFunctionNameOrPrompt");
const isSiteIdValid_1 = require("./utils/isSiteIdValid");
const createAction = async ({ args, sdk, }) => {
    const { name, siteId } = args;
    const functionName = await (0, getFunctionNameOrPrompt_1.getFunctionNameOrPrompt)({ name });
    if (siteId && !(await (0, isSiteIdValid_1.isSiteIdValid)({ siteId: siteId, sdk }))) {
        cli_1.output.error((0, translation_1.t)('siteNotFound'));
        return;
    }
    const newFunction = await sdk.functions().create({
        name: functionName,
        siteId: siteId,
    });
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('commonNameCreateSuccess', { name: 'function' }));
    cli_1.output.printNewLine();
    if (!newFunction.currentDeploymentId) {
        cli_1.output.log((0, translation_1.t)('youCanDoXUsingFolCmd', { action: (0, translation_1.t)('deployNewFunction') }));
        cli_1.output.log('fleek functions deploy');
    }
};
exports.createActionHandler = (0, withGuards_1.withGuards)(createAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=create.js.map