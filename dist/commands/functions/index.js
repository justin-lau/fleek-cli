"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translation_1 = require("../../utils/translation");
const create_1 = require("./create");
const delete_1 = require("./delete");
const deploy_1 = require("./deploy");
const list_1 = require("./list");
const listDeployments_1 = require("./listDeployments");
const update_1 = require("./update");
exports.default = (program) => {
    const cmd = program
        .command('functions')
        .description((0, translation_1.t)('functionsDescription'));
    cmd
        .command('create')
        .option('-n, --name <functionName>', (0, translation_1.t)('functionName'))
        .option('--site <siteId>', (0, translation_1.t)('functionsSite'))
        .description((0, translation_1.t)('functionsCreateDescription'))
        .action((options) => (0, create_1.createActionHandler)({ name: options.name, siteId: options.site }));
    cmd
        .command('delete')
        .description((0, translation_1.t)('functionsDeleteDescription'))
        .option('-n, --name <functionName>', (0, translation_1.t)('functionName'))
        .action((options) => (0, delete_1.deleteActionHandler)({ name: options.name }));
    cmd
        .command('update')
        .description((0, translation_1.t)('functionsUpdateDescription'))
        .option('-n, --functionName <functionName>', (0, translation_1.t)('functionName'))
        .option('--name <newName>', (0, translation_1.t)('functionName'))
        .option('--slug <newSlug>', (0, translation_1.t)('functionSlug'))
        .option('--status <newStatus>', (0, translation_1.t)('functionStatus'))
        .action((options) => (0, update_1.updateActionHandler)({
        functionName: options.functionName,
        name: options.name,
        slug: options.slug,
        status: options.status,
    }));
    cmd
        .command('deploy')
        .description((0, translation_1.t)('deployFunction'))
        .option('-p, --path <functionCodePath>', (0, translation_1.t)('functionCodePath'))
        .option('-n, --name <functionName>', (0, translation_1.t)('functionName'))
        .option('-b, --bundle <bundle>', (0, translation_1.t)('bundleCmd'), true)
        .option('--private', (0, translation_1.t)('functionDeployToPrivateStorage'), false)
        .option('-e, --env <environmentVariables...>', (0, translation_1.t)('environmentVariables'))
        .option('--sgx', (0, translation_1.t)('functionsUseSgx'), false)
        .option('-a --assets <assetsPath>', (0, translation_1.t)('functionsUseAssets'), false)
        .option('--envFile <environmentVariablesFilePath>', (0, translation_1.t)('environmentVariablesFile'))
        .action((options) => (0, deploy_1.deployActionHandler)({
        filePath: options.path,
        name: options.name,
        bundle: options.bundle,
        private: options.private,
        env: options.env ?? [],
        envFile: options.envFile,
        sgx: options.sgx,
        assetsPath: options.assets,
    }));
    cmd
        .command('list')
        .description((0, translation_1.t)('listFunctionsDesc'))
        .action(() => (0, list_1.listActionHandler)());
    cmd
        .command('deployments')
        .option('-n, --name <functionName>', (0, translation_1.t)('functionName'))
        .description((0, translation_1.t)('deploymentsListForSelectedFunction'))
        .action((options) => (0, listDeployments_1.listDeploymentsActionHandler)(options));
    return cmd;
};
//# sourceMappingURL=index.js.map