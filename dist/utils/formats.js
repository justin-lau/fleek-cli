"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidFleekConfigFormat = void 0;
const configuration_1 = require("./configuration");
const isValidFleekConfigFormat = (format) => Object.values(configuration_1.FleekSiteConfigFormats).includes(format);
exports.isValidFleekConfigFormat = isValidFleekConfigFormat;
//# sourceMappingURL=formats.js.map