"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncParser = exports.init = exports.output = void 0;
const commander_1 = require("commander");
const index_1 = __importDefault(require("./commands/applications/index"));
const index_2 = __importDefault(require("./commands/auth/index"));
const index_3 = __importDefault(require("./commands/domains/index"));
const index_4 = __importDefault(require("./commands/ens/index"));
const index_5 = __importDefault(require("./commands/functions/index"));
const index_6 = __importDefault(require("./commands/gateways/index"));
const index_7 = __importDefault(require("./commands/ipfs/index"));
const index_8 = __importDefault(require("./commands/ipns/index"));
const index_9 = __importDefault(require("./commands/pat/index"));
const index_10 = __importDefault(require("./commands/projects/index"));
const index_11 = __importDefault(require("./commands/sites/index"));
const index_12 = __importDefault(require("./commands/storage/index"));
const Output_1 = require("./output/Output");
const translation_1 = require("./utils/translation");
const isDebugging = process.argv.includes('--debug');
exports.output = new Output_1.Output({
    stream: process.stdout,
    debug: isDebugging,
});
const logo = `
                                                
       ad88  88                          88         
      d8"    88                          88         
      88     88                          88         
    MM88MMM  88   ,adPPYba,   ,adPPYba,  88   ,d8   
      88     88  a8P_____88  a8P_____88  88 ,a8"    
      88     88  8PP"""""""  8PP"""""""  8888[      
      88     88  "8b,   ,aa  "8b,   ,aa  88'"Yba,   
      88     88   '"Ybbd8"    '"Ybbd8"   88   'Y8a  

    ⚡ ${(0, translation_1.t)('aboutFleek')} ⚡
`;
const init = ({ version, parser }) => {
    const program = new commander_1.Command()
        .name('fleek')
        .option('--debug', (0, translation_1.t)('enableDebugMode'))
        .action(() => program.outputHelp())
        .version(version);
    // TODO: The ascii logo should only be displayed
    // on default command, or general help
    // a minimal version can be used instead
    program.addHelpText('beforeAll', logo).showHelpAfterError();
    const cmdVersion = (program) => program.command('version').action(() => {
        exports.output.raw(version);
        exports.output.printNewLine();
    });
    // Initialise commands
    const commands = [
        index_2.default,
        index_1.default,
        index_3.default,
        index_4.default,
        index_6.default,
        index_7.default,
        index_8.default,
        index_9.default,
        index_10.default,
        index_11.default,
        index_12.default,
        index_5.default,
        cmdVersion,
    ];
    for (const cmd of commands) {
        const subCmd = cmd(program);
        // Attach common subcommands
        if (subCmd) {
            // TODO: Identify common subcommands
            // refactor to handle them here
            for (const opt of subCmd.commands) {
                opt.addHelpCommand();
            }
        }
    }
    // Init parser (unawaited)
    parser(program);
    return program;
};
exports.init = init;
// eslint-disable-next-line fleek-custom/valid-argument-types
const asyncParser = async (program) => {
    try {
        await program.parseAsync(process.argv);
        process.exit(0);
    }
    catch (err) {
        console.error(err.message || err);
        if (err.stack) {
            console.error(err.stack);
        }
        process.exit(1);
    }
};
exports.asyncParser = asyncParser;
//# sourceMappingURL=cli.js.map