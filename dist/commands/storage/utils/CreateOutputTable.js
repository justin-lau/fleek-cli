"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOutputTable = void 0;
const utils_ipfs_1 = require("@fleek-platform/utils-ipfs");
const getAllPrivateGatewayDomains_1 = require("../../gateways/utils/getAllPrivateGatewayDomains");
const createOutputTable = async ({ sdk, storage, }) => {
    const privateGatewayDomains = await (0, getAllPrivateGatewayDomains_1.getAllActivePrivateGatewayDomains)({
        sdk,
    });
    const privateGatewayExists = privateGatewayDomains.length > 0;
    return storage.flatMap((s) => {
        const filename = `${s.filename}${s.extension ? `.${s.extension}` : ''}`;
        const gatewayUrls = privateGatewayExists
            ? privateGatewayDomains.map((privateGatewayDomain) => (0, utils_ipfs_1.getPrivateIpfsGatewayUrl)({
                hostname: privateGatewayDomain.hostname,
                hash: s.cid,
            }))
            : [(0, utils_ipfs_1.getFleekXyzIpfsGatewayUrl)(s.cid)];
        return gatewayUrls.map((link) => ({
            filename,
            cid: s.cid,
            'filecoin id': s.filecoinDealIds,
            'arweave id': s.arweaveId,
            link,
        }));
    });
};
exports.createOutputTable = createOutputTable;
//# sourceMappingURL=CreateOutputTable.js.map