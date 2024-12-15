"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSite = void 0;
const cli_1 = require("../../../cli");
const translation_1 = require("../../../utils/translation");
const enterSiteNamePrompt_1 = require("../prompts/enterSiteNamePrompt");
const createSite = async ({ sdk }) => {
    const name = await (0, enterSiteNamePrompt_1.enterSiteNamePrompt)();
    cli_1.output.spinner(`${(0, translation_1.t)('creatingSite')}...`);
    const site = await sdk.sites().create({ name });
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('commonNameCreateSuccess', { name: `${(0, translation_1.t)('site')} "${name}"` }));
    cli_1.output.printNewLine();
    return site;
};
exports.createSite = createSite;
//# sourceMappingURL=createSite.js.map