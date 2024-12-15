"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateActionHandler = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getFunctionNameOrPrompt_1 = require("./prompts/getFunctionNameOrPrompt");
const getFunctionOrPrompt_1 = require("./prompts/getFunctionOrPrompt");
const getFunctionSlugOrPrompt_1 = require("./prompts/getFunctionSlugOrPrompt");
const getFunctionStatusOrPrompt_1 = require("./prompts/getFunctionStatusOrPrompt");
const updateAction = async ({ args, sdk, }) => {
    if (!args.name && !args.slug && !args.status) {
        cli_1.output.error((0, translation_1.t)('functionUpdateArgsNotValid', {
            param1: 'name',
            param2: 'slug',
            param3: 'status',
        }));
        return;
    }
    const name = args.name
        ? await (0, getFunctionNameOrPrompt_1.getFunctionNameOrPrompt)({ name: args.name })
        : undefined;
    const slug = args.slug
        ? await (0, getFunctionSlugOrPrompt_1.getFunctionSlugOrPrompt)({ slug: args.slug })
        : undefined;
    const status = args.status
        ? await (0, getFunctionStatusOrPrompt_1.getFunctionStatusOrPrompt)({ status: args.status })
        : undefined;
    const fleekFunction = await (0, getFunctionOrPrompt_1.getFunctionOrPrompt)({
        name: args.functionName,
        sdk,
    });
    if (!fleekFunction) {
        cli_1.output.error((0, translation_1.t)('expectedNotFoundGeneric', { name: 'function' }));
        return;
    }
    await sdk.functions().update({ id: fleekFunction.id, slug, status, name });
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('commonItemActionSuccess', {
        subject: (0, translation_1.t)('function'),
        action: (0, translation_1.t)('updated'),
    }));
    cli_1.output.printNewLine();
};
exports.updateActionHandler = (0, withGuards_1.withGuards)(updateAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=update.js.map