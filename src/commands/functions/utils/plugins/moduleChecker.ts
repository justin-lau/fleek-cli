import { OnResolveArgs, Plugin, PluginBuild } from 'esbuild';

const unsupportedModules = [
  'node:assert',
  'node:child_process',
  'node:cluster',
  'node:console',
  'node:dgram',
  'node:diagnostics_channel',
  'node:dns',
  'node:domain',
  'node:events',
  'node:fs',
  'node:http',
  'node:http2',
  'node:inspector',
  'node:module',
  'node:net',
  'node:os',
  'node:perf_hooks',
  'node:punycode',
  'node:process',
  'node:querystring',
  'node:readline',
  'node:repl',
  'node:string_decoder',
  'node:sys',
  'node:test',
  'node:timers',
  'node:tls',
  'node:trace_events',
  'node:tty',
  'node:util',
  'node:url',
  'node:v8',
  'node:vm',
  'node:wasi',
  'node:worker_threads',
];

type ModuleCheckerArgs = {
  unsupportedModulesUsed: string[];
};

export const moduleChecker: (args: ModuleCheckerArgs) => Plugin = (args) => {
  const { unsupportedModulesUsed } = args;

  return {
    name: 'moduleChecker',
    setup: (build: PluginBuild) => {
      build.onResolve({ filter: /.*/ }, (args: OnResolveArgs) => {
        if (unsupportedModules.includes(args.path) || unsupportedModules.includes(`node:${args.path}`)) {
          unsupportedModulesUsed.push(args.path);
        }

        return null;
      });
    },
  };
};
