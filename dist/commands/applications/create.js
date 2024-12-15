"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicationActionHandler = exports.createApplicationAction = exports.whitelistArgParser = void 0;
const utils_validation_1 = require("@fleek-platform/utils-validation");
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const promptUntil_1 = require("../../utils/prompts/promptUntil");
const translation_1 = require("../../utils/translation");
const enterApplicationNameOrPrompt_1 = require("./prompts/enterApplicationNameOrPrompt");
const getWhitelistDomainsOrPrompt_1 = require("./prompts/getWhitelistDomainsOrPrompt");
const whitelistArgParser = (listArg) => {
    try {
        if (!Array.isArray(listArg)) {
            // eslint-disable-next-line fleek-custom/no-default-error
            throw new Error((0, translation_1.t)('unexpectedArg'));
        }
        return listArg[0].split(',').reduce((acc, curr) => {
            acc.push(curr.trim());
            return acc;
        }, []);
    }
    catch (err) {
        if (err instanceof Error) {
            cli_1.output.error(err.message);
            return;
        }
        // eslint-disable-next-line fleek-custom/no-default-error
        throw Error((0, translation_1.t)('unexpectedError'));
    }
};
exports.whitelistArgParser = whitelistArgParser;
const createApplicationAction = async ({ sdk, args }) => {
    const isNonInteractive = !!Object.keys(args).length;
    const name = isNonInteractive
        ? args.name
        : await (0, enterApplicationNameOrPrompt_1.enterApplicationNameOrPrompt)({ name: args.name });
    let whitelistDomains;
    if (isNonInteractive) {
        whitelistDomains = (0, exports.whitelistArgParser)(args.whitelistDomains);
    }
    else {
        const handler = async () => (0, getWhitelistDomainsOrPrompt_1.getWhitelistDomainsOrPrompt)({
            whitelistDomains: args.whitelistDomains,
        });
        const validator = async (data) => {
            let hasInvalidHostname = false;
            for (const hostname of data) {
                if (!(0, utils_validation_1.isHostnameValid)({ hostname })) {
                    hasInvalidHostname = true;
                    cli_1.output.warn((0, translation_1.t)('invalidHostname', { hostname }));
                }
            }
            // If error messages displayed
            // show a new line to make it easier to read
            if (hasInvalidHostname) {
                cli_1.output.printNewLine();
            }
            return !hasInvalidHostname;
        };
        whitelistDomains = await (0, promptUntil_1.promptUntil)({
            handler,
            validator,
        });
    }
    if (!name || !whitelistDomains) {
        cli_1.output.error((0, translation_1.t)('unexpectedError'));
        return;
    }
    // Warning: The whiteLabelDomains is deprecated and due to
    // retroactive support requirements, the SDK applications create
    // copies the data over from the new field to old. So, its not
    // required to pass whiteLabelDomains here.
    const { clientId } = await sdk
        .applications()
        .create({ name, whitelistDomains });
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('appCreateSuccessClientId', { clientId }));
    cli_1.output.printNewLine();
};
exports.createApplicationAction = createApplicationAction;
exports.createApplicationActionHandler = (0, withGuards_1.withGuards)(exports.createApplicationAction, {
    scopes: { authenticated: true, project: true, site: false },
});
//# sourceMappingURL=create.js.map