"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFunctionAssets = void 0;
const utils_validation_1 = require("@fleek-platform/utils-validation");
const cli_1 = require("../../../cli");
const translation_1 = require("../../../utils/translation");
const uploadFunctionAssets = async ({ sdk, assetsPath, functionName, }) => {
    if (!assetsPath) {
        return;
    }
    if (!(await (0, utils_validation_1.isValidFolder)(assetsPath))) {
        cli_1.output.error((0, translation_1.t)('assetsPathIsNotAFolder'));
        return;
    }
    try {
        cli_1.output.spinner((0, translation_1.t)('uploadingAssets'));
        const result = await sdk.storage().uploadDirectory({
            path: assetsPath,
            options: {
                functionName,
            },
        });
        cli_1.output.success((0, translation_1.t)('assetsUploadSuccess'));
        return result.pin.cid;
    }
    catch (error) {
        cli_1.output.error((0, translation_1.t)('uploadAssetsFailed'));
        throw error;
    }
};
exports.uploadFunctionAssets = uploadFunctionAssets;
//# sourceMappingURL=uploadFunctionAssets.js.map