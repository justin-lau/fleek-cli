"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translation_1 = require("../../utils/translation");
const ci_1 = require("./ci");
const deploy_1 = require("./deploy");
const init_1 = require("./init");
const list_1 = require("./list");
const listDeployments_1 = require("./listDeployments");
exports.default = (program) => {
    const cmd = program.command('sites').description((0, translation_1.t)('sitesDescription'));
    cmd
        .command('init')
        .description((0, translation_1.t)('sitesInitDescription'))
        .action(() => (0, init_1.initActionHandler)());
    cmd
        .command('ci')
        .description((0, translation_1.t)('genConfForCIProviders'))
        .option('-c, --config <fleekConfigPath>', (0, translation_1.t)('specifyFleekJsonPath'))
        .option('-p, --provider <provider>', (0, translation_1.t)('specifyCIProvider'))
        .action((options) => (0, ci_1.ciActionHandler)({
        predefinedConfigPath: options.config,
        provider: options.provider,
    }));
    cmd
        .command('deploy')
        .description((0, translation_1.t)('deploySite'))
        .option('-c, --config <fleekConfigPath>', (0, translation_1.t)('deploySpecifyPathJson'))
        .action((options) => (0, deploy_1.deployActionHandler)({ predefinedConfigPath: options.config }));
    cmd
        .command('list')
        .description((0, translation_1.t)('listSitesDesc'))
        .action(() => (0, list_1.listActionHandler)());
    cmd
        .command('deployments')
        .option('--slug <string>', (0, translation_1.t)('nameOfWichDeploymentsBelong', { name: (0, translation_1.t)('humanReadableSlugDesc') }))
        .option('--id <string>', (0, translation_1.t)('nameOfWichDeploymentsBelong', { name: (0, translation_1.t)('uniqueIdentifier') }))
        .description((0, translation_1.t)('deploymentsListForSelectedSite'))
        .action((options) => (0, listDeployments_1.listDeploymentsActionHandler)(options));
    return cmd;
};
//# sourceMappingURL=index.js.map