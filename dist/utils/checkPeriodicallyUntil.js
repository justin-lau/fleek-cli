"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPeriodicallyUntil = void 0;
const checkPeriodicallyUntil = async ({ conditionFn, period, tries, }) => {
    const result = await conditionFn();
    if (result || tries < 1) {
        return result;
    }
    return new Promise((resolve) => setTimeout(resolve, period)).then(() => (0, exports.checkPeriodicallyUntil)({ conditionFn, period, tries: tries - 1 }));
};
exports.checkPeriodicallyUntil = checkPeriodicallyUntil;
//# sourceMappingURL=checkPeriodicallyUntil.js.map