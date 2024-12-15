"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveActionHandler = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const resolveAction = async ({ sdk, args, }) => {
    const res = await sdk.ipns().resolveName({ name: args.name });
    const hash = res.replace('/ipfs/', '');
    cli_1.output.success((0, translation_1.t)('ipnsResultHashIs', { hash }));
    cli_1.output.printNewLine();
};
exports.resolveActionHandler = (0, withGuards_1.withGuards)(resolveAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=resolve.js.map