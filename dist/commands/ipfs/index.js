"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translation_1 = require("../../utils/translation");
const add_1 = require("./add");
exports.default = (program) => {
    const cmd = program.command('ipfs').description((0, translation_1.t)('ipfsDescription'));
    cmd
        .command('add')
        .description((0, translation_1.t)('ipfsAddDescription'))
        .argument('<path>', (0, translation_1.t)('ipfsAddPathDescription'))
        .action((path) => (0, add_1.addActionHandler)({ path }));
    return cmd;
};
//# sourceMappingURL=index.js.map