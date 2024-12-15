"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActionHandler = void 0;
const utils_ipns_1 = require("@fleek-platform/utils-ipns");
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getSiteToAssignRecordOrPrompt_1 = require("./prompts/getSiteToAssignRecordOrPrompt");
const createAction = async ({ sdk, args, }) => {
    const site = await (0, getSiteToAssignRecordOrPrompt_1.getSiteToAssignRecordOrPrompt)({
        sdk,
        siteId: args.siteId,
        siteSlug: args.siteSlug,
    });
    const record = site
        ? await sdk.ipns().createRecordForSite({ siteId: site.id })
        : await sdk.ipns().createRecord();
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('ipnsCreatedIPNSHash', { hash: record.name }));
    cli_1.output.printNewLine();
    if (site) {
        cli_1.output.chore((0, translation_1.t)('ipnsRecordToPublishAuto', { name: site.name }));
    }
    else {
        cli_1.output.hint((0, translation_1.t)('youCanDoXUsingFolCmd', { action: (0, translation_1.t)('publishIPNSRecord') }));
        cli_1.output.log(`fleek ipns publish --name ${record.name} --hash <ipfsCid>`);
        cli_1.output.printNewLine();
    }
    cli_1.output.hint(`${(0, translation_1.t)('ipnsAfterPubRecordVisitGw')}:`);
    cli_1.output.link((0, utils_ipns_1.getIpnsGatewayUrl)(record.name));
};
exports.createActionHandler = (0, withGuards_1.withGuards)(createAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=create.js.map