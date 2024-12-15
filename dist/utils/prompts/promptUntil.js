"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptUntil = void 0;
/**
 * Show prompt handler until the validator returns true.
 *
 * @param handler - Async function that prompts for user input
 * @param validator - Async function that validates the handler's response
 *
 * @returns The validated data from the handler
 *
 * @example
 * const result = await promptUntil({
 *   handler: async () => prompt('Enter a number > 5'),
 *   validator: async (num) => parseInt(num) > 5
 * });
 */
const promptUntil = async ({ handler, validator, }) => {
    const data = await handler();
    if (!(await validator(data))) {
        return (0, exports.promptUntil)({ handler, validator });
    }
    return data;
};
exports.promptUntil = promptUntil;
//# sourceMappingURL=promptUntil.js.map