"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsupportedRuntimeModules = exports.supportedRuntimeModules = void 0;
// Worker supported modules
// due to environment constraints
// optimized for edge computing
exports.supportedRuntimeModules = [
    'buffer',
    'crypto',
    'domain',
    'events',
    'http',
    'https',
    'path',
    'punycode',
    'stream',
    'string_decoder',
    'url',
    'util',
    'zlib',
];
exports.unsupportedRuntimeModules = [
    'assert/strict',
    'child_process',
    'cluster',
    'constants',
    'dgram',
    'diagnostics_channel',
    'dns',
    'fs',
    'fs/promises',
    'http2',
    'inspector',
    'module',
    'net',
    'os',
    'path/posix',
    'path/win32',
    'perf_hooks',
    'process',
    'querystring',
    'readline',
    'repl',
    'stream/promises',
    'stream/web',
    'sys',
    'timers',
    'timers/promises',
    'tls',
    'trace_events',
    'tty',
    'v8',
    'vm',
    'wasi',
    'webcrypto',
    'worker_threads',
];
//# sourceMappingURL=runtimeModules.js.map