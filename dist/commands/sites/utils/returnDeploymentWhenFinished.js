"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnDeploymentWhenFinished = void 0;
const returnDeploymentWhenFinished = ({ sdk, deploymentId }) => async () => {
    const deployment = await sdk.sites().getDeployment({ id: deploymentId });
    if (deployment.status === 'RELEASE_COMPLETED' ||
        deployment.status === 'RELEASE_FAILED') {
        return deployment.status;
    }
    return null;
};
exports.returnDeploymentWhenFinished = returnDeploymentWhenFinished;
//# sourceMappingURL=returnDeploymentWhenFinished.js.map