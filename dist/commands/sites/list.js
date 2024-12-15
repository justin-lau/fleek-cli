"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listActionHandler = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const listAction = async ({ sdk }) => {
    const sites = await sdk.sites().list();
    if (!sites?.length) {
        cli_1.output.warn((0, translation_1.t)('noSitesYet'));
        cli_1.output.log((0, translation_1.t)('youCanDoXUsingFolCmd', { action: (0, translation_1.t)('createNewSite') }));
        cli_1.output.log('fleek sites init');
        return;
    }
    cli_1.output.table(sites.map((site) => ({
        Name: site.name,
        Slug: site.slug,
        ID: site.id,
    })));
};
exports.listActionHandler = (0, withGuards_1.withGuards)(listAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=list.js.map