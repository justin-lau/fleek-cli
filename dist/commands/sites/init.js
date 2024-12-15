"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initActionHandler = void 0;
const errors_1 = require("@fleek-platform/errors");
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const loadConfiguration_1 = require("../../utils/configuration/loadConfiguration");
const translation_1 = require("../../utils/translation");
const confirmFileOverridePrompt_1 = require("./prompts/confirmFileOverridePrompt");
const chooseOrCreateSite_1 = require("./utils/chooseOrCreateSite");
const initConfiguration_1 = require("./utils/initConfiguration");
const initAction = async ({ sdk }) => {
    const configLoadingResult = await (0, loadConfiguration_1.loadConfiguration)({})
        .then(() => {
        return { isContentValid: true, isFilePresent: true };
    })
        .catch((e) => {
        if (e instanceof errors_1.FleekConfigInvalidContentError) {
            return {
                isContentValid: false,
                isFilePresent: true,
                configPath: e.data.configPath,
            };
        }
        if (e instanceof errors_1.FleekConfigMissingFileError) {
            return { isContentValid: false, isFilePresent: false };
        }
        throw e;
    });
    if (configLoadingResult.isContentValid && configLoadingResult.isFilePresent) {
        cli_1.output.error((0, translation_1.t)('configFileExists'));
        cli_1.output.printNewLine();
        cli_1.output.log((0, translation_1.t)('siteAlreadyExists'));
        return;
    }
    if (!configLoadingResult.isContentValid &&
        configLoadingResult.isFilePresent) {
        const overrideInvalidConfig = await (0, confirmFileOverridePrompt_1.confirmFileOverridePrompt)({
            path: configLoadingResult.configPath,
        });
        if (!overrideInvalidConfig) {
            return;
        }
    }
    const site = await (0, chooseOrCreateSite_1.chooseOrCreateSite)({ sdk });
    if (!site) {
        cli_1.output.error((0, translation_1.t)('unexpectedError'));
        return;
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
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('fleekConfigSaved'));
    cli_1.output.printNewLine();
};
exports.initActionHandler = (0, withGuards_1.withGuards)(initAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=init.js.map