"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveInstallCommandFromLockfile = void 0;
const node_fs_1 = require("node:fs");
const cli_1 = require("../../../cli");
const translation_1 = require("../../../utils/translation");
const lockToInstallCommandMap = {
    'yarn.lock': 'npm install -g yarn && yarn install',
    'pnpm-lock.yaml': 'npm install -g pnpm && pnpm install',
    'package-lock.json': 'npm install',
};
const deriveInstallCommandFromLockfile = async () => {
    const directoryContents = await node_fs_1.promises.readdir(process.cwd());
    const lockFile = directoryContents.find((file) => file.includes('lock'));
    if (!lockFile) {
        cli_1.output.warn((0, translation_1.t)('noLockfileFound'));
        return;
    }
    return lockToInstallCommandMap[lockFile];
};
exports.deriveInstallCommandFromLockfile = deriveInstallCommandFromLockfile;
//# sourceMappingURL=deriveInstallCommandFromLockfile.js.map