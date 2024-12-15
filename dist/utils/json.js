"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadJSONFromPackageRoot = void 0;
// Warning this file may be included from outside `/src`
// For example, see `/bin/index.js`
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
// The build distribution target directory
const BUILD_DIST_PATHNAME = '/dist';
// Fallback path is the `src` used in tests
const TEST_SRC_PATHNAME = '/src';
const leadingSlash = (str) => (str.startsWith('/') ? str : `/${str}`);
const resolvePath = (filename) => {
    /* eslint-disable no-process-env */
    return node_path_1.default.join(__dirname.split(process.env.VITEST ? TEST_SRC_PATHNAME : BUILD_DIST_PATHNAME)[0], leadingSlash(filename));
};
// JSON files should live outside `src`
// help prevent tsc from generating the directory `/dist/src`
// as current setup prefers surface files from `/src` into `/dist`
const loadJSONFromPackageRoot = (filename) => {
    const resolved = resolvePath(filename);
    return JSON.parse((0, node_fs_1.readFileSync)(resolved, 'utf-8'));
};
exports.loadJSONFromPackageRoot = loadJSONFromPackageRoot;
//# sourceMappingURL=json.js.map