"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationSessionId = void 0;
const node_crypto_1 = require("node:crypto");
const generateVerificationSessionId = () => (0, node_crypto_1.randomBytes)(16).toString('hex');
exports.generateVerificationSessionId = generateVerificationSessionId;
//# sourceMappingURL=generateVerificationSessionId.js.map