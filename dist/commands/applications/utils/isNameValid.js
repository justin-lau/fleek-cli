"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNameValid = void 0;
const utils_validation_1 = require("@fleek-platform/utils-validation");
const isNameValid = ({ name }) => utils_validation_1.name.safeParse(name).success;
exports.isNameValid = isNameValid;
//# sourceMappingURL=isNameValid.js.map