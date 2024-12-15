"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationActionHandler = void 0;
const utils_validation_1 = require("@fleek-platform/utils-validation");
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const promptUntil_1 = require("../../utils/prompts/promptUntil");
const translation_1 = require("../../utils/translation");
const enterApplicationNameOrPrompt_1 = require("./prompts/enterApplicationNameOrPrompt");
const getApplicationOrPrompt_1 = require("./prompts/getApplicationOrPrompt");
const getWhitelistDomainsOrPrompt_1 = require("./prompts/getWhitelistDomainsOrPrompt");
const updateApplicationAction = async ({ sdk, args }) => {
    const application = await (0, getApplicationOrPrompt_1.getApplicationOrPrompt)({ id: args.id, sdk });
    if (!application) {
        cli_1.output.error((0, translation_1.t)('noAppFoundUnexpectedly'));
        return;
    }
    const name = await (0, enterApplicationNameOrPrompt_1.enterApplicationNameOrPrompt)({
        name: args.name,
        application,
    });
    const handler = async () => (0, getWhitelistDomainsOrPrompt_1.getWhitelistDomainsOrPrompt)({
        whitelistDomains: args.whitelistDomains,
        whitelistDomainsToUpdate: application.whitelistDomains.map((whitelistDomain) => whitelistDomain.hostname),
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
    const whitelistDomains = await (0, promptUntil_1.promptUntil)({
        handler,
        validator,
    });
    // Warning: The WhiteLabelDomains has been deprecated
    // the sdk applications update copies new to old for
    // retroactivity support.
    await sdk
        .applications()
        .update({ id: application.id, name, whitelistDomains });
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('appClientSuccessUpdated'));
};
exports.updateApplicationActionHandler = (0, withGuards_1.withGuards)(updateApplicationAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=update.js.map