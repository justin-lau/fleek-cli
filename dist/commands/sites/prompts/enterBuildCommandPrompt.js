"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterBuildCommandPrompt = void 0;
const node_fs_1 = require("node:fs");
const textPrompt_1 = require("../../../prompts/textPrompt");
const enterBuildCommandPrompt = async () => (0, textPrompt_1.textPrompt)({
    message: 'Specify `build` command:',
    initial: await tryToGetBuildCommand(),
});
exports.enterBuildCommandPrompt = enterBuildCommandPrompt;
const tryToGetBuildCommand = async () => {
    const filesInRootDir = await node_fs_1.promises.readdir(process.cwd());
    // NPM
    if (filesInRootDir.includes('package-lock.json')) {
        return 'npm run build';
    }
    // PNPM
    if (filesInRootDir.includes('pnpm-lock.yaml') ||
        filesInRootDir.includes('pnpm-workspace.yaml')) {
        return 'pnpm run build';
    }
    // YARN
    if (filesInRootDir.includes('yarn.lock')) {
        return 'yarn run build';
    }
    return;
};
//# sourceMappingURL=enterBuildCommandPrompt.js.map