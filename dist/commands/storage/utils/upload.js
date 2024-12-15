"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadStorage = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const uploadOnProgress_1 = require("../../../output/utils/uploadOnProgress");
const uploadStorage = async ({ path, sdk, files, directoryName, progressBar, onFailure, }) => {
    try {
        const stat = await promises_1.default.stat(path);
        if (stat.isDirectory()) {
            return sdk.storage().uploadVirtualDirectory({
                files,
                directoryName,
                onUploadProgress: (0, uploadOnProgress_1.uploadOnProgress)(progressBar),
            });
        }
        // TODO: The progressBar is displayed twice
        // seem like different instances
        // where one is initialized purposely on set 0
        // investigate why this is
        return sdk.storage().uploadFile({
            file: files[0],
            onUploadProgress: (0, uploadOnProgress_1.uploadOnProgress)(progressBar),
        });
    }
    catch {
        if (typeof onFailure === 'function') {
            onFailure();
        }
    }
    return;
};
exports.uploadStorage = uploadStorage;
//# sourceMappingURL=upload.js.map