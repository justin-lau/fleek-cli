"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommandAndForwardOutput = void 0;
const node_child_process_1 = require("node:child_process");
const runCommandAndForwardOutput = async (buildCommand) => {
    const buildCommandProcess = (0, node_child_process_1.exec)(buildCommand);
    buildCommandProcess.stdout?.on('data', console.log);
    buildCommandProcess.stderr?.on('data', console.log);
    return new Promise((resolve) => {
        buildCommandProcess.on('close', (exitCode) => resolve(exitCode ?? 0));
    });
};
exports.runCommandAndForwardOutput = runCommandAndForwardOutput;
//# sourceMappingURL=runCommandAndForwardOutput.js.map