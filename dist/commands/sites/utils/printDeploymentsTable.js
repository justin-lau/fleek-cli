"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDeploymentsTable = void 0;
const translation_1 = require("../../../utils/translation");
const printDeploymentsTable = ({ output, deployments, }) => {
    if (deployments.length === 0) {
        output.warn((0, translation_1.t)('noYForXYet', { name: (0, translation_1.t)('deployments'), subject: (0, translation_1.t)('site') }));
        return;
    }
    output.table(deployments.map(({ id, createdAt, updatedAt, status, cid }) => ({
        ID: id,
        'Created At': createdAt,
        'Updated At': updatedAt,
        Status: status,
        CID: cid,
    })));
};
exports.printDeploymentsTable = printDeploymentsTable;
//# sourceMappingURL=printDeploymentsTable.js.map