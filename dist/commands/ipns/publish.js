"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishActionHandler = void 0;
const utils_ipns_1 = require("@fleek-platform/utils-ipns");
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getHashOrPrompt_1 = require("./prompts/getHashOrPrompt");
const getRecordOrPrompt_1 = require("./prompts/getRecordOrPrompt");
const publishAction = async ({ sdk, args, }) => {
    const record = await (0, getRecordOrPrompt_1.getRecordOrPrompt)({ sdk, name: args.name });
    if (!record) {
        cli_1.output.error((0, translation_1.t)('recordsNotFoundUnexpectedly'));
        return;
    }
    const hash = await (0, getHashOrPrompt_1.getHashOrPrompt)({ hash: args.hash });
    await sdk.ipns().publishRecord({ id: record.id, hash });
    cli_1.output.printNewLine();
    cli_1.output.log(`${(0, translation_1.t)('ipnsVisitPublishedIPNSGw')}:`);
    cli_1.output.link((0, utils_ipns_1.getIpnsGatewayUrl)(record.name));
    cli_1.output.printNewLine();
    cli_1.output.hint((0, translation_1.t)('ipnsPropagationTimeWarn'));
};
exports.publishActionHandler = (0, withGuards_1.withGuards)(publishAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=publish.js.map