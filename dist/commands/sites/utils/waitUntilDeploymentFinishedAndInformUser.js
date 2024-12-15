"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitUntilDeploymentFinishedAndInformUser = void 0;
const utils_gateways_1 = require("@fleek-platform/utils-gateways");
const checkPeriodicallyUntil_1 = require("../../../utils/checkPeriodicallyUntil");
const translation_1 = require("../../../utils/translation");
const returnDeploymentWhenFinished_1 = require("./returnDeploymentWhenFinished");
const waitUntilDeploymentFinishedAndInformUser = async ({ sdk, siteId, slug, hostname, deploymentId, hash, output, }) => {
    const deploymentStatus = await (0, checkPeriodicallyUntil_1.checkPeriodicallyUntil)({
        conditionFn: (0, returnDeploymentWhenFinished_1.returnDeploymentWhenFinished)({ sdk, deploymentId }),
        period: 6000,
        tries: 30,
    });
    if (!deploymentStatus) {
        output.warn((0, translation_1.t)('warnSubjectProcessIsLong', { subject: (0, translation_1.t)('processOfDeployment') }));
        output.printNewLine();
        output.log(`${(0, translation_1.t)('commonWaitAndCheckStatusViaCmd', { subject: (0, translation_1.t)('deploymentStatus') })}`);
        output.log(output.textColor(`fleek sites deployments --id ${siteId}`, 'cyan'));
        return;
    }
    if (deploymentStatus === 'RELEASE_FAILED') {
        output.error((0, translation_1.t)('deployNotFinishTryAgain'));
        output.printNewLine();
        process.exit(1);
    }
    output.success(`${(0, translation_1.t)('deployed')}!`);
    output.printNewLine();
    output.log((0, translation_1.t)('siteIPFSCid', { hash }));
    output.hint(`${(0, translation_1.t)('visitViaGateway')}:`);
    output.link(hostname ? `https://${hostname}` : (0, utils_gateways_1.getFleekDefaultGatewayBySlug)({ slug }));
};
exports.waitUntilDeploymentFinishedAndInformUser = waitUntilDeploymentFinishedAndInformUser;
//# sourceMappingURL=waitUntilDeploymentFinishedAndInformUser.js.map