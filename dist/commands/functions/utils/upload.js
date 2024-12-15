"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploadResult = void 0;
const uploadOnProgress_1 = require("../../../output/utils/uploadOnProgress");
const getJsCodeFromPath_1 = require("./getJsCodeFromPath");
const getUploadResult = async ({ filePath, functionName, isPrivate, progressBar, sdk, onFailure, }) => {
    try {
        if (isPrivate) {
            return await sdk.storage().uploadPrivateFile({
                filePath,
                onUploadProgress: (0, uploadOnProgress_1.uploadOnProgress)(progressBar),
            });
        }
        const fileLikeObject = (await (0, getJsCodeFromPath_1.getFileLikeObject)(filePath));
        return await sdk.storage().uploadFile({
            file: fileLikeObject,
            options: { functionName },
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
exports.getUploadResult = getUploadResult;
//# sourceMappingURL=upload.js.map