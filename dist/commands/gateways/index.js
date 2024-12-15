"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translation_1 = require("../../utils/translation");
const create_1 = require("./create");
const delete_1 = require("./delete");
const detail_1 = require("./detail");
const list_1 = require("./list");
exports.default = (program) => {
    const cmd = program
        .command('gateways')
        .description((0, translation_1.t)('gatewaysCmdDescription'));
    cmd
        .command('list')
        .description((0, translation_1.t)('listAllPrvGwForSelectProject'))
        .action(() => (0, list_1.listPrivateGatewaysActionHandler)());
    cmd
        .command('detail')
        .option('--id <string>', (0, translation_1.t)('nameOfSubjectForDetails', {
        name: (0, translation_1.t)('id'),
        subject: (0, translation_1.t)('privateGateway'),
    }))
        .option('--slug <string>', (0, translation_1.t)('nameOfSubjectForDetails', {
        name: (0, translation_1.t)('sdkPoweredApp'),
        subject: (0, translation_1.t)('privateGateway'),
    }))
        .description((0, translation_1.t)('gatewayShowDetails'))
        .action((options) => (0, detail_1.detailPrivateGatewayActionHandler)(options));
    cmd
        .command('create')
        .option('--name <string>', (0, translation_1.t)('gatewayCreateName'))
        .description((0, translation_1.t)('gatewayCreateCmdDesc'))
        .action((options) => (0, create_1.createPrivateGatewayActionHandler)(options));
    cmd
        .command('delete')
        .option('--id <string>', (0, translation_1.t)('commonNameOfSubjectToAction', {
        name: (0, translation_1.t)('id'),
        subject: (0, translation_1.t)('privateGateway'),
        action: (0, translation_1.t)('delete'),
    }))
        .option('--slug <string>', (0, translation_1.t)('commonNameOfSubjectToAction', {
        name: (0, translation_1.t)('humanReadableSlugDesc'),
        subject: (0, translation_1.t)('privateGateway'),
        action: (0, translation_1.t)('delete'),
    }))
        .description((0, translation_1.t)('gatewayDelete'))
        .action((options) => (0, delete_1.deletePrivateGatewayActionHandler)(options));
    return cmd;
};
//# sourceMappingURL=index.js.map