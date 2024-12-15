"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEnsRecordActionHandler = exports.verifyEnsRecordAction = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getEnsRecordOrPrompt_1 = require("./prompts/getEnsRecordOrPrompt");
const waitForEnsRecordVerificationResult_1 = require("./wait/waitForEnsRecordVerificationResult");
const verifyEnsRecordAction = async ({ sdk, args }) => {
    const ensRecord = await (0, getEnsRecordOrPrompt_1.getEnsRecordOrPrompt)({
        id: args.id,
        name: args.name,
        sdk,
        choicesFilter: (ens) => ens.status !== 'ACTIVE',
    });
    if (!ensRecord) {
        cli_1.output.error((0, translation_1.t)('noEnsRecordFoundUnexpectedly'));
        return;
    }
    if (ensRecord.status === 'ACTIVE') {
        cli_1.output.success((0, translation_1.t)('ensRecordNameAlreadyVerif', { ensRecordName: ensRecord.name }));
        cli_1.output.printNewLine();
        return;
    }
    cli_1.output.spinner((0, translation_1.t)('ensVerifying'));
    await sdk.ens().verify({ id: ensRecord.id });
    const verificationResultStatus = await (0, waitForEnsRecordVerificationResult_1.waitForEnsRecordVerificationResult)({
        id: ensRecord.id,
        sdk,
    });
    if (!verificationResultStatus) {
        cli_1.output.warn((0, translation_1.t)('warnSubjectProcessIsLong', { subject: (0, translation_1.t)('processOfENSVerification') }));
        cli_1.output.printNewLine();
        cli_1.output.log(`${(0, translation_1.t)('commonWaitAndCheckStatusViaCmd', { subject: (0, translation_1.t)('ensConf') })}:`);
        cli_1.output.log(cli_1.output.textColor(`fleek ens detail ${ensRecord.name}`, 'cyan'));
        return;
    }
    if (verificationResultStatus === 'VERIFYING_FAILED') {
        cli_1.output.error((0, translation_1.t)('ensCouldNotVerifyCheckURL', { ensRecordName: ensRecord.name }));
        cli_1.output.printNewLine();
        return;
    }
    cli_1.output.success((0, translation_1.t)('ensNameVerified', { ensRecordName: ensRecord.name }));
    cli_1.output.printNewLine();
};
exports.verifyEnsRecordAction = verifyEnsRecordAction;
exports.verifyEnsRecordActionHandler = (0, withGuards_1.withGuards)(exports.verifyEnsRecordAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=verify.js.map