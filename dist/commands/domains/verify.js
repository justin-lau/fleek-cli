"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDomainActionHandler = exports.verifyDomainAction = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getDomainOrPrompt_1 = require("./prompts/getDomainOrPrompt");
const waitForDomainVerificationResult_1 = require("./wait/waitForDomainVerificationResult");
const verifyDomainAction = async ({ sdk, args }) => {
    const domain = await (0, getDomainOrPrompt_1.getDomainOrPrompt)({
        id: args.id,
        hostname: args.hostname,
        sdk,
        choicesFilter: (domain) => domain.isVerified,
    });
    if (!domain) {
        cli_1.output.error((0, translation_1.t)('noEnsRecordFoundUnexpectedly'));
        return;
    }
    if (domain.status === 'ACTIVE') {
        cli_1.output.success((0, translation_1.t)('domainAlreadyVerified', { hostname: domain.hostname }));
        cli_1.output.printNewLine();
        return;
    }
    cli_1.output.spinner((0, translation_1.t)('verifyingDomain'));
    await sdk.domains().verifyDomain({ domainId: domain.id });
    const verificationResultStatus = await (0, waitForDomainVerificationResult_1.waitForDomainVerificationResult)({
        domain,
        sdk,
    });
    if (!verificationResultStatus) {
        cli_1.output.warn((0, translation_1.t)('warnSubjectProcessIsLong', {
            subject: (0, translation_1.t)('processOfDomainVerification'),
        }));
        cli_1.output.printNewLine();
        cli_1.output.log(`${(0, translation_1.t)('commonWaitAndCheckStatusViaCmd', { subject: (0, translation_1.t)('deploymentStatus') })}`);
        cli_1.output.log(cli_1.output.textColor(`fleek domains detail ${domain.hostname}`, 'cyan'));
        return;
    }
    if (verificationResultStatus === 'VERIFYING_FAILED') {
        cli_1.output.printNewLine();
        cli_1.output.error((0, translation_1.t)('domainVerificationFailureCheckDns', { hostname: domain.hostname }));
        cli_1.output.printNewLine();
        return;
    }
    cli_1.output.success((0, translation_1.t)('domainVerified', { hostname: domain.hostname }));
    cli_1.output.printNewLine();
};
exports.verifyDomainAction = verifyDomainAction;
exports.verifyDomainActionHandler = (0, withGuards_1.withGuards)(exports.verifyDomainAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=verify.js.map