"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listDeploymentsActionHandler = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getSiteOrPrompt_1 = require("./prompts/getSiteOrPrompt");
const printDeploymentsTable_1 = require("./utils/printDeploymentsTable");
const listDeploymentsAction = async ({ sdk, args }) => {
    const site = await (0, getSiteOrPrompt_1.getSiteOrPrompt)({ id: args.id, slug: args.slug, sdk });
    if (!site) {
        cli_1.output.error((0, translation_1.t)('expectedNotFoundGeneric', { name: 'site' }));
        return;
    }
    (0, printDeploymentsTable_1.printDeploymentsTable)({ output: cli_1.output, deployments: site.deployments });
};
exports.listDeploymentsActionHandler = (0, withGuards_1.withGuards)(listDeploymentsAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=listDeployments.js.map