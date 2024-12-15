"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Waiter = void 0;
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const eraseLines_1 = require("./eraseLines");
class Waiter {
    constructor({ opts, delay = 300 }) {
        this.spinner = null;
        this.text = opts.text?.slice() ?? '';
        this.timeout = setTimeout(() => {
            this.spinner = (0, ora_1.default)(opts);
            this.spinner.text = chalk_1.default.cyan(this.text);
            this.spinner.color = 'cyan';
            this.spinner.start();
        }, delay);
    }
    stop() {
        clearTimeout(this.timeout);
        if (this.spinner) {
            this.spinner.stop();
            this.spinner = null;
            process.stderr.write((0, eraseLines_1.eraseLines)(1));
        }
    }
    setText(newText) {
        this.text = newText;
        if (this.spinner) {
            this.spinner.text = chalk_1.default.gray(newText);
        }
    }
}
exports.Waiter = Waiter;
//# sourceMappingURL=wait.js.map