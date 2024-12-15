"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showVerificationSessionLink = exports.getVerificationSessionLink = void 0;
const translation_1 = require("../../utils/translation");
const getVerificationSessionLink = ({ verificationSessionId, uiAppUrl, }) => `${uiAppUrl}/login/${verificationSessionId}`;
exports.getVerificationSessionLink = getVerificationSessionLink;
const showVerificationSessionLink = ({ output, uiAppUrl, verificationSessionId, }) => {
    const url = (0, exports.getVerificationSessionLink)({
        uiAppUrl,
        verificationSessionId,
    });
    output.spinner(url);
    output.chore((0, translation_1.t)('followLinkToLogin'));
    output.link(url);
    output.printNewLine();
};
exports.showVerificationSessionLink = showVerificationSessionLink;
//# sourceMappingURL=showVerificationSessionLink.js.map