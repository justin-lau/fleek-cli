"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listActionHandler = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const listAction = async ({ sdk }) => {
    const functions = await sdk.functions().list();
    if (!functions?.length) {
        cli_1.output.warn((0, translation_1.t)('noYYet', { name: 'functions' }));
        cli_1.output.log((0, translation_1.t)('youCanDoXUsingFolCmd', { action: (0, translation_1.t)('createNewFunction') }));
        cli_1.output.log('fleek functions create');
        return;
    }
    cli_1.output.table(functions.map((f) => ({
        ID: f.id,
        Name: f.name,
        Slug: f.slug,
        InvokeUrl: f.invokeUrl,
        Status: f.status,
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