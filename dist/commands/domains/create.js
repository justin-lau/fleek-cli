"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDomainActionHandler = exports.createDomainAction = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const pressAnyKey_1 = require("../../utils/pressAnyKey");
const translation_1 = require("../../utils/translation");
const getHostnameOrPrompt_1 = require("./prompts/getHostnameOrPrompt");
const getSiteOrPrivateGateway_1 = require("./prompts/getSiteOrPrivateGateway");
const getZoneForSiteOrPrivateGateway_1 = require("./utils/getZoneForSiteOrPrivateGateway");
const waitForDomainCreationResult_1 = require("./wait/waitForDomainCreationResult");
const waitForDomainVerificationResult_1 = require("./wait/waitForDomainVerificationResult");
const createDomainAction = async ({ sdk, args }) => {
    const { site, privateGateway } = await (0, getSiteOrPrivateGateway_1.getSiteOrPrivateGateway)({
        sdk,
        privateGatewayId: args.privateGatewayId,
        privateGatewaySlug: args.privateGatewaySlug,
        siteId: args.siteId,
        siteSlug: args.siteSlug,
    });
    const hostname = await (0, getHostnameOrPrompt_1.getHostnameOrPrompt)({ hostname: args.hostname });
    if (site) {
        cli_1.output.spinner((0, translation_1.t)('creatingNewDomainSite'));
    }
    else {
        cli_1.output.spinner((0, translation_1.t)('creatingNewDomainGw'));
    }
    // TODO: Investigate the diff with org repo
    // const zone = await getZoneForSiteOrPrivateGateway(
    //   site ? ({ site, sdk } as GetZoneForSiteOrPrivateGatewayArgs) : ({ privateGateway, sdk } as GetZoneForSiteOrPrivateGatewayArgs)
    // );
    // TODO: Check commented out above
    const zone = await (0, getZoneForSiteOrPrivateGateway_1.getZoneForSiteOrPrivateGateway)(site
        ? { site, sdk }
        : {
            privateGateway,
            sdk,
        });
    if (zone === null) {
        cli_1.output.error((0, translation_1.t)('createDomainFailure'));
        cli_1.output.printNewLine();
        return;
    }
    await sdk.domains().createDomain({ zoneId: zone.id, hostname });
    const domainCreationStatus = await (0, waitForDomainCreationResult_1.waitForDomainCreationResult)({
        sdk,
        hostname: hostname,
    });
    if (domainCreationStatus === null) {
        cli_1.output.warn((0, translation_1.t)('warnSubjectProcessIsLong', { subject: (0, translation_1.t)('dnsConfiguration') }));
        cli_1.output.printNewLine();
        cli_1.output.log(`${(0, translation_1.t)('commonWaitAndCheckStatusViaCmd', { subject: (0, translation_1.t)('dnsConfiguration') })}:`);
        cli_1.output.log(cli_1.output.textColor(`fleek domains detail ${hostname}`, 'cyan'));
        return;
    }
    if (domainCreationStatus === 'CREATING_FAILED') {
        cli_1.output.error((0, translation_1.t)('createDomainFailure'));
        cli_1.output.printNewLine();
        return;
    }
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('commonItemActionSuccess', {
        subject: `${(0, translation_1.t)('domain')} ${cli_1.output.quoted(hostname)}`,
        action: (0, translation_1.t)('created'),
    }));
    cli_1.output.printNewLine();
    const domain = await sdk.domains().getByHostname({ hostname: hostname });
    cli_1.output.log(`${(0, translation_1.t)('updateDNSRecords', { hostname })}:`);
    for (const { type, value } of domain.dnsConfigs) {
        if (type === 'CNAME') {
            cli_1.output.log(`CNAME @ ${value.toLowerCase().replace('https://', '')}`);
        }
    }
    cli_1.output.printNewLine();
    const { waitForAnyKey } = (0, pressAnyKey_1.usePressAnyKey)();
    while (true) {
        cli_1.output.hint((0, translation_1.t)('commonPressAnyKeyOnceConfig', { subject: (0, translation_1.t)('dnsSettings') }));
        await waitForAnyKey();
        cli_1.output.spinner((0, translation_1.t)('commonVerifyingSubject', { subject: (0, translation_1.t)('dnsSettings') }));
        await sdk.domains().verifyDomain({ domainId: domain.id });
        const verificationResultStatus = await (0, waitForDomainVerificationResult_1.waitForDomainVerificationResult)({
            domain,
            sdk,
        });
        if (!verificationResultStatus) {
            cli_1.output.warn((0, translation_1.t)('warnSubjectProcessIsLong', { subject: (0, translation_1.t)('dnsConfiguration') }));
            cli_1.output.printNewLine();
            cli_1.output.log(`${(0, translation_1.t)('commonWaitAndCheckStatusViaCmd', { subject: (0, translation_1.t)('dnsConfiguration') })}:`);
            cli_1.output.log(cli_1.output.textColor(`fleek domains detail ${hostname}`, 'cyan'));
            return;
        }
        if (verificationResultStatus === 'ACTIVE') {
            cli_1.output.printNewLine();
            cli_1.output.success(`Domain ${cli_1.output.quoted(hostname)} was verified.`);
            cli_1.output.printNewLine();
            return;
        }
        cli_1.output.error((0, translation_1.t)('domainVerificationFailureCheckDns', { hostname }));
        cli_1.output.printNewLine();
    }
};
exports.createDomainAction = createDomainAction;
exports.createDomainActionHandler = (0, withGuards_1.withGuards)(exports.createDomainAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=create.js.map