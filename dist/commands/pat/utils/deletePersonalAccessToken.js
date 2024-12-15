"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePersonalAccessToken = void 0;
const translation_1 = require("../../../utils/translation");
const deletePersonalAccessToken = async ({ output, sdk, id, }) => {
    const success = await sdk
        .user()
        .deletePersonalAccessToken({ id })
        .catch(() => false);
    if (!success) {
        output.error((0, translation_1.t)('patIdNotExistForUsr'));
        return;
    }
    output.printNewLine();
    output.success((0, translation_1.t)('commonItemActionSuccess', {
        subject: (0, translation_1.t)('personalAccessToken'),
        action: (0, translation_1.t)('deleted'),
    }));
};
exports.deletePersonalAccessToken = deletePersonalAccessToken;
//# sourceMappingURL=deletePersonalAccessToken.js.map