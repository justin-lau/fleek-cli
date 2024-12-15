"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnsActionHandler = exports.createEnsAction = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const pressAnyKey_1 = require("../../utils/pressAnyKey");
const translation_1 = require("../../utils/translation");
const getSiteOrPrompt_1 = require("../sites/prompts/getSiteOrPrompt");
const getEnsNameOrPrompt_1 = require("./prompts/getEnsNameOrPrompt");
const getIpnsRecordOrPrompt_1 = require("./prompts/getIpnsRecordOrPrompt");
const waitForEnsRecordCreationResult_1 = require("./wait/waitForEnsRecordCreationResult");
const waitForEnsRecordVerificationResult_1 = require("./wait/waitForEnsRecordVerificationResult");
const createEnsAction = async ({ sdk, args, }) => {
    const site = await (0, getSiteOrPrompt_1.getSiteOrPrompt)({
        id: args.siteId,
        slug: args.siteSlug,
        sdk,
    });
    if (!site) {
        cli_1.output.error((0, translation_1.t)('expectedNotFoundGeneric', { name: 'site' }));
        return;
    }
    const ipnsRecord = await (0, getIpnsRecordOrPrompt_1.getIpnsRecordOrPrompt)({
        name: args.ipns,
        sdk,
        siteId: site.id,
    });
    if (!ipnsRecord) {
        cli_1.output.error((0, translation_1.t)('noDomainsFoundUnexpectedly'));
        return;
    }
    const ensName = await (0, getEnsNameOrPrompt_1.getEnsNameOrPrompt)({ name: args.name });
    cli_1.output.spinner((0, translation_1.t)('ensCreatingForSelectSite'));
    const ensRecord = await sdk
        .ens()
        .create({ name: ensName, siteId: site.id, ipnsRecordId: ipnsRecord.id });
    const ensCreationStatus = await (0, waitForEnsRecordCreationResult_1.waitForEnsRecordCreationResult)({
        sdk,
        id: ensRecord.id,
    });
    if (ensCreationStatus === null) {
        cli_1.output.warn((0, translation_1.t)('warnSubjectProcessIsLong', {
            subject: (0, translation_1.t)('processOfObtainHashForENS'),
        }));
        cli_1.output.printNewLine();
        cli_1.output.log(`${(0, translation_1.t)('commonWaitAndCheckStatusViaCmd', { subject: (0, translation_1.t)('ensConf') })}`);
        cli_1.output.log(cli_1.output.textColor(`fleek ens detail ${ensName}`, 'cyan'));
        return;
    }
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('commonNameCreateSuccess', { name: `ENS "${ensName}"` }));
    cli_1.output.printNewLine();
    cli_1.output.hint((0, translation_1.t)('ensFollowLinkUpdateRec', { ipnsRecordName: ipnsRecord.name }));
    cli_1.output.link(`https://app.ens.domains/${ensName}?tab=records`);
    cli_1.output.printNewLine();
    const { waitForAnyKey } = (0, pressAnyKey_1.usePressAnyKey)();
    while (true) {
        cli_1.output.log((0, translation_1.t)('ensPressAnyKeyOnceENSConfig'));
        await waitForAnyKey();
        cli_1.output.spinner((0, translation_1.t)('ensVerifying'));
        await sdk.ens().verify({ id: ensRecord.id });
        const verificationResultStatus = await (0, waitForEnsRecordVerificationResult_1.waitForEnsRecordVerificationResult)({
            id: ensRecord.id,
            sdk,
        });
        if (!verificationResultStatus) {
            cli_1.output.warn((0, translation_1.t)('warnSubjectProcessIsLong', {
                subject: (0, translation_1.t)('processOfENSVerification'),
            }));
            cli_1.output.printNewLine();
            cli_1.output.log(`${(0, translation_1.t)('commonWaitAndCheckStatusViaCmd', { subject: (0, translation_1.t)('ensConf') })}`);
            cli_1.output.log(cli_1.output.textColor(`fleek ens detail ${ensName}`, 'cyan'));
            return;
        }
        if (verificationResultStatus === 'ACTIVE') {
            cli_1.output.success((0, translation_1.t)('ensVerified', { ensName }));
            cli_1.output.printNewLine();
            return;
        }
        cli_1.output.error((0, translation_1.t)('ensCouldNotVerifyCheckURL', { ensRecordName: ensName }));
        cli_1.output.printNewLine();
    }
};
exports.createEnsAction = createEnsAction;
exports.createEnsActionHandler = (0, withGuards_1.withGuards)(exports.createEnsAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=create.js.map