"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForPackageUpdates = void 0;
const chalk_1 = __importDefault(require("chalk"));
const update_notifier_cjs_1 = __importDefault(require("update-notifier-cjs"));
const translation_1 = require("../utils/translation");
const hours = 4; // Number of hours for the interval
const updateCheckInterval = 1000 * 60 * 60 * hours;
const checkForPackageUpdates = async (pkg) => {
    const notifier = (0, update_notifier_cjs_1.default)({ pkg, updateCheckInterval });
    if (!notifier.update) {
        return;
    }
    const { current, latest, name } = notifier.update;
    const installCmd = chalk_1.default.yellow(`npm i -g ${name}`);
    const verifyCmd = chalk_1.default.yellow('fleek version');
    const message = (0, translation_1.t)('updateAvailable', {
        updateRequired: (0, translation_1.t)('updateRequired'),
        howToUpdate: (0, translation_1.t)('howToUpdate'),
        whyUpdate: (0, translation_1.t)('whyUpdate'),
        installCmd,
        verifyCmd,
        // The following are overrides: packageName, currentVersion and LatestVersion. Since the update-notifier uses the same placeholder convention {placeholder}, it'd fallback to the update-notifier computed text. Thus, we have an opportunity to customise the values provides from the registry
        packageName: name,
        currentVersion: chalk_1.default.red(current),
        latestVersion: chalk_1.default.green(latest),
        options: {
            bold: true,
        },
    });
    notifier.notify({
        message,
        boxenOptions: {
            padding: 1,
            margin: 1,
            align: 'left',
            borderColor: 'yellow',
            borderStyle: 'round',
        },
    });
};
exports.checkForPackageUpdates = checkForPackageUpdates;
//# sourceMappingURL=update-notifier.js.map