"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listDeploymentsActionHandler = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getFunctionOrPrompt_1 = require("./prompts/getFunctionOrPrompt");
const listDeploymentsAction = async ({ sdk, args }) => {
    const functionToList = await (0, getFunctionOrPrompt_1.getFunctionOrPrompt)({ sdk, name: args.name });
    if (!functionToList) {
        cli_1.output.error((0, translation_1.t)('expectedNotFoundGeneric', { name: 'function' }));
        return;
    }
    const deployments = await sdk
        .functions()
        .listDeployments({ functionId: functionToList.id });
    if (!deployments?.length) {
        cli_1.output.warn((0, translation_1.t)('noYYet', { name: 'deployments' }));
        cli_1.output.log((0, translation_1.t)('youCanDoXUsingFolCmd', { action: (0, translation_1.t)('deployNewFunction') }));
        cli_1.output.log('fleek functions deploy');
        return;
    }
    cli_1.output.table(deployments.map((d) => ({
        ID: d.id,
        CID: d.cid,
        'Created At': d.createdAt,
    })));
};
exports.listDeploymentsActionHandler = (0, withGuards_1.withGuards)(listDeploymentsAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=listDeployments.js.map