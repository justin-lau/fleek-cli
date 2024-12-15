"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sitesGuard = void 0;
const cli_1 = require("../cli");
const chooseOrCreateSite_1 = require("../commands/sites/utils/chooseOrCreateSite");
const initConfiguration_1 = require("../commands/sites/utils/initConfiguration");
const loadConfiguration_1 = require("../utils/configuration/loadConfiguration");
const translation_1 = require("../utils/translation");
const sdkGuard_1 = require("./sdkGuard");
const sitesGuard = async ({ predefinedConfigPath, }) => {
    const isConfigValid = await (async () => {
        try {
            return !!(await (0, loadConfiguration_1.loadConfiguration)({ predefinedConfigPath }));
        }
        catch (_err) {
            return false;
        }
    })();
    if (!isConfigValid) {
        cli_1.output.hint((0, translation_1.t)('createValidConfAsInstruct'));
        cli_1.output.printNewLine();
        const sdk = (0, sdkGuard_1.getSdkClient)();
        if (!sdk) {
            cli_1.output.error((0, translation_1.t)('unexpectedError'));
            return false;
        }
        const site = await (0, chooseOrCreateSite_1.chooseOrCreateSite)({ sdk });
        if (!site) {
            cli_1.output.error((0, translation_1.t)('unexpectedError'));
            return false;
        }
        await (0, initConfiguration_1.initConfiguration)({
            site,
            onUnexpectedFormatError: (format) => {
                cli_1.output.warn((0, translation_1.t)('unexpectedFileFormat', { format }));
                process.exit(1);
            },
            onSaveConfigurationError: () => {
                cli_1.output.warn((0, translation_1.t)('fsFailedToWriteConfig'));
                process.exit(1);
            },
        });
    }
};
exports.sitesGuard = sitesGuard;
//# sourceMappingURL=sitesGuard.js.map