"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateAndJoinStrings = void 0;
const truncateAndJoinStrings = (args) => {
    const truncatedArray = args.truncateOnPosition
        ? args.input.slice(0, args.truncateOnPosition)
        : args.input;
    const stringifiedArray = truncatedArray.join(',');
    return args.input.length > truncatedArray.length
        ? `${stringifiedArray},...`
        : stringifiedArray;
};
exports.truncateAndJoinStrings = truncateAndJoinStrings;
//# sourceMappingURL=truncateAndJoinStrings.js.map