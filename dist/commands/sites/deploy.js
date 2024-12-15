"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployActionHandler = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const loadConfiguration_1 = require("../../utils/configuration/loadConfiguration");
const translation_1 = require("../../utils/translation");
const runCommandAndForwardOutput_1 = require("./utils/runCommandAndForwardOutput");
const waitUntilDeploymentFinishedAndInformUser_1 = require("./utils/waitUntilDeploymentFinishedAndInformUser");
const deployAction = async ({ sdk, args: { predefinedConfigPath }, }) => {
    const config = await (0, loadConfiguration_1.loadConfiguration)({ predefinedConfigPath });
    const siteConfig = config.sites[0];
    const site = await sdk.sites().getBySlug({ slug: siteConfig.slug });
    if (siteConfig.buildCommand) {
        const exitCode = await (0, runCommandAndForwardOutput_1.runCommandAndForwardOutput)(siteConfig.buildCommand);
        if (exitCode !== 0) {
            cli_1.output.error((0, translation_1.t)('buildCmdFailedSeeErr', { cmd: siteConfig.buildCommand }));
            cli_1.output.printNewLine();
            process.exit(exitCode);
        }
    }
    cli_1.output.spinner((0, translation_1.t)('uploadingFiles'));
    const uploadResults = await sdk.ipfs().addSitesToIpfs(siteConfig.distDir, {
        wrapWithDirectory: true,
        // We must pass plain object instead of URLSearchParams because of ipfs-http-client bug
        searchParams: { site_id: site.id },
    });
    const root = uploadResults.pop();
    if (!root) {
        cli_1.output.error((0, translation_1.t)('somethingWrongDurUpload'));
        cli_1.output.printNewLine();
        process.exit(1);
    }
    cli_1.output.spinner((0, translation_1.t)('startingSiteDeployment'));
    const hash = root.cid.toString();
    const deployment = await sdk
        .sites()
        .createCustomIpfsDeployment({ cid: hash, siteId: site.id });
    await (0, waitUntilDeploymentFinishedAndInformUser_1.waitUntilDeploymentFinishedAndInformUser)({
        sdk,
        deploymentId: deployment.id,
        siteId: site.id,
        slug: site.slug,
        hostname: site.primaryDomain?.hostname,
        hash,
        output: cli_1.output,
    });
};
exports.deployActionHandler = (0, withGuards_1.withGuards)(deployAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: true,
    },
});
//# sourceMappingURL=deploy.js.map