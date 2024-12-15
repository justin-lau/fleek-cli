"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = exports.Icons = void 0;
const as_table_1 = __importDefault(require("as-table"));
const boxen_1 = __importDefault(require("boxen"));
const chalk_1 = __importDefault(require("chalk"));
const translation_1 = require("../utils/translation");
const wait_1 = require("./utils/wait");
// eslint-disable-next-line no-restricted-syntax
var Icons;
(function (Icons) {
    Icons["Checkmark"] = "\u2705";
    Icons["ChequeredFlag"] = "\uD83C\uDFC1";
    Icons["Cross"] = "\u274C";
    Icons["Chain"] = "\uD83D\uDD17";
    Icons["Devil"] = "\uD83D\uDC79";
    Icons["Lamp"] = "\uD83D\uDCA1";
    Icons["Robot"] = "\uD83E\uDD16";
    Icons["Warning"] = "\u26A0\uFE0F";
})(Icons = exports.Icons || (exports.Icons = {}));
class Output {
    constructor({ stream, debug: debugEnabled = false } = {
        stream: process.stdout,
    }) {
        this.spinnerMessage = '';
        this._spinner = null;
        this.print = (message, options = {}) => {
            this.stopSpinner();
            // Disable colors for tests
            if (this.debugEnabled) {
                chalk_1.default.level = 0;
            }
            const preparedMessage = options.prefix
                ? `${options.prefix.color ? chalk_1.default[options.prefix.color](options.prefix.message) : options.prefix.message} ${options.prefix.bold ? chalk_1.default.bold(message) : message}`
                : message;
            return this.stream.write(preparedMessage);
        };
        this.printNewLine = (count = 1) => {
            this.print('\n'.repeat(count));
        };
        this.log = (message) => {
            // TODO: Given that console backgrounds can be of any colour
            // certain colours such as grey might not be the most accessible e.g. white background
            // should be verified against brighter consoles and possibly disable colour
            this.print(message, { prefix: { color: 'gray', message: '>' } });
            this.printNewLine();
        };
        this.chore = (message) => {
            this.print(message, { prefix: { message: Icons.Robot, bold: false } });
            this.printNewLine();
        };
        this.hint = (message) => {
            this.print(message, { prefix: { message: Icons.Lamp, bold: true } });
            this.printNewLine();
        };
        this.warn = (message) => {
            this.print(message, {
                prefix: { message: `${Icons.Warning} ${(0, translation_1.t)('warning')}!` },
            });
            this.printNewLine();
        };
        this.mistake = (message) => {
            this.print(message, {
                prefix: { message: `${Icons.Devil} ${(0, translation_1.t)('mistake')}!`, bold: false },
            });
            this.printNewLine();
        };
        this.error = (message) => {
            this.print(message, {
                prefix: { message: `${Icons.Cross} ${(0, translation_1.t)('error')}:` },
            });
            this.printNewLine();
        };
        this.ready = (message) => {
            this.print(message, {
                prefix: { message: `${Icons.ChequeredFlag} ${(0, translation_1.t)('ready')}!` },
            });
            this.printNewLine();
        };
        this.success = (message) => {
            this.print(message, {
                prefix: { message: `${Icons.Checkmark} ${(0, translation_1.t)('success')}!` },
            });
            this.printNewLine();
        };
        this.link = (url) => {
            this.print(`${Icons.Chain} ${chalk_1.default.cyan.underline(url)}`);
            this.printNewLine();
        };
        this.debug = (message) => {
            if (this.debugEnabled) {
                // TODO: Given that console backgrounds can be of any colour
                // certain colours such as grey might not be the most accessible e.g. white background
                // should be verified against brighter consoles and possibly disable colour
                this.print(message, {
                    prefix: { color: 'gray', message: `${(0, translation_1.t)('debug')}:` },
                });
                this.printNewLine();
            }
        };
        this.table = (data) => {
            this.printNewLine();
            this.print((0, as_table_1.default)(data));
            this.printNewLine(2);
        };
        this.box = (lines, options = {}) => {
            const defaultOptions = {
                textAlignment: 'center',
                margin: 1,
                padding: 3,
                float: 'left',
                borderColor: 'yellow',
            };
            this.printNewLine();
            this.print((0, boxen_1.default)(lines.join('\n'), { ...defaultOptions, ...options }));
            this.printNewLine();
        };
        this.textColor = (message, color) => chalk_1.default[color](message);
        this.quoted = (message) => `"${message}"`;
        this.spinner = (message, delay = 300) => {
            if (this.debugEnabled) {
                this.debug((0, translation_1.t)('spinnerInvokedDelay', { message, delay: delay.toString() }));
                return;
            }
            this.spinnerMessage = message;
            if (this._spinner) {
                this._spinner.setText(message);
            }
            else {
                this._spinner = new wait_1.Waiter({
                    opts: {
                        text: message,
                        stream: this.stream,
                    },
                    delay,
                });
            }
        };
        this.stopSpinner = () => {
            if (this.debugEnabled && this.spinnerMessage) {
                this.debug((0, translation_1.t)('spinnerStopped', { spinnerMessage: this.spinnerMessage }));
                this.spinnerMessage = '';
            }
            if (this._spinner) {
                this._spinner.stop();
                this._spinner = null;
                this.spinnerMessage = '';
            }
        };
        this.raw = (msg) => {
            this.stream.write(msg);
        };
        this.stream = stream;
        this.debugEnabled = debugEnabled;
    }
}
exports.Output = Output;
//# sourceMappingURL=Output.js.map